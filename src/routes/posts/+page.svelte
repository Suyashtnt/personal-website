<script lang="ts">
    import PageHead from '$lib/components/page-head.svelte';

    import type {PageData} from './$types';

    export let data: PageData;

    const dateFormatter = new Intl.DateTimeFormat('en-uk', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
</script>

<PageHead description="My blog posts" title="Posts" />

<h1 class="ml-4 text-5xl">Posts</h1>

<ul class="post-grid mx-2 list-none pa-0">
    {#each data.posts as post (post.slug)}
        <li>
            <a
                class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                href="/posts/{post.slug}"
            >
                <article
                    class="h-full flex flex-col justify-between rounded-2xl bg-light-mantle px-6 py-2 dark:bg-dark-mantle"
                    data-flip-id="{post.slug}"
                    id="card"
                >
                    <header
                    data-flip-id="title-{post.slug}"
                    id="title-card"
                    >
                        <h1 class="mb-2 hover:decoration-underline">
                            {post.title}
                        </h1>
                        <div
                            class="text-light-text/80 dark:text-dark-text/80"
                            role="doc-subtitle"
                        >
                            Published {dateFormatter.format(
                                new Date(post.date)
                            )} | Updated
                            {dateFormatter.format(
                                new Date(post.updated)
                            )}
                        </div>
                    </header>

                    <footer
                        data-flip-id="text-{post.slug}"
                        id="text"
                    >
                        <p>{post.description}</p>
                    </footer>
                </article>
            </a>
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
        --total-gap-width: calc(
            var(--gap-count) * var(--grid-layout-gap)
        );
        --grid-item--max-width: calc(
            (100% - var(--total-gap-width)) / var(--grid-column-count)
        );

        display: grid;
        grid-template-columns: repeat(
            auto-fill,
            minmax(
                max(
                    var(--grid-item--min-width),
                    var(--grid-item--max-width)
                ),
                1fr
            )
        );
        grid-gap: var(--grid-layout-gap);
    }
</style>
