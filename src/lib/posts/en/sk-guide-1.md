---
title: 'The Svelte/Kit tutorial: Part 1 | What the hell are these anyways?'
description: 'Welcome to your local wobblers guide to Sveltekit. This is an introduction to SvelteKit and Svelte 5.'
author: 'Suyashtnt'
date: '2023-12-24 20:40'
updated: '2023-12-24 20:40'
published: false
---

<script lang="ts">
    import Note from "$lib/components/note.svelte"
</script>

<Note>
This is a remake of <a href="/posts/sveltekit-guide-part-1">the original guide</a>.
This one is for the Svelte 5 beta and takes a different approach
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

> Declarative html?

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
    // lets tell this """hypothetical""" framework
    // that this variable is "reactive"
    // which means that when it changes,
    // the things that "depend" it will update
    let name = $state("Svelte");

    setTimeout(() => {
        name = "SvelteKit";
    }, 1000);
</script>

<!-- After 1 second, the text changes to "Hello SvelteKit!"
        since the h1 "depends" on name -->
<h1>Hello {name}!</h1>
```

This is what Svelte does. The code above, _is_ Svelte.
Svelte is a compiler that turns this code into regular Javascript,
which means its extremely fast and lightweight, nearing raw hand-made
JS speeds. This is why Svelte is so great.

## Now what about SvelteKit?

While Svelte allows you to write your HTML like this,
it doesn't really give you a way to _structure_ your app.
Svelte doesn't know how to handle routing, data fetching, backends, etc.
This is where SvelteKit comes in. It handles all of the above, and more.
The next part will go more in depth about SvelteKit, but let's start with...

## The Svelte Basics
