<script lang="ts">
	import PageHead from '$lib/components/page-head.svelte';
	import Posts from '$lib/posts/posts.svelte';

    import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageHead description="My blog posts" title="Posts" />

<h1 class="ml-4 text-5xl lg:ml-8">Posts</h1>

<Posts posts={data.posts} />
