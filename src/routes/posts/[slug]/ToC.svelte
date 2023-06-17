<script lang="ts">
	import { page } from "$app/stores";
	import type { DataItemWithChildren } from "./+page";

    export let depth: 1 | 2 | 3 | 4 | 5 | 6;
    export let value: string | null;
    export let children: readonly DataItemWithChildren[];

    // remove all grammar from the href
    // replace all spaces with dashes
    const href = value?.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-')

    $: active = $page.url.hash === href;
</script>

<!-- according to catppuccin style guidelines: red, peach, yellow, green, sapphire, Lavender -->
<li class="pb-1">
    <a
        class="
        text-inherit decoration-none relative inline-block
        after:bg-none after:bg-repeat after:bg-scroll after:bottom-0 after:content-empty after:block after:h-0.5 after:absolute after:transition-all after:w-0
        hover:after:w-full
        "
        class:important-decoration-underline={active}

        class:text-light-red={depth === 1}
        class:visited-text-light-red={depth === 1}
        class:dark-text-dark-red={depth === 1}
        class:visited-dark-text-dark-red={depth === 1}
        class:after-bg-light-red={depth === 1}
        class:after-dark-bg-dark-red={depth === 1}

        class:text-light-peach={depth === 2}
        class:visited-text-light-peach={depth === 2}
        class:dark-text-dark-peach={depth === 2}
        class:visited-dark-text-dark-peach={depth === 2}
        class:after-bg-light-peach={depth === 2}
        class:after-dark-bg-dark-peach={depth === 2}

        class:text-light-yellow={depth === 3}
        class:visited-text-light-yellow={depth === 3}
        class:dark-text-dark-yellow={depth === 3}
        class:visited-dark-text-dark-yellow={depth === 3}
        class:after-bg-light-yellow={depth === 3}
        class:after-dark-bg-dark-yellow={depth === 3}

        class:text-light-green={depth === 4}
        class:visited-text-light-green={depth === 4}
        class:dark-text-dark-green={depth === 4}
        class:visited-dark-text-dark-green={depth === 4}
        class:after-bg-light-green={depth === 4}
        class:after-dark-bg-dark-green={depth === 4}

        class:text-light-sapphire={depth === 5}
        class:visited-text-light-sapphire={depth === 5}
        class:dark-text-dark-sapphire={depth === 5}
        class:visited-dark-text-dark-sapphire={depth === 5}
        class:after-bg-light-sapphire={depth === 5}
        class:after-dark-bg-dark-sapphire={depth === 5}

        class:text-light-lavender={depth === 6}
        class:visited-text-light-lavender={depth === 6}
        class:dark-text-dark-lavender={depth === 6}
        class:visited-dark-text-dark-lavender={depth === 6}
        class:after-bg-light-lavender={depth === 6}
        class:after-dark-bg-dark-lavender={depth === 6}

        href={`#${href}`}
    >{value}</a>
    {#if children.length > 0}
        <ol class="flex flex-col">
            {#each children as child}
                <svelte:self {...child} />
            {/each}
        </ol>
    {/if}
</li>