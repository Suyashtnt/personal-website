<script lang="ts">
	import * as m from '$i18n/messages';
	import PageHead from '$lib/components/page-head.svelte';
	import Posts from '$lib/posts/posts.svelte';

	import type { PageData } from './$types';

	import Hero from './hero.svelte';
	import Skills from './skills.svelte';

	interface Props {
		data: PageData;
	}
	const { data }: Props = $props();
</script>

<PageHead description={m.landingpagedesc()} title={undefined} />

<Hero />

<Skills {data} />

<h2 class="fg:primary ml:4x ml:8x@md text:8x w:min">Posts</h2>

<Posts lang={data.language} posts={data.posts} />
