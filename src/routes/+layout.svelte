<script lang="ts">
	import ParaglideSveltekitAdapter from '$lib/i18n/ParaglideSveltekitAdapter.svelte';
	import { setupViewTransition } from 'sveltekit-view-transition';

	import '../app.css';
    import '$lib/fonts/Recursive/recursive.css'
	import Footer from './footer.svelte';
	import Header from './header.svelte';

	setupViewTransition();
</script>

<ParaglideSveltekitAdapter>
    <Header />
    <main
        class="bg-light-base text-light-text dark:bg-dark-base_background dark:text-dark-base_foreground"
    >
        <slot />
    </main>
    <Footer />
</ParaglideSveltekitAdapter>

<!-- Due to the new way unocss svelte-scoped works, we need to use this -->
<style>
	:global(a) {
		--at-apply: 'text-light-blue visited:text-light-lavender dark:text-dark-secondary_foreground dark:visited:text-dark-primary_foreground';
	}

	:global(body) {
		font-family: 'RecVar', sans-serif;
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
		font-family: 'RecVar', monospace !important;
		font-variation-settings:
			'MONO' 1,
			'wght' 450;
	}

    :global(html, body) {
        scroll-behavior: smooth;
        --at-apply: 'bg-light-base dark:bg-dark-base_background dark:text-dark-base_foreground';
    }

	:root {
		view-transition-name: none;
	}
</style>
