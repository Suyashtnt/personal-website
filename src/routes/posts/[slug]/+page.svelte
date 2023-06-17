<script lang="ts">
	import type { PageData } from './$types';
	import type { SvelteComponentDev } from 'svelte/internal';
	import PageHead from '$lib/components/PageHead.svelte';

	export let data: PageData;
	import ToC from './ToC.svelte';

	type C = $$Generic<typeof SvelteComponentDev>;
	$: component = data.component as unknown as C;

	if(!data.frontmatter.date || !data.frontmatter.updated || !data.frontmatter.description) {
		throw new Error('Missing date or updated in frontmatter');
	}

	// Svelte's template doesn't recognize the type narrowing done above
	const description = data.frontmatter.description;

	const datePublished = new Date(data.frontmatter.date);
	const dateModified = new Date(data.frontmatter.updated);

	const dateFormatter = new Intl.DateTimeFormat('en-uk', {
		year: 'numeric',
		month: 'short',
		day: '2-digit'
	});

    const titleId = data.frontmatter.title?.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-')

	import lightSyntax from './syntax.light.css?url'
	import darkSyntax from './syntax.dark.css?url'
</script>

<PageHead title={data.frontmatter.title} description={description} />

<svelte:head>
	<meta property="og:type" content="article" />
	<meta property="og:article:published_time" content={datePublished.toISOString()} />
	<meta property="og:article:modified_time" content={dateModified.toISOString()} />

	<link rel="stylesheet" href={lightSyntax} />
	<link rel="stylesheet" media="(prefers-color-scheme: dark)" href={darkSyntax} />
</svelte:head>

<div class="grid gap-8 grid-layout-article">
	<aside class="ml-4 grid-area-[sidebar] self-start md:sticky top-0">
		<p class="text-2xl line-clamp-2 mt-4">
			{data.frontmatter.title}
		</p>
		<ol class="pl-4 text-lg list-position">
			<ToC {...data.headings} />
		</ol>
	</aside>
	<article class="text-lg xl:text-xl prose prose-light-text dark:prose-dark-text grid-area-[content] justify-self-center">
		<header class="mb-8 py-4">
			<hr class="h-0.5 -0 bg-gradient-to-r from-light-blue to-light-sapphire dark:from-dark-blue dark:to-dark-blue" />

			<h1
			class="
				text-4xl xl:text-5xl transition-all
				my-0 text-center font-light
				text-transparent
				bg-gradient-to-br bg-clip-text
				from-light-lavender to-light-mauve dark:from-dark-lavender dark:to-dark-mauve
				"
			id={titleId}
			>
				{data.frontmatter.title}
			</h1>

			<hr class="h-0.5 mb-2 bg-gradient-to-r from-light-blue to-light-sapphire dark:from-dark-blue dark:to-dark-blue" />

			<p class="my-0 text-light-subtext-0 dark:text-dark-subtext-0">
				By {data.frontmatter.author} |
				Published {dateFormatter.format(datePublished)} | Last updated {dateFormatter.format(
					dateModified
				)}
			</p>
		</header>
		<p class="text-justify article-content">
			<svelte:component this={component} />
		</p>
	</article>

	<aside class="mr-4 grid-area-[notes]">This is where I would put my notes... IF I HAD ANY</aside>
</div>

<style lang="scss" global>
	.grid-layout-article {
		grid-template-areas:
			"sidebar"
			"content"
			"notes";

		grid-template-columns: 1fr;

		@media (min-width: 768px) {
			grid-template-areas:
				"sidebar content"
				"notes notes";

			grid-template-columns: auto 1fr;
		}

		@media (min-width: 1024px) {
			grid-template-areas:
				"sidebar content notes";

			grid-template-columns: 1fr 2fr 1fr;
		}
	}

	.article-content {
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			--at-apply: 'scroll-mt-8'
			--at-apply: 'text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text';

			> a {
				--at-apply: 'text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text inline-block relative decoration-none transition-all';

				&:after {
					--at-apply: 'bg-none bg-repeat bg-scroll bg-light-blue dark:bg-dark-blue bottom-0 content-empty block h-0.5 absolute transition-all w-0'
				}

				&:hover {
					--at-apply: 'text-light-blue dark:text-dark-blue visited:text-light-blue dark:visited:text-dark-blue';

					&:after {
						--at-apply: 'w-full'
					}
				}
			}
		}
	}
</style>
