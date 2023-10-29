---
title: "VueJS: Great ideas, good execution, outshone by the competition"
description: "A look on Vue.JS."
author: "Suyashtnt"
date: "2023-05-23 22:06"
updated: "2023-07-03 22:06"
published: true
---

<script lang="ts">
import Note from "$lib/components/note.svelte"
</script>

<Note>
This blog post was initially an essay for school, so that's why it's closer to an essay than a blog post. This is also my first blog post so that's exciting.
</Note>

While this post mainly criticizes Vue, I do not at all think its a bad framework. It was actually the first JS framework I learnt. It has and still is an incredible framework and web development would be different today without it. I am not saying don't use Vue or that you should switch from it, but rather pointing out some of its issues that other frameworks have either solved or don't have.

## Introduction

VueJS is lauded as a highly flexible and accessible web framework, but is it really _that_ good? While it does many things right, it also does many things wrong. It is known for being fast, lightweight, and straightforward when setting up complex applications. However, other frameworks are much faster and remove tons of unnecessary complexity. While Vue is known for its massive ecosystem, it is also split. Vue 3 is known to bring many improvements and remove much of the complexity of Vue 2, but with such significant changes also come enormous technical debt. The following essay will discuss these issues in detail and show why Vue is good but needs to be improved to keep up with its new competition.

## Lost simplicity

