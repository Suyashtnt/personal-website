<script lang="ts">
	import '$lib/fonts/Recursive/recursive.css';
    import ParaglideSveltekitAdapter from '$lib/i18n/ParaglideSveltekitAdapter.svelte';
    import { setupViewTransition } from 'sveltekit-view-transition';

	import type { LayoutData } from './$types';

	import '../app.css';
	import Footer from './footer.svelte';
	import Header from './header.svelte';

	setupViewTransition();

    interface Props {
        children: any
        data: LayoutData
    }
    const { children, data } = $props<Props>();

	$effect(() => {
	    // Keep the <html> lang attribute in sync with the current language
        document.documentElement.lang = data.language
    })
</script>

<ParaglideSveltekitAdapter>
    <Header />
    <main
        class="bg-light-base text-light-text dark:bg-dark-base_background dark:text-dark-base_foreground"
    >
        {@render children()}
    </main>
    <Footer />
</ParaglideSveltekitAdapter>

<!-- Due to the new way unocss svelte-scoped works, we need to use this -->
<style>
</style>
