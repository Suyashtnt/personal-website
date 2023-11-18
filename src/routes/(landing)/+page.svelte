<script lang="ts">
	import * as m from '$i18n/messages';
	import PageHead from '$lib/components/page-head.svelte';
    import Posts from '$lib/posts/posts.svelte';

	import AboutToBlog from './about-to-blog.svelte';
	import Hero from './hero.svelte';
	import Skills from './skills.svelte';

	export let data;
</script>

<PageHead description={m.landingpagedesc()} title={undefined} />

<Hero />

<Skills {data} />

<AboutToBlog />

<h2 class="ml-4 w-min text-5xl text-5xl text-light-lavender lg:ml-8 dark:text-dark-primary_foreground">Posts</h2>

<Posts posts={data.posts} />
