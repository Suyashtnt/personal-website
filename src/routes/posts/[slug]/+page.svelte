<script lang="ts" generics="C extends typeof SvelteComponent">
  // Generics bork
  // eslint-disable-next-line no-unused-vars
  import type { SvelteComponent } from 'svelte';
  import ToC from './table-of-contents.svelte';
  import type { PageData } from './$types';
  import lightSyntax from './syntax.light.css?url';
  import darkSyntax from './syntax.dark.css?url';
  import PageHead from '$lib/components/page-head.svelte';

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

  const titleId = data.frontmatter.title
    ?.toLowerCase()
    .replace(/[^a-z\d ]/g, '')
    .replace(/ /g, '-');
</script>

<PageHead title={data.frontmatter.title} {description} />

<svelte:head>
  <meta property="og:type" content="article" />
  <meta
    property="og:article:published_time"
    content={datePublished.toISOString()}
  />
  <meta
    property="og:article:modified_time"
    content={dateModified.toISOString()}
  />

  <link rel="stylesheet" href={lightSyntax} />
  <link
    rel="stylesheet"
    media="(prefers-color-scheme: dark)"
    href={darkSyntax}
  />
</svelte:head>

<div class="grid gap-8 grid-layout-article">
  <aside class="ml-4 grid-area-[sidebar] self-start lg:sticky top-0">
    <p class="text-2xl line-clamp-2 mt-4">
      {data.frontmatter.title}
    </p>
    <ol class="pl-0 text-lg counter-reset-item list-none">
      <ToC {...data.headings} value={data.headings.value ?? ''} />
    </ol>
  </aside>

  <article
    class="text-xl mx-6 md:mx-0 prose prose-light-text dark:prose-dark-text grid-area-[content] justify-self-center"
  >
    <header class="mb-8 py-4">
      <hr
        class="h-0.5 -0 bg-gradient-to-r from-light-blue to-light-sapphire dark:from-dark-blue dark:to-dark-blue"
      />

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

      <hr
        class="h-0.5 mb-2 bg-gradient-to-r from-light-blue to-light-sapphire dark:from-dark-blue dark:to-dark-blue"
      />

      <p class="my-0 text-light-subtext-0 dark:text-dark-subtext-0">
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

    <p class="text-justify article-content">
      <svelte:component this={component} />
    </p>
  </article>

  <aside class="mr-4 grid-area-[notes]" />
</div>

<style lang="scss" global>
  .grid-layout-article {
    grid-template-areas:
      'sidebar'
      'content';

    grid-template-columns: 1fr;

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
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      --at-apply: 'scroll-mt-8';
      --at-apply: 'text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text';

      > a {
        --at-apply: 'text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text inline-block relative decoration-none transition-all';

        &:after {
          --at-apply: 'bg-none bg-repeat bg-scroll bg-light-blue dark:bg-dark-blue bottom-0 content-empty block h-0.5 absolute transition-all w-0';
        }

        &:hover {
          --at-apply: 'text-light-blue dark:text-dark-blue visited:text-light-blue dark:visited:text-dark-blue';

          &:after {
            --at-apply: 'w-full';
          }
        }
      }
    }
  }

  .counter-reset-item {
    counter-reset: item;
  }
</style>
