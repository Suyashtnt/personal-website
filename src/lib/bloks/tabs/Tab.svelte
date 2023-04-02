<script context="module" lang="ts">
    export interface TabBlok extends SbBlokData {
        name: string;
        content: SbBlokData[];
    }
</script>

<script lang="ts">
	import { goto } from "$app/navigation";
	import type { SbBlokData } from "@storyblok/js";
	import { createEventDispatcher } from "svelte";


    export let blok: TabBlok;
    export let active: boolean;

    const dispatch = createEventDispatcher<{
        click: void;
    }>()
</script>

<a
    class="
        text-7xl px-4 py-2 text-center flex-1
        rounded-xl border-none hover:cursor-pointer decoration-none
        bg-clip-text text-transparent visited:text-transparent
        bg-gradient-to-tr
        from-light-blue to-light-sapphire
        dark:from-dark-blue dark:to-dark-sapphire
    "

    class:bg-clip-unset={active}

    class:text-light-surface-0={active}
    class:dark-text-dark-surface-0={active}

    class:visited-text-surface-0={active}
    class:visited-dark-text-dark-surface-0={active}

    id={blok.name?.toString()}
    href={`#${blok.name}`}

    on:click|preventDefault={() => {
        dispatch("click");
        goto(`#${blok.name}`, { noScroll: true });
    }}
>
    {blok.name}
</a>
