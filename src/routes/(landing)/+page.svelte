<script lang="ts">
	import * as m from '$i18n/messages';
	import PageHead from '$lib/components/page-head.svelte';

	import AboutToBlog from './about-to-blog.svelte';
	import Hero from './hero.svelte';
	import Posts from './posts.svelte';
	import Skills from './skills.svelte';

	export let data;
</script>

<PageHead description={m.landingpagedesc()} title={undefined} />

<Hero />

<Skills {data} />

<AboutToBlog />

<Posts {data} />
