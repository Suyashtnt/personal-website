<script lang="ts">
	import * as m from '$i18n/messages';
	import Giscus from '@giscus/svelte';
	import { setupViewTransition } from 'sveltekit-view-transition';

	import giscusTheme from './giscus.css?url';
	import "@portaljs/remark-callouts/styles.css";
	const giscusThemeFullUrl = $derived(new URL(giscusTheme, import.meta.url).href);

	import PageHead from '$lib/components/page-head.svelte';
	import { createTableOfContents } from '@melt-ui/svelte';

	import type { PageData } from './$types';

	import ToC from './table-of-contents.svelte';

  interface Props {
      data: PageData
  }
  const { data } = $props<Props>();

	if (
		!data.frontmatter.date ||
		!data.frontmatter.updated ||
		!data.frontmatter.description ||
		data.frontmatter.published === undefined
	) {
		throw new Error('Missing date or updated in frontmatter');
	}

	// Svelte's template doesn't recognize the type narrowing done above
	const description = data.frontmatter.description;
	const draft = !data.frontmatter.published;

	const datePublished = new Date(data.frontmatter.date);
	const dateModified = new Date(data.frontmatter.updated);

	const dateFormatter = new Intl.DateTimeFormat('en-uk', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	});

	const { transition } = setupViewTransition();

	const {
		elements: { item },
		states: { activeHeadingIdxs, headingsTree }
	} = createTableOfContents({
		activeType: 'highest-parents',
		selector: '#article'
	});
</script>

<PageHead {description} title={data.frontmatter.title} />

<svelte:head>
	<meta content="article" property="og:type" />
	<meta content={datePublished.toISOString()} property="og:article:published_time" />
	<meta content={dateModified.toISOString()} property="og:article:modified_time" />
</svelte:head>

<div class="grid-layout-article grid justify-center">
	<aside class="top-0 grid-area-[sidebar] ml-4 self-start lg:sticky">
		<p class="line-clamp-2 mt-4 text-2xl">
			{data.frontmatter.title}
		</p>
		{#key $headingsTree}
			<ToC activeHeadingIdxs={$activeHeadingIdxs} {item} tree={$headingsTree} />
		{/key}
	</aside>

	<article
		class="grid-area-[content] mb-6 justify-self-center rounded-3xl bg-light-mantle px-4 text-xl prose md:mx-0 dark:bg-dark-surface_background"
		id="article"
		use:transition={`post-${data.slug}`}
	>
		<header class="mb-8 py-4">
			<hr
				class="-0 h-0.5 from-light-blue to-light-sapphire bg-gradient-to-r dark:from-dark-primary_foreground dark:to-dark-secondary_foreground"
			/>

			<h1
				class="my-0 from-light-lavender to-light-mauve bg-gradient-to-br bg-clip-text text-center text-4xl text-transparent font-light dark:from-dark-primary_foreground dark:via-dark-primary_foreground dark:to-dark-secondary_foreground xl:text-5xl"
				use:transition={`post-title-${data.slug}`}
			>
				{data.frontmatter.title}
			</h1>

			<hr
				class="mb-2 h-0.5 from-light-blue to-light-sapphire bg-gradient-to-r dark:from-dark-secondary_foreground dark:to-dark-primary_foreground"
			/>

			<p
				class="my-0 text-light-subtext-0 dark:text-dark-subtle/90"
				use:transition={`post-dates-${data.slug}`}
			>
				{m.post_card_by({ author: data.frontmatter.author })} | {m.post_card_published({
					published: dateFormatter.format(datePublished),
					updated: dateFormatter.format(dateModified)
				})}
				{#if draft}
					| <span class="text-light-red dark:text-dark-red">{m.post_card_draft()}</span>
				{/if}
			</p>
		</header>

		<p class="article-content text-justify hyphens-auto prose">
			{@html data.postHtml}
		</p>

		<Giscus
			category="Announcements"
			categoryId="DIC_kwDOI0N8xs4Caho4"
			emitMetadata="1"
			inputPosition="top"
			lang={data.language}
			loading="lazy"
			mapping="og:title"
			reactionsEnabled="1"
			repo="Suyashtnt/personal-website"
			repoId="R_kgDOI0N8xg"
			strict="0"
			theme={giscusThemeFullUrl}
		/>
	</article>

	<aside class="grid-area-[notes] mr-4 hidden md:block" />
</div>

<style>
	.grid-layout-article {
		grid-template-areas:
			'sidebar'
			'content';
	}

	@media (min-width: 1024px) {
   .grid-layout-article {
			grid-template-areas:
				'sidebar content'
				'sidebar notes';

			grid-template-columns: 1fr 3fr;
		}
  }

	@media (min-width: 1536px) {
        .grid-layout-article {
			grid-template-areas: 'sidebar content notes';

			grid-template-columns: 1fr 3fr 1fr;
        }
	}

  #article {
		& h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
      & > a {
        --at-apply: 'inline-block relative decoration-none transition-all';

        &::after {
          --at-apply: 'bg-none bg-repeat bg-scroll bg-light-blue dark:bg-dark-secondary_foreground bottom-0 content-empty block h-0.5 absolute transition-all w-0';
        }

        &:hover {
          --at-apply: 'text-light-blue dark:text-dark-secondary_foreground visited:text-light-blue dark:visited:text-dark-secondary_foreground';

          &::after {
            --at-apply: 'w-full';
          }
        }
      }
		}

		& h2 > a {
			--at-apply: '!text-light-red !dark:text-dark-primary_foreground';
		}

		& h3 > a {
			--at-apply: '!text-light-peach !dark:text-dark-red';
		}

		& h4 > a {
			--at-apply: '!text-light-yellow !dark:text-dark-orange';
		}

		& h5 > a {
			--at-apply: '!text-light-green !dark:text-dark-green text-xl';
		}

		& h6 > a {
			--at-apply: '!text-light-sapphire !dark:text-dark-teal text-xl';
		}

		& a {
			--at-apply: 'text-light-blue dark:text-dark-blue hover:text-light-lavender dark:hover:text-dark-lavender visited:text-light-lavender dark:visited:text-dark-lavender';
		}

		& :global(pre) {
			--at-apply: 'rounded-xl pa-2 max-w-[calc(100vw-4rem)] overflow-x-auto';
		}

		& :global(code) {
			--at-apply: 'rounded-xl overflow-x-auto';
		}

		.callout, .blockquote {
			--at-apply: 'rounded-xl pa-2 mx-2 overflow-x-auto';
		}

    @media (prefers-color-scheme: dark) {
        & .shiki,
        .shiki :global(span) {
            color: var(--shiki-dark) !important;
            background-color: var(--shiki-dark-bg) !important;
            /* Optional, if you also want font styles */
            font-style: var(--shiki-dark-font-style) !important;
            font-weight: var(--shiki-dark-font-weight) !important;
            text-decoration: var(--shiki-dark-text-decoration) !important;
        }

				.callout, .blockquote {
					--callout-bg-color: #060516;
				}
	    }
	}
</style>
