<script lang="ts">
	import type { PageData } from './$types';
	import PageHead from '$lib/components/PageHead.svelte';

	export let data: PageData;
</script>

<PageHead title="Posts" description="My blog posts" />

<h1 class="text-5xl ml-4">Posts</h1>

<ul class="post-grid list-none pa-0 mx-2">
	{#each data.posts as post (post.slug)}
		<li>
			<article class="bg-light-mantle dark:bg-dark-mantle rounded-2xl px-6 py-2">
				<header>
					<h1>
						<a href="/posts/{post.slug}" class="text-light-text dark:text-dark-text">
							{post.title}
						</a>
					</h1>
				</header>
				<p>{post.description}</p>
			</article>
		</li>
	{/each}
</ul>

<style>
	/* stolen from https://css-tricks.com/an-auto-filling-css-grid-with-max-columns/ */
	.post-grid {
		/**
		* User input values.
		*/
		--grid-layout-gap: 1rem;
		--grid-column-count: 6;
		--grid-item--min-width: 400px;

		/**
		* Calculated values.
		*/
		--gap-count: calc(var(--grid-column-count) - 1);
		--total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
		--grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

		display: grid;
		grid-template-columns: repeat(
			auto-fill,
			minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
		);
		grid-gap: var(--grid-layout-gap);
	}
</style>
