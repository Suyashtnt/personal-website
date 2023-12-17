<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onSetLanguageTag, setLanguageTag } from '$i18n/runtime';
	import { getContext, setContext } from 'svelte';

	// from root layout. The page will ALWAYS have this.
	let language = $state($page.data.language as string);
	$effect(() => {
		language = $page.data.language
	    setContext('languageTag', language)
    });

	setLanguageTag(() => getContext('languageTag') ?? language);

	if (browser) {
		onSetLanguageTag((newLanguageTag) => {
			language = newLanguageTag;
		});
	}
</script>

{#key language}
	<slot />
{/key}
