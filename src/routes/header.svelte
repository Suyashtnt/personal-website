<script lang="ts">
	import * as m from '$i18n/messages';

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
        --at-apply: "text-light-text decoration-none dark:text-dark-surface_foreground visited:text-light-text dark:visited:text-dark-surface_foreground";
    }
</style>
