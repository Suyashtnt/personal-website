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

<ul class="mx-2 flex flex-wrap list-none gap-2 pa-0">
    {#each data.posts as post (post.slug)}
        <li class="flex-[1_1_280px]">
            <a
                class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                href="/posts/{post.slug}"
            >
                <article
                    class="h-full flex flex-col justify-between rounded-2xl bg-light-mantle px-6 dark:bg-dark-mantle"
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
    .instances {
        padding: 0 1rem;

        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .instances :global(article) {
        flex: 1 1 280px;
    }

    .instances :global(article.collapsed) {
        flex: 0 0 64px;
    }
</style>
