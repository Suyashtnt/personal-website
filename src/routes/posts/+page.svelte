<script lang="ts">
	import PageHead from '$lib/components/page-head.svelte';
	import Posts from '$lib/posts/posts.svelte';

	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	const { data }: Props = $props();
</script>

<PageHead description="My blog posts" title="Posts" />

<h1 class="ml:4x ml:8x@md text:10x">Posts</h1>
<Posts lang={data.language} posts={data.posts} />
