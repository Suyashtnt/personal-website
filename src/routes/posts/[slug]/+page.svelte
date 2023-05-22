<script lang="ts">
	import type { PageData } from './$types';
	import type { SvelteComponentTyped } from 'svelte/internal';
	import PageHead from '$lib/components/PageHead.svelte';

	export let data: PageData;
	import './syntax.css';
	import './post.scss';

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

<div class="flex items-center justify-center mx-2 md:mx-0">
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
