<script lang="ts">
	import * as m from '$i18n/messages';

	import LanguagePicker from './languagePicker.svelte';

    let dropdownOpen = false
</script>

<!-- TODO: mobile -->

<nav class="relative top-4 z-10 mx-4 mb-4 flex items-center justify-between border-2 border-light-mantle/80 rounded-xl border-solid bg-light-mantle/20 pl-2 backdrop-blur lg:sticky dark:border-dark-subtle/80 dark:bg-dark-surface_background/70 dark:bg-hero-diagonal-lines-[#acaaff]/20">
    <section class="flex items-center justify-around gap-2">
        <a
            class="flex items-center justify-around gap-2 text-light-text decoration-none dark:text-dark-base_foreground visited:text-light-text dark:visited:text-dark-base_foreground"
            href="/posts/the-wobbler"
        >
            <enhanced:img
                alt="TNTMAN_1671"
                class="aspect-square h-8 w-8 rounded-full align-middle transition-all hover:scale-105 hover:rounded-md hover:shadow-lg"
                sizes="32px 48px 64px"
                src="$lib/pictures/wobbler.png" />
        </a>

        <h1 class="my-0 text-2xl">
            <a
                class="text-light-text decoration-none dark:text-dark-base_foreground visited:text-light-text dark:visited:text-dark-base_foreground"
                href="/"
            >
                TNTMAN_1671
            </a>
        </h1>
    </section>

    <button
        aria-controls="sweets-dropdown"
        aria-expanded={dropdownOpen}
        class="dropdown__title block aspect-square flex items-center justify-center rounded-xl border-none bg-dark-surface_background pa-2 text-4xl sm:hidden"
        on:click={() => dropdownOpen = !dropdownOpen}
        type="button"
    >
        <span aria-label="Dropdown menu" class="i-ic-menu inline-block" />
    </button>

    <div
        class="links opacity-3/10 sm:opacity-full invisible absolute left-1/2 top-[calc(100%+0.25rem)] flex-row origin-top-center rotate-x-90 items-center items-center gap-8 rounded-xl bg-dark-overlay_background pa-2 text-center text-4xl transition-all sm:visible sm:relative sm:left-0 sm:top-0 sm:flex -translate-x-1/2 sm:translate-x-0 sm:rotate-x-0 sm:gap-2 sm:p-0 sm:pl-4 sm:text-2xl"
    >
        <a class="flex flex-row items-center" href="/">
            <span class="i-ic-play-arrow inline-block"/>
            {m.header_home()}
        </a>
        <a class="flex flex-row items-center" href="/posts">
            <span class="i-ic-play-arrow inline-block"/>
            {m.header_posts()}
        </a>
        <LanguagePicker />
    </div>
</nav>

<style>
    .links a {
        --at-apply: "decoration-none text-dark-surface_foreground visited:text-dark-surface_foreground";
    }

    nav {
        &:hover,
        &:focus-within {
            & .links {
                opacity: 1;
                transform: rotateX(0deg) translateX(-50%);
                visibility: visible;

                @media (min-width: 640px) {
                    transform: none;
                };
            }
        }
    }
</style>
