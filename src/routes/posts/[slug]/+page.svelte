<script lang="ts">
	import type { PageData } from './$types';
	import type { SvelteComponentTyped } from 'svelte/internal';
	import PageHead from '$lib/components/PageHead.svelte';

	export let data: PageData;
	import './syntax.css';

	type C = $$Generic<typeof SvelteComponentTyped<unknown, unknown, unknown>>;
	$: component = data.component as unknown as C;

	const datePublished = new Date(data.frontmatter.date);
	const dateModified = new Date(data.frontmatter.updated);

	const dateFormatter = new Intl.DateTimeFormat('en-uk', {
		year: 'numeric',
		month: 'short',
		day: '2-digit'
	});
</script>

<PageHead title={data.frontmatter.title} description={data.frontmatter.description} />

<svelte:head>
	<meta property="og:type" content="article" />
	<meta property="og:article:published_time" content={datePublished.toISOString()} />
	<meta property="og:article:modified_time" content={dateModified.toISOString()} />
</svelte:head>

<div
	class="flex items-center justify-center mx-2 md:mx-0 bg-hero-plus-light-overlay-0 dark:bg-hero-plus-light-overlay-0/10 bg-fixed"
>
	<article class="text-lg prose prose-light-text dark:prose-dark-text xl:text-xl w-full">
		<header class="mb-8 bg-light-mantle dark:bg-dark-mantle rounded-xl pa-4">
			<h1 class="text-4xl xl:text-5xl my-0">{data.frontmatter.title}</h1>
			<h2 class="mb-0">By {data.frontmatter.author}.</h2>
			<p class="mb-0">
				Published {dateFormatter.format(datePublished)} | Last updated {dateFormatter.format(
					dateModified
				)}
			</p>
		</header>
		<p class="text-justify article-content">
			<svelte:component this={component} />
		</p>
	</article>
</div>

<style lang="scss" global>
	.article-content {
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			> a {
				--at-apply: 'text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text';

				&:hover {
					--at-apply: 'text-light-blue dark:text-dark-blue visited:text-light-blue dark:visited:text-dark-blue';
				}
			}
		}
	}
</style>
