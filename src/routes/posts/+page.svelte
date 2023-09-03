<script lang="ts">
    import type {PageData} from './$types';
    import PageHead from '$lib/components/page-head.svelte';

    export let data: PageData;

    const dateFormatter = new Intl.DateTimeFormat('en-uk', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
</script>

<PageHead title="Posts" description="My blog posts" />

<h1 class="text-5xl ml-4">Posts</h1>

<ul class="post-grid list-none pa-0 mx-2">
    {#each data.posts as post (post.slug)}
        <li>
            <a
                href="/posts/{post.slug}"
                class="text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text decoration-none"
            >
                <article
                    class="bg-light-mantle dark:bg-dark-mantle rounded-2xl px-6 py-2 h-full flex flex-col justify-between"
                    id="card"
                    data-flip-id="{post.slug}"
                >
                    <header
                    id="title-card"
                    data-flip-id="title-{post.slug}"
                    >
                        <h1 class="hover:decoration-underline mb-2">
                            {post.title}
                        </h1>
                        <div
                            role="doc-subtitle"
                            class="text-light-text/80 dark:text-dark-text/80"
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
                        id="text"
                        data-flip-id="text-{post.slug}"
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
