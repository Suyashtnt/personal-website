<script lang="ts">
	import * as m from '$i18n/messages';

	import LanguagePicker from './languagePicker.svelte';

    let dropdownOpen = false
</script>

<!-- TODO: mobile -->

<nav class="top-4 z-10 ma-4 flex items-center justify-between border-2 border-light-mantle/80 rounded-xl border-solid bg-light-mantle/20 px-2 backdrop-blur lg:sticky dark:border-dark-subtle/80 dark:bg-dark-surface_background/70 sm:px-8 dark:bg-hero-diagonal-lines-[#acaaff]/20 relative">
    <h1>
        <a
            class="text-light-text decoration-none dark:text-dark-base_foreground visited:text-light-text dark:visited:text-dark-base_foreground"
            href="/"
        >
            TNTMAN_1671
        </a>
    </h1>

    <button
      type="button"
      class="dropdown__title block sm:hidden h-80% aspect-square bg-dark-surface_background border-none rounded-xl text-4xl flex items-center justify-center"
      aria-expanded={dropdownOpen}
      aria-controls="sweets-dropdown"
      on:click={() => dropdownOpen = !dropdownOpen}
    >
      <span class="inline-block i-ic-menu" aria-label="Dropdown menu" />
    </button>

    <div
    class="links rotate-x-90 -translate-x-1/2 left-1/2 top-[calc(100%+0.25rem)] origin-top-center opacity-3/10 sm:rotate-x-0 sm:opacity-full absolute flex-row items-center gap-8 text-center sm:gap-2 sm:text-2xl sm:flex sm:relative transition-all invisible sm:visible bg-dark-overlay_background rounded-xl sm:left-0 sm:top-0 sm:translate-x-0 pa-2 text-4xl sm:p-0 sm:pl-4 items-center"
    >
        <a href="/" class="flex flex-row items-center">
            <span class="inline-block i-ic-play-arrow"/>
            {m.header_home()}
        </a>
        <a href="/posts" class="flex flex-row items-center">
            <span class="inline-block i-ic-play-arrow"/>
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
