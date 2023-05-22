<script lang="ts">
	import './app.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';
	import Header from './Header.svelte';

	import lazyload from 'vanilla-lazyload';
	import { browser } from '$app/environment';

	if (browser && !document.lazyloadInstance) {
		document.lazyloadInstance = new lazyload({
			use_native: true
		});
	}
</script>

<main class="bg-light-base text-light-text dark:bg-dark-base dark:text-dark-text">
	<Header />
	<slot />
</main>

<style uno:preflights uno:safelist global></style>
