<script lang="ts">
	import '$lib/fonts/Recursive/recursive.css';
  import ParaglideSveltekitAdapter from '$lib/i18n/ParaglideSveltekitAdapter.svelte';
  import { setupViewTransition } from 'sveltekit-view-transition';
  import { Fragment, type CSSRuntimeProvider as CSSProviderType } from "@master/css.svelte";
	import type { LayoutData } from './$types';

	import '../app.css';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import { onMount } from 'svelte';

	setupViewTransition();

  interface Props {
      children: any
      data: LayoutData
  }
  const { children, data }: Props = $props();

  let CSSRuntimeProvider: CSSProviderType = $state<any>(Fragment);
	$effect(() => {
	    // Keep the <html> lang attribute in sync with the current language
      document.documentElement.lang = data.language
  })

  onMount(async () => {
      const { CSSRuntimeProvider: runtime } = await import("@master/css.svelte")
      CSSRuntimeProvider = runtime
  })
</script>

<svelte:component this={CSSRuntimeProvider} config={import('../../master.css')}>
    <ParaglideSveltekitAdapter>
        <Header />
        <main
            class="bg:base fg:base pt:4x"
        >
            {@render children()}
        </main>
        <Footer footerText={data.footerText} />
    </ParaglideSveltekitAdapter>
</svelte:component>
