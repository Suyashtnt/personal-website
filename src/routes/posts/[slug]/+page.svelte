<script generics="C extends typeof SvelteComponent" lang="ts">
    import { setupViewTransition } from 'sveltekit-view-transition';

    // Generics bork
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    import type {SvelteComponent} from 'svelte';

    import PageHead from '$lib/components/page-head.svelte'; import { createTableOfContents } from '@melt-ui/svelte';

    import type {PageData} from './$types';

    import ToC from './table-of-contents.svelte';

    export let data: PageData;

    // Generics bork
    // eslint-disable-next-line no-undef
    $: component = data.component as unknown as C;

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
        states: { activeHeadingIdxs, headingsTree },
    } = createTableOfContents({
        activeType: 'highest-parents',
        selector: '#article',
    });
</script>

<PageHead {description} title={data.frontmatter.title} />

<svelte:head>
    <meta content="article" property="og:type" />
    <meta
        content={datePublished.toISOString()}
        property="og:article:published_time"
    />
    <meta
        content={dateModified.toISOString()}
        property="og:article:modified_time"
    />
</svelte:head>

<div class="grid-layout-article grid justify-center">
    <aside
        class="top-0 grid-area-[sidebar] ml-4 self-start lg:sticky"
    >
        <p class="line-clamp-2 mt-4 text-2xl">
            {data.frontmatter.title}
        </p>
        {#key $headingsTree}
            <ToC
                activeHeadingIdxs={$activeHeadingIdxs}
                {item}
                tree={$headingsTree}
            />
        {/key}
    </aside>

    <article
        class="grid-area-[content] mb-6 justify-self-center rounded-3xl bg-light-mantle px-4 text-xl prose md:mx-0 dark:bg-dark-mantle"
        id="article"
        use:transition={`post-${data.slug}`}
    >
        <header
            class="mb-8 py-4"
        >
            <hr
                class="-0 h-0.5 from-light-blue to-light-sapphire bg-gradient-to-r dark:from-dark-blue dark:to-dark-blue"
            />

            <h1
                class="my-0 from-light-lavender to-light-mauve bg-gradient-to-br bg-clip-text text-center text-4xl font-light text-transparent transition-all dark:from-dark-lavender dark:to-dark-mauve xl:text-5xl"
                use:transition={`post-title-${data.slug}`}
            >
                {data.frontmatter.title}
            </h1>

            <hr
                class="mb-2 h-0.5 from-light-blue to-light-sapphire bg-gradient-to-r dark:from-dark-blue dark:to-dark-blue"
            />

            <p
                class="my-0 text-light-subtext-0 dark:text-dark-subtext-0"
                use:transition={`post-dates-${data.slug}`}
            >
                By {data.frontmatter.author} | Published {dateFormatter.format(
                    datePublished
                )} | Last updated {dateFormatter.format(dateModified)}
                {#if draft}
                    | <span class="text-light-red dark:text-dark-red"
                        >DRAFT</span
                    >
                {/if}
            </p>
        </header>

        <p
            class="article-content text-justify"
        >
            <svelte:component this={component} />
        </p>
    </article>

    <aside class="grid-area-[notes] mr-4 hidden md:block" />
</div>

<style>
    .grid-layout-article {
        grid-template-areas:
            'sidebar'
            'content';

        @media (min-width: 1024px) {
            grid-template-areas:
                'sidebar content'
                'sidebar notes';

            grid-template-columns: 1fr 3fr;
        }

        @media (min-width: 1536px) {
            grid-template-areas: 'sidebar content notes';

            grid-template-columns: 1fr 3fr 1fr;
        }
    }

    .article-content {
        & h1,
        & h2,
        & h3,
        & h4,
        & h5,
        & h6 {
            --at-apply: 'scroll-mt-8';
            --at-apply: 'text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text';

            & > a {
                --at-apply: 'text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text inline-block relative decoration-none transition-all';

                & :after {
                    --at-apply: 'bg-none bg-repeat bg-scroll bg-light-blue dark:bg-dark-blue bottom-0 content-empty block h-0.5 absolute transition-all w-0';
                }

                & :hover {
                    --at-apply: 'text-light-blue dark:text-dark-blue visited:text-light-blue dark:visited:text-dark-blue';

                    & :after {
                        --at-apply: 'w-full';
                    }
                }
            }
        }

        & h2 > a {
            --at-apply: '!text-light-red !dark:text-dark-red';
        }

        & h3 > a {
            --at-apply: '!text-light-peach !dark:text-dark-peach';
        }

        & h4 > a {
            --at-apply: '!text-light-yellow !dark:text-dark-yellow';
        }

        & h5 > a {
            --at-apply: '!text-light-green !dark:text-dark-green text-xl';
        }

        & h6 > a {
            --at-apply: '!text-light-sapphire !dark:text-dark-sapphire text-xl';
        }

        & pre {
            --at-apply: 'rounded-xl pa-2 overflow-x-auto';
        }
        & code {
            --at-apply: 'rounded-xl';
        }
    }

    @media (prefers-color-scheme: dark) {
        :global(.shiki),
        :global(.shiki span) {
            color: var(--shiki-dark) !important;
            background-color: var(--shiki-dark-bg) !important;
            /* Optional, if you also want font styles */
            font-style: var(--shiki-dark-font-style) !important;
            font-weight: var(--shiki-dark-font-weight) !important;
            text-decoration: var(--shiki-dark-text-decoration) !important;
        }
    }
</style>