VueJS was known to be one of the most straightforward frameworks, but that has severely degraded. Let us take a trip down the passage of time. In the year 2013, web frameworks could have been better. BackboneJS was too heavyweight and focused on the code organisation rather than syncing variables with the DOM. Look at their [to-do List Example](https://backbonejs.org/docs/examples/todos/todos.html). The code is lengthy, unnecessarily complex, and not "reactive." You still have to tell what the compiler to do when a variable changes; it is _imperative_ code.

Take the following imperative JS code

```html
<script>
    let count = 0;
    // we get elements in JS
    const button = document.getElementById("btn");
    const counter = document.getElementById("counter");
    // we handle event listening in JS
    button.addEventListener("click", handleCount);

    function handleCount() {
        count++;
        // we have to tell JS to update the counter manually
        counter.innerHTML = `Count: ${count}`;
    }
</script>

<button id="btn">Click me!</button>
<p id="counter">Count: 0</p>
```

...versus the following declarative Vue code

```html
<div id="app">
    <!-- you declare what method you want to call here -->
    <button v-on:click="increment">click me!</button>
    <p>Count: {{ count }}</p>
</div>

<script>
    new Vue({
        el: "#app", // tell vue where your app is
        data: {
            count: 0,
        },
        methods: {
            // define methods that update your data/run code
            increment() {
                this.count++; // simply update your state. Vue changes the DOM for you
            },
        },
    });
</script>
```

While imperative is not necessarily _worse_ than declarative, imperative usually leads to a messier code without strict guidelines. BackboneJS added those guidelines, but it still leads to bulky, hard-to-read code, as seen in their To-do list example. Conversely, Vue took the more straightforward approach: Make the framework work for you. These solutions provided _were_ great, but now we have moved on from that.

Let us look at modern Vue. The Options API is bulky. It also creates many opportunities to shoot yourself in the foot. In the above example, if you were to replace `increment` with an arrow function, it would no longer work. Vue 3 saw these issues and fixed them through the _Composition API_.

```html
<template>
    <!-- you declare what method you want to call here, or just put your code in -->
    <button @click="count++">click me!</button>
    <p>Count: {{ count }}</p>
</template>

<script setup>
    import { ref } from "vue"; // import ref, which is a reactive variable
    const count = ref(0); // create a reactive variable. When this changes it updates the DOM automatically
</script>
```

This API was effectively stolen from another framework, React. React created _React Hooks_ and Vue transformed them into the Composition API. The composition API is far learer and has less boilerplate, which leads to far cleaner code. However, the API is not without its flaws. We have to tell Vue that we want the variable to be reactive, and we have to import this functionality from Vue, which is just boilerplate. Vue also changes many things when using `ref`, which can cause many compatibility issues.

The primary issue is that `ref` and `reactive` (Which is `ref` but it applies to objects) introduces a _proxy object._ Vue handles updating the DOM by using a proxy object. When the variable changes, the proxy object tells Vue. However, this causes major issues. Firstly, `count` is no longer simply a number but now a `Proxy`. We need to unwrap this proxy object to access the variable, which means we get even more boilerplate when accessing the variable. Other frameworks/libraries an application may use could have some incompatibility issues when handling Proxies. Instead of simply getting `count`, we need to get `count.value`. While this may initially seem like a small change, in larger, more complex codebases, code can get ugly.

This issue is so big that others have made their solutions, but these also have their struggles. Look at [Vue Macro's _reactivity transform_](https://vue-macros.sxzz.moe/features/reactivity-transform.html). It is a compile-time plugin that wraps around `ref`, creating `$ref`. `$ref` can be used as a normal variable, and at compile time, it gets translated back to `ref`. This transformation still causes issues, though.

Take the following code:

```js
function useMouse() {
    const x = $ref(0);
    const y = $ref(0);
    // do some stuff to change x and y via events
    return { x, y };
}
```

This gets transformed/unwrapped into

```js
function useMouse() {
    const x = ref(0);
    const y = ref(0);

    return { x: x.value, y: y.value }; // x and y are no longer reactive!
}
```

`$ref` values stop being reactive when returned from a function because they get changed to `ref.value`. `.value` is not the proxy object, so it is not reactive. Instead, We have to do `return $$({ x, y })`. We still have the issues of boilerplate, and we still have the woes of proxy objects. All of these issues go _against_ Vue's motto of being simple and lightweight. Vue 3 still allows you to use the options API if you do not want to deal with these proxy objects, but allowing both options has its issues.

The Options and Setup API are compatible, but in a strange way. First of all, it is only 1-way compatibility. Options API code can call into the `setup()` function, but the `setup()` function cannot access methods and data from the Options API.

```html
<script>
    import { ref } from "vue";

    export default {
        setup() {
            // as far as I know and tested, you have no access to `this` here. this means you don't have access to data or methods here
            const count = ref(0);

            // expose to template and other options API hooks
            return {
                count,
            };
        },

        mounted() {
            console.log(this.count); // 0
        },
    };
</script>

<template>
    <button @click="count++">{{ count }}</button>
</template>
```

It is more meant as a migration tool than direct compatibility, but more is required to help the situation. If a person wants to migrate a codebase to the Composition API, they may call their existing code in your Composition API code, which is currently disallowed. The composition API caused a massive ecosystem split between Vue 2 and 3 code, which affects the whole ecosystem.

## A split ecosystem is not a simple one

Due to the massive changes made in Vue 3 and the composition API, Vue has a very split ecosystem. Migrating libraries to Vue 3 has taken multiple Years. Take Nuxt. Nuxt is an incredibly popular full-stack framework for Vue, but until last year you could not use it with Vue 3. Vue 3 was released back in late 2020. Nuxt 3 was only released in late 2022. The late release left many apps stuck on Nuxt 2, which is still the most used version of Nuxt because it takes time and effort to migrate over. The migration project (Nuxt Bridge) is still declared semi-stable and only partially supports what Nuxt 3 offers. The weird migration strategy drives away Nuxt 2 users from migrating to Nuxt 3 and extends to the rest of the Vue ecosystem.

Vue Demi exists for this reason: to solve these compatibility issues. While the bundle size is not big, at under a kilobyte, getting your library working with both framework versions is still more work and effort. The extra effort required goes against Vue's main point of being simple and easy. While other frameworks also have difficult migration for major changes, none has been as big as Vue 2 to 3.

## The competition is fierce

A few other frameworks now do what Vue was built to do, but better. Take the two big new frameworks: Svelte and SolidJS. Svelte describes itself as "a radical new approach to building user interfaces.", while SolidJS describes itself as "Simple and performant reactivity for building user interfaces." Both of these sound like what Vue was meant to do initially, create a new, simple, and performant way to create apps. Both of these frameworks achieve this goal, and the weight of technical legacy baggage no longer drags them down.

Take a look at the following svelte code:

```html
<script>
    let count = 0;
</script>

<button on:click="{()" ="">count++}> click me!</button>
<p>Count: {count}</p>
```

It does not use special functions, wrappers, or proxies. `count` is still just a regular number; Svelte detects changes by not detecting changes but rather where it will change. Instead of using proxy objects to see when it changes, it _injects_ new code whenever you directly change the variable, which tells Svelte that this variable is no longer valid and that its dependencies need to be rerendered.

```js
const click_handler = () => $$invalidate(0, count++, count); // this is what on:click in the previous code sample gets compiled into. See how count is simply just changed and then invalidated by the framework?
```

This method means the compiled code is highly performant since Svelte knows _where_ you update the variable.

SolidJS is even more fine-grained, although it is far from Vue's syntax. Take a look at this:

```js
import { render } from "solid-js/web";
import { createSignal } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(0); // create a signal, which is effectively a getter and a setter pair which solidJS can optimise the hell out of
  const increment = () => setCount(count() + 1);

  // <> is special JSX syntax. Doesn't matter for this context.
  return (
    <>
      <button onClick={increment}>
        click me!
      </button>
      <p>count: {count()}</p>
    </>
  );
}

// render the component into an element with the ID of app
// This effectively "mounts" the app to the DOM. This is usually done outside of the component however.
render(() => <Counter />, document.getElementById("app")!);
```

While this has more boilerplate than Vue, it is near the speed of regular JS code and a fraction of the bundle size. The generated code is also far more fine-grained and directly injects variables, creating incredibly performant code.

These two frameworks don't just do what Vue does: they do _more._ Svelte has stores and its transition API, while SolidJS has incredible rendering flexibility and fine-grained reactivity, which makes it the fastest-performing JS framework. Vue has a transition API, which is unnecessarily tied to manual CSS since it still requires JS.

```html
<button @click="visible = !visible">Toggle</button>
<Transition>
    <p v-if="visible">Fades in and out</p>
</Transition>

<style>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>

<script setup>
    const visible = ref(true);
</script>
```

Svelte, on the other hand, has a flexible, JS-powered transition API.

```html
<script>
    import { fade } from "svelte/transition";
    let visible = true;
</script>

<label>
    <!-- Special svelte bind syntax -->
    <input type="checkbox" bind:checked="{visible}" />
    Toggle
</label>

{#if visible}
<p transition:fade>Fades in and out</p>
{/if}
```

Svelte adds a declarative `transition` item while Vue does imperative CSS. In this case, declarative ties the transition to the component, which makes the code easier to reason about what the transition does.

Another way these frameworks make code easier to reason about is how they allow you to do state management. Vue is based around semi-official tooling, with Pinia being Vue's recommended state management, but why have complex external state management when you can have a simpler, more flexible solution? Svelte has its solution to state management: Svelte stores. A store in Svelte is an object with a `subscribe` method, which gets updated when the value is changed. Svelte allows us to use stores in templates using a special `$` syntax, which allows the template to use the store effectively. There are also special stores such as `derived`, which make fetching and computing data simpler when stores change. See [The full code sample in the appendix](#code-sample-a) for svelte stores in action and how they simplify cross-file state management compared to Vue's Pinia state management. Svelte stores can also be used for more than state management. They have been used for state management across black boxes, such as connecting Tauri state to Svelte state (see [Glowsquids codebase](https://github.com/glowsquid-launcher/glowsquid-new) for an example of that). Svelte stores are SSR-compatible OOTB, while Pinia requires extra work for features such as client hydration.

With Vue (and Svelte), there are only two officially supported rendering schemes: Client side and server-side rendering. SolidJS has this neat benefit of being modern: incredible rendering flexibility. By default, it renders using Client-side rendering, or CSR for short. CSR means that the browser renders your whole app. Then there is server-side rendering or SSR. SSR is where the website is rendered by a server and sent to the client simultaneously. While these are good, they have their drawbacks. CSR can be slow, have large bundle sizes, and have poor SEO performance. Server-side rendering has to wait for the server to render the whole page, which may take a ton of time if we are doing, e.g. database queries. SolidJS and other frameworks solve this issue by having a new rendering method: Streaming SSR. What this does is _instantly_ load the minimum amount of data, then add placeholders for the `lazy` or async components and stream that data in the background. Streaming means the client never queries data, but the initial page load is incredibly quick since the rest of the HTML is streamed. Streaming in the slow data leads to great initial page load times and fewer things for the client to compute since the server can compute the data instead and stream it over. SvelteKit, Svelte's full-stack framework, has a similar way of doing this, but sadly does not stream in the HTML but rather the data itself. Vue has no support for these features, which is a huge downside compared to the new frameworks.

## Conclusion

While Vue is good, it has been outshone by its competitors. It started as an extremely simple and relatively fast framework, but years of technical debt have now accumulated. Having two different ways of doing the same thing with various foot guns in each prevents it from being nearly boilerplate. A split ecosystem prevents companies from adopting its latest version, and it is now being beaten at what was its own game: being a simple, fast framework. While it is still an excellent choice, there are far better choices out there than when it was first made.

## Appendix

### Code Sample A

Svelte state management through stores

`stores.js`

```js
import { writable } from "svelte/store";

export const count = writable(0);
```

`Incrementer.svelte`

```html
<script>
    import { count } from "./stores.js";

    function increment() {
        count.update((n) => n + 1);
    }
</script>

<button on:click="{increment}">+</button>
```

`Decrementer.svelte`

```html
<script>
    import { count } from "./stores.js";

    function decrement() {
        count.update((n) => n - 1);
    }
</script>

<button on:click="{decrement}">-</button>
```

`App.svelte` (Entrypoint to the svelte app)

```html
<script>
    import { count } from "./stores.js";
    import Incrementer from "./Incrementer.svelte";
    import Decrementer from "./Decrementer.svelte";
</script>

<h1>The count is {$count}</h1>

<Incrementer />
<Decrementer />
```

`index.js` (Mounting svelte component to the DOM)

```js
import App from "./App.svelte";

new App({
    target: document.body,
});
```

Vue state management

`stores.js`

```js
export const useCounterStore = defineStore("counter", () => {
    const count = ref(0);

    function increment() {
        count.value++;
    }

    function decrement() {
        count.value++;
    }

    return { count, decrement, increment };
});
```

`Incrementer.vue`

```html
<script setup>
    import { useCounterStore } from "./stores.js";
    const store = useCounterStore();
</script>

<template>
    <button @click="{store.increment}">+</button>
</template>
```

`Decrementer.vue`

```html
<script setup>
    import { useCounterStore } from "./stores.js";
    const store = useCounterStore();
</script>

<template>
    <button @click="{store.decrement}">-</button>
</template>
```

`App.vue` (Entrypoint to the Vue app)

```html
<script setup>
    import { useCounterStore } from "./stores.js";
    const store = useCounterStore();

    import Incrementer from "./Incrementer.vue";
    import Decrementer from "./Decrementer.vue";
</script>

<template>
    <h1>The count is {{ store.count }}</h1>

    <Incrementer />
    <Decrementer />
</template>
```

`index.js` (Adding pinia to Vue and mounting component to the DOM)

```js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app"); // Vue reccomends to rather mount to a regular element rather than the body
```
