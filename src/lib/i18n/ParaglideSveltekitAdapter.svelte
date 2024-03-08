<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onSetLanguageTag, setLanguageTag, type AvailableLanguageTag } from '$i18n/runtime';
	import type { Snippet } from 'svelte';

  const { children } = $props<{children: Snippet}>();

	// from root layout. The page will ALWAYS have this.
	let language = $derived($page.data.language as AvailableLanguageTag);
	setLanguageTag(() => language);

	if (browser) {
		onSetLanguageTag((newLanguageTag) => {
			// $page.data.language = newLanguageTag;
		});
	}
</script>

{#key language}
    {@render children()}
{/key}
