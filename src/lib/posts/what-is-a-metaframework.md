---
title: 'What the hell is a metaframework anyways?'
description: 'Svelte vs. Sveltekit, Vue vs. Nuxt, React vs. NextJS. Whats the difference?'
author: 'Suyashtnt'
date: '2023-07-30'
updated: '2023-07-30'
published: false
---

<script lang="ts">
import Note from "$lib/components/note.svelte"
</script>

<Note>
This blog post was going to be longer, but life (and laziness) prevented that.
</Note>

This is going to be an incredibly short post explaining the difference between a regular js framework (SolidJS, Svelte, React, Vue, etc) and a metaframework (SolidStart, Sveltekit, Nuxt, NextJS, etc).

## What is a framework even?

Before we get to metaframeworks, we need to understand their non-meta variants: frameworks. In this context, a (component) framework is a tool which helps you write your website in a simpler way, usually by adding features to HTML. They can do things like allow you to write your code in a more declarative way. They can remove complexity and make it simpler to mentally manage your apps state and what effects what (See [My post on vue](/posts/vue) on why frameworks are handy). They usually:

-   Help manage state (as stated) (pun not fully intended)
-   Remove complexity
-   Allow you to split your HTML into individual components, which can then be shared and have their own individual pieces of HTML, JS, and sometimes CSS (CSS modules/scoped CSS is a common thing frameworks do)
-   Are not that opinionated on _how_ your app works. They don't care about routing, state management patterns, or how you structure your code.

## So, what do metaframeworks do over these?

A metaframework, as the name suggests, is a framework on top of your component framework. These usually deal with higher level complexity or management. These usually:

-   Give you a way to do routing (most of them do file system routing)
-
