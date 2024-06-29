---
title: 'Announcing tauri-plugin-state'
description: 'A quick announcement for a new plugin for Tauri that makes state management dead simple.'
author: 'Suyashtnt'
date: '2024-06-29 18:00'
updated: '2024-06-29 18:00'
published: true
---

So I've been working on a Minecraft launcher called [glowsquid](https://github.com/glowsquid-launcher/glowsquid)
for the past few weeks. It's been fun,
but something I was questioning how to do was state management.

> _"But I thought state management was easy in Svelte?"_

Well, yes. Especially in Svelte 5 because of the `$state` rune.

I would do something like this:

`lib/state.svelte.ts`:

```ts
const authState = $state({
    users: [],
    currentUserIndex: null
})

export const auth = () => authState
```

`routes/authDropdown.svelte`:

```svelte
<script>
    import { auth } from '$lib/state'

    // reactive destructuring
    const { users, currentUserIndex } = $derived(auth())
</script>

<!--> Just use em like normal </-->
```

However, the issue is interacting with the state from Tauri.
Tauri is the one actually storing, adding, updating, and deleting the users,
so it would make sense to have it manage the state.

Now the question is: how the hell do I do that?

## Enter tauri-plugin-state

`tauri-plugin-state` is a plugin for Tauri that makes state management
between backend and frontend dead simple. It works by making it so
that _rust_ manages all the state and JS simply stores a cache
to the most up-to-date state.

### Example Usage

#### Rust Side

On the rust side, you need to initialize the state:

`main.rs`:

```rust
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use specta::TypeCollection;
use tauri::{async_runtime::block_on, Manager};
use tauri_plugin_state::State;

// Wrapping something in state requires it to be
// - clonable (for reasons Tauri requires)
// - serializable (to send to the frontend)
// - typeable (for TypeScript bindings)
#[derive(Clone, serde::Serialize, specta::Type)]
struct AppState {
    greeting: State<String>,
}

// the weird return type is because of specta requiring Results
#[tauri::command]
#[specta::specta]
async fn update_greeting(
    state: tauri::State<'_, State<AppState>>,
    new_greeting: String
) -> Result<(), ()> {
    // Lock the state to update it
    // (Since we intend this state to be shared between threads)
    // Locking it also makes it so that we can detect when the state is being updated
    let mut state = state.lock().await;

    // Simply update the state as you would normally
    state.greeting = new_greeting;

    Ok(())
    // the state lock is dropped here, and the state is then synced to the frontend
}

fn main() {
    let invoke_handler = {
        // I'm assuming you're going to want typescript bindings
        // (also because tauri-plugin-state requires it)
        let builder = tauri_specta::ts::builder()
            .types(TypeCollection::default().register::<auth::state::AuthState>())
            .commands(tauri_specta::collect_commands![
                greet,
            ]);

        #[cfg(debug_assertions)] // <- Only export on non-release builds
        let builder = builder.path("../lib/bindings.ts");

        builder.build().unwrap()
    };

    tauri::Builder::default()
        // the closure is called every time the frontend asks for the state
        // to be initialized/synced
        .plugin(tauri_plugin_state::init(|app| {
            let handle = app.app_handle().clone();

            // initialize your default state here
            let app_state = AppState {
                greeting: "Hello, world!".to_string(),
            };

            let state = State::new(
                // the name of the state. Same as the one used on the frontend
                "app_state",
                // the state itself
                app_state,
                // the handle to the app so we can sync the state
                handle,
            );

            // this returns false if the state is already initialized,
            // so we can just resync the existing state
            if !handle.manage(state) {
                block_on(handle.state::<State<AppState>>().sync());
            }
        }))
        .invoke_handler(invoke_handler)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

#### JS Side

On the JS side, you just need to initialize the state handlers:

`lib/state.ts`:

```ts
import type { AppState } from './bindings'
// it's on NPM!
import { tauriState } from 'tauri-plugin-state'

export const appState = tauriState<AppState>('app_state', {
    // this is the value before we get the state from the backend
    // This gets replaced very fast, but is useful for the first render
    greeting: 'Hello, world!'
})
```

`routes/+layout.svelte`:

```svelte
<script>
    import { commands } from "$lib/bindings";
    import { appState } from "$lib/state";
    import { setupState } from 'tauri-plugin-state';
    import { Map } from "svelte/reactivity";

    // initialize the state with Svelte's reactive map
    // this makes it so that the state is automatically reactive
    // and updates the UI when the state is updated
    setupState(new Map())

    // reactive destructuring to get the state
    const { greeting } = $derived(appState())

    let name = $state('world')
    function updateGreeting(e) {
        e.preventDefault()
        commands.updateGreeting(`Hello, ${name}!`)
    }
</script>

<form>
    <input type="text" bind:value={name} />
    <button onclick={updateGreeting}>Update Greeting</button>
