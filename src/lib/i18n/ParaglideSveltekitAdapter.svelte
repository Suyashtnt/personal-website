<script lang="ts">
	import { page } from '$app/stores';
	import { setLanguageTag, type AvailableLanguageTag } from '$i18n/runtime';
	import type { Snippet } from 'svelte';

  const { children }: {children: Snippet} = $props();

	// from root layout. The page will ALWAYS have this.
	let language = $derived($page.data.language as AvailableLanguageTag);
	setLanguageTag(() => language);
</script>

{#key language}
    {@render children()}
{/key}
