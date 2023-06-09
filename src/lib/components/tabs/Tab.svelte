<script lang="ts">
	import { page } from "$app/stores";
    $: active = $page.url.pathname.includes(path);

    export let name: string;

    /**
     * The path to the page.
     * Should be relative to the root of the website. (e.g. /about)
     */
    export let path: string;
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

    class:important-bg-clip-unset={active}

    class:important-text-light-surface-0={active}
    class:important-dark-text-dark-surface-0={active}

    class:important-visited-text-surface-0={active}
    class:important-visited-dark-text-dark-surface-0={active}

    id={name}
    href={path}
    data-sveltekit-noscroll
>
    {name}
</a>