</form>

<p>Greeting from Rust: {greeting}</p>
```

And that's it! You now have a state that is managed by Rust
and is automatically synced to the frontend. Plus Svelte 5
automatically updates the UI when the state is updated thanks
to the reactive map.

## How it works

This is where I get to yap about how chaotic the code is.

### JS side

the JS side is the simplest. It's just a `Map` cache that is updated
when the state is updated. Once the cache is initialized, it just
listens for the state to be updated (you can also listen to the state events yourself!)
and updates the cache accordingly.

The `tauriState` function simply returns a getter function
that returns the cache entry. That's it. No special magic.

However, the `setupState` function is a bit weird.
Since we don't know if the state is initialized or not, we need to
have the cache _already_ setup before you even call `setupState`.
This means you get a Map by default, and your initialize call manually
moves the state from the old cache to the new cache. Already cursed,
but it's _fine_. It means there aren't any weird undefined errors at least.
We also emit an event to the backend to tell it to initialize and resync the state.
This is so that the frontend can get the state as soon as possible and not rely
on it's default values for too long.

> _"What if I don't want to have the frontend default values?"_

You can simply set the state to be initialized to `null` or `undefined` and
wait for the state to be initialized by the backend. This is useful if you
have no idea what the default value should be and it can only be set by the backend.
You can use this in conjunction with something like a `"is_ready"` state to
show a loading screen until the state is initialized.

### Rust side

Now this is where it gets _real_ chaotic. I needed to somehow:

- Allow the user to have arbitrary state that's as flexible as possible
- Allow the user to update the state from the backend without much effort
- Somehow detect and send changes to the frontend

And the simplest way to do all of that is to take a page out `Mutex`'s book:
Hold a lock to the state. This means that the state will always be the same
throughout the back since it's a Mutex internally, and we can detect when the state
changes via a lock and `Drop` implementation.

In practice, this looks something like this:

```rs
// Clone is required by Tauri
// Serialize is required to send the state to the frontend
// Type is required by Specta, which I highly recommend using
// It might be optional in the future if I decide to feature-gate it
#[derive(Debug, Clone)]
struct State<T: serde::Serialize + specta::Type + Clone> {
    key: String,
    // This is specifically a tokio Mutex to make the lock Send + Sync
    inner: Arc<tokio::sync::Mutex<T>>,
    tauri_handle: AppHandle,
}

impl State {
    pub async fn lock(&self) -> StateGuard {
        StateGuard {
            // all of these are cheap clones
            // (well, key is a clone of a string, but still probably cheap)
            inner: self.inner.lock().await,
            key: self.key.clone(),
            app_handle: self.app_handle.clone(),
        }
    }
}

pub struct StateGuard<'a, T: Serialize + Type + Clone> {
    inner: MutexGuard<'a, T>,
    key: String,
    app_handle: AppHandle,
}

#[derive(Serialize, Clone, Type)]
struct StateUpdate<T: Serialize + Type + Clone> {
    key: String,
    value: T,
}

impl<T: Serialize + Type + Clone> Drop for StateGuard<'_, T> {
    // now this is how we actually send the state to the frontend:
    // just emit an event with the new key and value
    // on drop, since we're holding a lock to the state.
    fn drop(&mut self) {
        // A slightly cursed way to handle panics
        // since we don't want to double panic and abort
        if let Err(e) = self.app_handle.emit(
            "update_state",
            StateUpdate {
                key: self.key.clone(),
                value: self.inner.clone(),
            },
        ) {
            if panicking() {
                eprintln!("Failed to send state update to frontend: {}", e);
            } else {
                panic!("Failed to send state update to frontend: {}", e);
            }
        }
    }
}

// This allows us to use the state as if it wasn't wrapped in anything
impl<'a, T: Serialize + Type + Clone> Deref for StateGuard<'a, T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.inner
    }
}

impl<'a, T: Serialize + Type + Clone> DerefMut for StateGuard<'a, T> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.inner
    }
}
```

It's a lot of structs and traits, but it works and works _well._
There is almost 0 hassle compared to using a regular mutex, and it's
just as fast until you drop the lock (and even then emitting an event is really fast).
There's no real downsides to this method from what I can tell.
The key clone shouldn't be an issue since you're frontend is already a webview.

## Where to get it

You can get the frontend part from NPM and the backend part from crates.io.
[It's as Shrimple as that](https://tenor.com/view/as-shrimple-as-that-shrimp-shrimple-simple-as-simple-as-that-gif-25854313).

- NPM: [tauri-plugin-state](https://www.npmjs.com/package/tauri-plugin-state)
- Crates: [tauri-plugin-state](https://crates.io/crates/tauri-plugin-state)
- GitHub: [tauri-plugin-state](https://github.com/glowsquid-launcher/glowsquid/tree/dev/libs/tauri-plugin-state)
