<script lang="ts">
	import './app.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';
	import Header from './Header.svelte';
</script>

<main class="bg-light-base text-light-text dark:bg-dark-base dark:text-dark-text">
	<Header />
	<slot />
</main>
