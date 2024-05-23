<script lang="ts">
	import '$lib/fonts/Recursive/recursive.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { type CSSRuntimeProvider as CSSProviderType, Fragment } from '@master/css.svelte';
	import { type Snippet, onMount } from 'svelte';
	import { setupViewTransition } from 'sveltekit-view-transition';

	import type { LayoutData } from './$types';

	import '../app.css';
	import Footer from './footer.svelte';
	import Header from './header.svelte';

	setupViewTransition();

	interface Props {
		children: Snippet;
		data: LayoutData;
	}
	const { children, data }: Props = $props();

	let CSSRuntimeProvider: typeof CSSProviderType = $state<any>(Fragment);
	$effect(() => {
		// Keep the <html> lang attribute in sync with the current language
		document.documentElement.lang = data.language;
	});

	// onMount(async () => {
	// 	const { CSSRuntimeProvider: runtime } = await import('@master/css.svelte');
	// 	CSSRuntimeProvider = runtime;
	// });
</script>

<svelte:component config={import('../../master.css')} this={CSSRuntimeProvider}>
	<ParaglideJS {i18n}>
		<Header />
		<main class="bg:base fg:base pt:4x">
			{@render children()}
		</main>
		<Footer footerText={data.footerText} />
	</ParaglideJS>
</svelte:component>
