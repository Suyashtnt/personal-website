<script lang="ts">
	import * as m from '$i18n/messages';
	import '$lib/fonts/Anicons_webfont_kit/anicons-regular.css';

	import LanguagePicker from './languagePicker.svelte';
</script>

<!-- TODO: mobile -->

<nav class="top-4 z-10 ma-4 flex items-center justify-between border-2 border-light-mantle/80 rounded-xl border-solid bg-light-mantle/20 px-2 backdrop-blur lg:sticky dark:border-dark-subtle/80 dark:bg-dark-surface_background/70 sm:px-8 dark:bg-hero-diagonal-lines-[#acaaff]/20">
    <h1>
        <a
            class="text-light-text decoration-none dark:text-dark-base_foreground visited:text-light-text dark:visited:text-dark-base_foreground"
            href="/"
        >
            TNTMAN_1671
        </a>
    </h1>
    <div class="links hidden flex-row items-center gap-2 text-center text-2xl sm:flex">
        <a href="/" >
            <span class="anicon">M</span>
            {m.header_home()}
        </a>
        <a href="/posts" >
            <span class="anicon">M</span>
            {m.header_posts()}
        </a>
        <LanguagePicker />
    </div>
</nav>

<style>
	.anicon {
		font-family: 'Anicons Regular', sans-serif;
		font-variation-settings: 'TIME' 100;
		transition: all 0.2s cubic-bezier(0.64, 0.57, 0.67, 1.53);
	}

    .links a {
        --at-apply: "text-light-text decoration-none transition-all dark:text-dark-surface_foreground visited:text-light-text hover:casl dark:visited:text-dark-surface_foreground";
    }
</style>
