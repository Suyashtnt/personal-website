---
title: 'The Svelte/Kit tutorial: Part 1 | What is Svelte anyways?'
description: 'Welcome to your local wobblers guide to Svelte 5 (And SvelteKit). This is an introduction both frameworks.'
author: 'Suyashtnt'
date: '2024-06-26 20:40'
updated: '2024-06-26 20:40'
published: false
---

<script lang="ts">
    import Note from "$lib/components/note.svelte"
</script>

<Note>
This is a remake of <a href="/posts/sveltekit-guide-part-1">the original guide</a>.
This one is for the Svelte 5 and takes a different approach
than I originally intended (hopefully for the better).
</Note>

So, you've heard of Svelte (maybe from me!). Or maybe you've even heard of Sveltekit,
but have no idea what it is. If thats the case, welcome to the guide™️.
This guide will teach you Svelte 5 and Sveltekit _practically,_
by making an overly complex todo app!
We'll be adding accounts, collections, progressive enhancement,
a blog, and more! This guide will be updated to Sveltekit 2
when it comes out, so don't worry about that.

<Note>
If you want a more guided and less practical tutorial,
<a href="https://learn.svelte.dev">the official tutorial</a>
is a great place to start.
</Note>

## What is Svelte, anyways?

For web devs: Svelte is the equivalent of Vue or React, but better.
For non web devs: Svelte makes writing websites easier by making
Javascript _reactive_ and allowing you to write _declarative_ HTML.

> _"Declarative html?"_

Imagine if you could _inject_ variables into your HTML.

```svelte
<script>
    let name = "Svelte";
</script>

<h1>Hello {name}!</h1>
```

...and then, when you change the variable, the HTML updates.

```svelte
<script>
    // Lets tell this hypothetical framework
    // that this variable is "reactive"
    // which means that when it changes,
    // the things that "depend" it will update
    let name = reactive("Svelte");

    setTimeout(() => {
        name = "SvelteKit";
    }, 1000);
</script>

<!-- After 1 second, the text changes to "Hello SvelteKit!"
        since the h1 uses, and therefore "depends" on name -->
<h1>Hello {name}!</h1>
```

This is what Svelte does. In fact, the code above is nearly Svelte!.
All we need to do is use Svelte's name for `reactive`: `$state`

```svelte
<script>
    // $state is a way to tell Svelte
    // that this variable can change
    // and it needs to react to changes.
    let name = $state("Svelte");

    setTimeout(() => {
        name = "SvelteKit";
    }, 1000);
</script>

<!-- Now Svelte knows to update this when name changes -->
<h1>Hello {name}!</h1>
```

Svelte is a compiler that turns this code into regular Javascript.
It's extremely optimised, nearing hand-made JS speeds.
This is why Svelte is so great: Easy development while not being so costly 
in terms of performance.

## Now what about SvelteKit?

While Svelte allows you to write your HTML/webpages like this,
it doesn't really give you a way to _structure_ your app.
Svelte doesn't handle routing (What to send to the user when they visit `/home` vs. `/about`),
data fetching (How do you request and handle HTTP/API requests),
backend code (Databases, your own API, authentication), etc.
This is where SvelteKit comes in. It handles all of the above*, and more.
The next part will go more in depth about SvelteKit, but let's start with...

<Note>
* SvelteKit doesn't directly handle Databases and authentication,
but it does provide a way to structure your backend and there
are various packages that do handle databases and authentication.
</Note>

## The Svelte Basics: Reactivity

<Note>
I assume you understand the basics of HTML, CSS, and JS.
Anything advanced will be explained, but you should be
somewhat comfortable with reading and writing all 3 languages
at a basic level.
</Note>

This will be a basic rundown on the reactivity concepts of Svelte 5,
as this is the main thing that has changed from Svelte 4 and the biggest
part of Svelte as a whole.

### $state
`$state` is fairly simple: it tells Svelte that the variable is _reactive state._

> _"What the hell does that even mean?"_
 
The state of a component is the variables the component depends on to function properly.
Take this basic example:

```svelte
<script>
let count = 0
</script>

<p> Current count: {count} </p>

<button> Add 1 to count </button>
```

The state of the component would be the `count` variable,
as without it, the component can't figure out the contents inside the `p`

However, this isn't _reactive_ as far as Svelte is concerned.
Svelte doesn't know that the `count` state could change,
that the `p` tag should update it's content when it does,
nor does it know that the button should add 1 when it's clicked.
Let's tackle making Svelte understand it's reactive first. I've already
shown you how it works earlier: just wrap it in the `$state` _rune_.

> _"Rune?"_

Runes are Svelte 5 way of describing reactivity. 
These are not just regular functions, but rather a 
marker for the Svelte compiler that says the variable
is reactive and can change.

Try using one yourself!



