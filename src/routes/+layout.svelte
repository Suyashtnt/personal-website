<script lang="ts">
	import ParaglideSveltekitAdapter from '$lib/i18n/ParaglideSveltekitAdapter.svelte';
	import { setupViewTransition } from 'sveltekit-view-transition';

	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import '../app.css';

	setupViewTransition();
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Recursive:wght,CASL,MONO@300..800,0..1,0..1&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<ParaglideSveltekitAdapter>
	<Header />
	<main class="bg-light-base text-light-text dark:bg-dark-base dark:text-dark-text">
		<slot />
	</main>
	<Footer />
</ParaglideSveltekitAdapter>

<!-- Due to the new way unocss svelte-scoped works, we need to use this -->
<style>
	:global(a) {
		--at-apply: 'text-light-blue visited:text-light-lavender dark:text-dark-blue dark:visited:text-dark-lavender';
	}

	:global(body) {
		font-family: 'Recursive', sans-serif;
		font-variation-settings:
			'wght' 450,
			'MONO' 0;

		min-height: 100vh;

		&:has(#dropdown-button[data-active='true']) {
			overflow: hidden;
		}
	}

	:global(h1, h2, h3, h4, h5, h6) {
		transition: all 150ms ease-in-out;
		font-variation-settings: 'CASL' 0;
		font-weight: 500;

		&:hover {
			font-variation-settings: 'CASL' 1;
			font-weight: 800;
		}
	}

	:global(code) {
		font-family: 'Recursive', monospace !important;
		font-variation-settings:
			'MONO' 1,
			'wght' 450;
	}

	:global(html, body) {
		scroll-behavior: smooth;
		--at-apply: 'bg-light-base dark:bg-dark-base';
	}

	:root {
		view-transition-name: none;
	}
</style>
