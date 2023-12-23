<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onSetLanguageTag, setLanguageTag } from '$i18n/runtime';

    const { children } = $props();

	// from root layout. The page will ALWAYS have this.
	let language = $derived($page.data.language as string);
	setLanguageTag(() => language);

	if (browser) {
		onSetLanguageTag((newLanguageTag) => {
			$page.data.language = newLanguageTag;
		});
	}
</script>

{#key language}
    {@render children()}
{/key}
