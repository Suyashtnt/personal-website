---
title: 'The Sveltekit tutorial: Part 2 | What am I even looking at?'
description: "Welcome to your local wobblers guide to Sveltekit. This part will be about understanding the project structure and routing. We'll also get a basic todo-list going (doing it wrong way)"
author: 'Suyashtnt'
date: '2023-10-22 16:42'
updated: '2023-10-22 16:42'
published: false
---

<script>
    import Note from "$lib/components/note.svelte"
</script>

<Note>
If you have no idea what Sveltekit is,
see <a href="/posts/sveltekit-guide-part-1">Part 1</a> of the guide.
</Note>

Welcome back to the Sveltekit guide!
In this part, we'll be looking at the project structure and routing.
We'll also get a basic todo-list going, except we'll be doing it "the wrong way".
AKA the way that doesn't take advantage of Sveltekit's features.

## Getting on the same page

If you've followed the previous part of the guide, you can skip this section.
Else, you can clone the repository from [here](https://github.com/Suyashtnt/doen).
Use tag `part-1` to get the code from the previous part.

```sh
git clone https://github.com/Suyashtnt/doen
cd doen
git checkout part-1
```

## Project structure

The project structure is _fairly_ simple in a SvelteKit app.
There are only a few files you usually have to worry about when you're starting out.

I'll be talking about the following below:

```ansi
[0;38;2;137;180;250m.[0m
├── [0;38;2;166;227;161meslint.config.js[0m
├── [0;38;2;147;153;178mLICENSE[0m
├── [0;38;2;249;226;175mpackage.json[0m
├── [0;38;2;166;227;161mplaywright.config.ts[0m
├── [0;38;2;137;180;250msrc[0m
│   ├── [0;38;2;166;227;161mapp.d.ts[0m
│   ├── [0;38;2;249;226;175mapp.html[0m
│   ├── [0;38;2;166;227;161mhooks.server.ts[0m
│   ├── [0;38;2;137;180;250mlib[0m
│   └── [0;38;2;137;180;250mroutes[0m
│       ├── +layout.svelte
│       └── +page.svelte
├── [0;38;2;137;180;250mstatic[0m
│   └── [0;38;2;242;205;205mfavicon.png[0m
├── [0;38;2;166;227;161msvelte.config.js[0m
├── [0;38;2;137;180;250mtests[0m
│   └── [0;38;2;166;227;161mtest.ts[0m
├── [0;38;2;249;226;175mtsconfig.json[0m
└── [0;38;2;166;227;161mvite.config.ts[0m
```

### svelte.config.js

This is the config file for Svelte and SvelteKit.
This file usually tells SvelteKit where your files are,
and what to do with them.

It first sets up _preprocessors_, which can transform your code before it's compiled.
In Doen, we tell Svelte to:

-   use Vite to transform typescript to javascript
-   use Vite to process our CSS through LightningCSS
-   use MeltUI's preprocessor to remove a lot of boilerplate

Another thing it does is set up _adapters_. This is a SvelteKit specific feature.
It allows you to deploy your app to different hosting platforms
(Vercel, Netlify, Cloudflare, etc.) by compiling your already compiled code
to a format that the platform understands. In Doen, we're using SvelteKit's auto-adapter,
which automatically detects the platform and uses the correct adapter.

See [Part 1](/posts/sveltekit-guide-part-1#sveltekit) for more info.

### vite.config.js

This is the config file for [Vite](https://vitejs.dev),
which is the bundler that SvelteKit uses by default.

<Note>
In the future, SvelteKit will be using Turbopack instead of Vite.
This will most likely be in svelte 5, so if you are reading this in the future,
check the new guide if it exists.
</Note>

This file is pretty simple. It just configures Vite to use LightningCSS over
Postcss, and to use the UnoCSS and SvelteKit plugins. The UnoCSS plugin is
Svelte's specific plugin for UnoCSS, which does a bunch of fancy stuff to _inject_
it's generated CSS classes into the `<style>` tag of a Svelte component,
which leads to a much smaller bundle. The SvelteKit plugin is a plugin that
connects Vite to SvelteKit's engine, and does the bulk of the work to get
SvelteKit up and running.

You will also see a `test` config object, which is for Vitest.
Vitest is an absurdly fast testing framework for any vite project,
and works with Svelte. We'll be using it later on for testing our app.

See [Part 1](/posts/sveltekit-guide-part-1#vite-config) for more info.

### Package.json

A regular NodeJS package.json file. Nothing special here.
It tells pnpm what packages to install and what your scripts are.
It also has `type` set to `module`, which tells nodejs to use es modules
over commonjs modules. This is a requirement for SvelteKit to work, and
recommended in any modern nodejs project.

### eslint.config.js

Our ESLint config. See [Part 1](/posts/sveltekit-guide-part-1#eslint) for how it
works.

### The `static` folder

This is where all your static files go. This includes images, fonts, etc.
They will be directly mapped to the root of your site.
E.g. if you have `static/favicon.png`, it will be available at `https://your-site.com/favicon.png`.

### The `src` folder

This is where all app-specific code goes. It's the main folder of our project.
It handles all the routing, and contains all the components, pages, and pretty
much any business logic you require for your app.

#### The `src/lib` folder

This folder contains any code that is not specific to routing
or any other part of the app. It contains code that can be used anywhere\*

<Note>
*If you have `lib/server`, any code in there will only be available on the server.
Similarly, if you have `lib/client`,
any code in there will only be available on the client.
</Note>

This folder is also where you put shared components, like a button component
thats used in multiple places. You don't usually put page-specific components
in here, as they are only used in one place. The routes folder can actually
contain components as well, which will be described down below.

#### The `src/routes` folder

Welcome to the most confusing part of SvelteKit for beginners: _folder_ based routing.
If you're coming from other meta-frameworks, you may know file-based routing,
where each file it its own route. `pages/index.tsx` is the root route,
`pages/about.tsx` is `/about`, etc.

In Sveltekit, each _folder_ is a route, and there are special files
that are used to determine what the route does. These special files are
prefixed with a `+`. E.g. `+page.svelte`.
For now, I'll be explaining `+page.svelte` and `+layout.svelte`. I'll explain more
in future parts of the guide when we need them.

##### `+page.svelte` (Go here for a barebones todo list app!)

The most common route file is `+page.svelte`, which is used to render a page.
This is a Svelte component which contains the content of the page.
`src/routes/+page.svelte` will be the content of `/`, and
`src/routes/about/+page.svelte` will be rendered at `/about`.
Not that difficult, right?

Now, let's create a basic todo list app using the root `+page.svelte` file!

```svelte
<!-- change lang="js" to lang="ts". Limitation of my blog setup -->
<script lang="js">
	import { browser } from '$app/environment';
	import { flip } from 'svelte/animate';

	// Interface for a todo. This is the data model
	interface Todo {
		done: boolean;
		id: string;
		text: string;
	}

	// The internal todo list
	// This is the wrong way to do it,
	// but we'll fix it and move the logic to the server in the next post
	let todos: Todo[] = [];

	const addTodo = (text: string) => {
		// In order to get Svelte to update the list,
		// we need to reassign the todos variable
		todos = [
			...todos,
			{
				done: false,
				id: createUniqueId(),
				text
			}
		];
	};

	const removeTodo = (id: string) => {
		// If we want to remove a todo, just filter it out
		todos = todos.filter((todo) => todo.id !== id);
	};

	// While we could just use window.crypto.randomUUID() directly,
	// it may lead to collisions. So we'll just recursively call
	// the function until we get a unique id.
	//
	// Fun fact: This has a time complexity of O(Infinity) in the worst case,
	// Since we could theoretically get an infinite amount of collisions.
	const createUniqueId = () => {
		let id = window.crypto.randomUUID();

		const todoExists = todos.find((todo) => todo.id === id);
		if (todoExists) {
			id = createUniqueId();
		}

		return id;
	};

	// Since SvelteKit does SSR, we need to check if we're in the browser
	// before accessing browser APIs
	if (browser) {
		// Since we want to sync the todo list between sessions,
		// we'll use localStorage to get the todos
		const rawTodos = localStorage.getItem('todos');

		if (rawTodos) {
			todos = JSON.parse(rawTodos);
		}
	}

	// Whenever `todos` changes, we'll update localStorage with the new todos
	$: if (browser) {
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	// Temporarily store the new todo
	let newTodo = '';

	// Should we show done todos?
	let showDone = true;

	// Todo list shown in the UI
	// If we want to show done todos, we'll just use the todos array
	// else, we'll filter out the done todos
	$: todoList = showDone ? todos : todos.filter((todo) => !todo.done);
</script>

<svelte:head>
	<!-- Lets get some default styling with https://picocss.com -->
	<!-- This is where most of the colour and sizing comes from. The layout we handle -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css" />
</svelte:head>

<!--
    If you're wondering where I'm getting all of these classes from,
    thats UnoCSS. These get compiled down into a single scoped class name
    in production builds.
-->
<header>
	<hgroup class="text-center">
		<h1>Doen</h1>
		<h2>Your next todo list</h2>
	</hgroup>
</header>

<main class="mx-4">
	<div class="flex flex-row gap-4 mb-4">
		<h3 class="my-auto">Todos</h3>
		<div class="flex gap-4 items-center">
			<label for="show-done">Show done</label>
			<!-- bind:checked syncs the checkbox's checked attribute with the showDone variable -->
			<input type="checkbox" bind:checked={showDone} id="show-done" />
		</div>
	</div>

	<ul class="flex flex-col">
		<!-- (todo.id) makes sure that svelte properly diffs the list -->
		{#each todoList as todo (todo.id)}
			<!-- animate:flip applies a FLIP animation to the list item -->
			<!-- This means that when the item moves, it animates smoothly across the list -->
			<li class="grid grid-cols-6 gap-4" animate:flip={{ duration: 150 }}>
				<!-- The first way of applying a class based on a variable: inline JS -->
				<input
					type="text"
					bind:value={todo.text}
					class="col-span-4 {todo.done ? 'bg-green-500/40' : ''}"
				/>
				<!-- The second way of applying a class based on a variable: the class directive -->
				<!-- class:name={boolean}. If true, the class is added -->
				<button
					on:click={() => (todo.done = !todo.done)}
					class:bg-red-500={todo.done}
					class:bg-blue-500={!todo.done}
				>
					{#if todo.done}
						Unmark
					{:else}
						Mark Done
					{/if}
				</button>
				<button on:click={() => removeTodo(todo.id)}>Remove</button>
			</li>
		{/each}
	</ul>

	<!-- This is the wrong way to use forms in sveltekit. I'll show you the right way in a later post. -->
	<form on:submit|preventDefault={() => addTodo(newTodo)} class="grid grid-cols-7 gap-4">
		<input
			type="text"
			bind:value={newTodo}
			placeholder="What needs to be done?"
			class="col-span-6"
		/>
		<button type="submit">Add</button>
	</form>
</main>

<main class="mx-4">
	<div class="flex flex-row gap-4 mb-4">
		<h3 class="my-auto">Todos</h3>
		<div class="flex gap-4 items-center">
			<label for="show-done">Show done</label>
			<!-- bind:checked syncs the checkbox's checked attribute with the showDone variable -->
			<input type="checkbox" bind:checked={showDone} id="show-done" />
		</div>
	</div>

	<ul class="flex flex-col">
		<!-- (todo.id) makes sure that svelte properly diffs the list -->
		{#each todoList as todo (todo.id)}
			<!-- animate:flip applies a FLIP animation to the list item -->
			<!-- This means that when the item moves, it animates smoothly across the list -->
			<li class="grid grid-cols-6 gap-4" animate:flip={{ duration: 150 }}>
				<!-- The first way of applying a class based on a variable: inline JS -->
				<input
					type="text"
					bind:value={todo.text}
					class="col-span-4 {todo.done ? 'bg-green-500/40' : ''}"
				/>
				<!-- The second way of applying a class based on a variable: the class directive -->
				<!-- class:name={boolean}. If true, the class is added -->
				<button
					on:click={() => (todo.done = !todo.done)}
					class:bg-red-500={todo.done}
					class:bg-blue-500={!todo.done}
				>
					{#if todo.done}
						Unmark
					{:else}
						Mark Done
					{/if}
				</button>
				<button on:click={() => removeTodo(todo.id)}>Remove</button>
			</li>
		{/each}
	</ul>

	<!-- This is the wrong way to use forms in sveltekit. I'll show you the right way in a later post. -->
	<form on:submit|preventDefault={() => addTodo(newTodo)} class="grid grid-cols-7 gap-4">
		<input
			type="text"
			bind:value={newTodo}
			placeholder="What needs to be done?"
			class="col-span-6"
		/>
		<button type="submit">Add</button>
	</form>
</main>
```

If you find any of this file confusing,
please message me on discord `@tabiasgeehuman`
so I can improve this guide.

##### `+layout.svelte`

Svelte has the concept of layouts, which are basically wrappers
around pages. The neat thing about layouts is that they can be _nested_.
This allows for some incredibly powerful stuff, like having a
layout for your entire app, and then in the `/settings` route
having a layout for the settings page, so e.g. the sidebar is
shared between the settings pages.

Let's create a layout for our app:

`+layout.svelte`:

```svelte
<!-- Lets keep the default styling across pages -->
<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css" />
</svelte:head>

<!-- Lets also keep the header-->
<header>
	<hgroup class="text-center">
		<h1>Doen</h1>
		<h2>Your next todo list</h2>
	</hgroup>
</header>

<main class="mx-4">
	<!-- The slot component is where the inner html will be inserted -->
	<slot />
</main>
```

... and update our `+page.svelte` file:

```svelte
<script lang="js">
	// script tag stays the same
</script>

<!--
    since the layout wraps this page,
    we don't have to wrap the page in <main> nor include the <header>
-->

<div class="flex flex-row gap-4 mb-4">
	<h3 class="my-auto">Todos</h3>
	<div class="flex gap-4 items-center">
		<label for="show-done">Show done</label>
		<input type="checkbox" bind:checked={showDone} id="show-done" />
	</div>
</div>

<ul class="flex flex-col">
	<!-- (todo.id) makes sure that svelte properly diffs the list -->
	{#each todoList as todo (todo.id)}
		<!-- animate:flip applies a FLIP animation to the list item -->
		<!-- This means that when the item moves, it animates smoothly across the list -->
		<li class="grid grid-cols-6 gap-4" animate:flip={{ duration: 150 }}>
			<!-- The first way of applying a class based on a variable: inline JS -->
			<input
				type="text"
				bind:value={todo.text}
				class="col-span-4 {todo.done ? 'bg-green-500/40' : ''}"
			/>
			<!-- The second way of applying a class based on a variable: the class directive -->
			<!-- class:name={boolean}. If true, the class is added -->
			<button
				on:click={() => (todo.done = !todo.done)}
				class:bg-red-500={todo.done}
				class:bg-blue-500={!todo.done}
			>
				{#if todo.done}
					Unmark
				{:else}
					Mark Done
				{/if}
			</button>
			<button on:click={() => removeTodo(todo.id)}>Remove</button>
		</li>
	{/each}
</ul>

<form on:submit|preventDefault={() => addTodo(newTodo)} class="grid grid-cols-7 gap-4">
	<input
		type="text"
		bind:value={newTodo}
		placeholder="What needs to be done?"
		class="col-span-6"
	/>
	<button type="submit">Add</button>
</form>
```

Now every route will be wrapped in the layout we created,
inherit the styling and header. During client side navigation,
only the new page's code will be loaded,
and the layout will not have to be re-downloaded nor rerendered.
Neat!

#### The `src/app.d.ts` file

This is a typescript-specific file that declares extra types for the app.
This is where you can declare types for e.g. locals,
which are variables shared between a specific server and client connection.

#### The `src/app.html` file

This is the bare bones html file that sveltekit uses to render your app.
It's pretty simple, and you can add whatever you want to it that will be
rendered on every page. It's effectively a lightweight `/routes/+layout.svelte`,
except even it can't be affected by errors.

#### The `src/hooks.server.ts` file

This is where you can put server-side hooks for your app. These
run on every request, and can be used to e.g. log requests, setup
database connections, etc.

## Conclusion

That's it for this part of the guide! While also fairly boring,
we now have a basic understanding of the project structure and routing,
along with a basic todo list app. However, this todo list app is
not very, well, sveltekit-y. In the next part of the guide, we'll
be setting up a database via drizzle, and using `+page.server.ts` to fetch
the todos from the database.
