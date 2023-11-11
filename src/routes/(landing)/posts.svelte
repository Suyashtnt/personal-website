<script lang="ts">
    import * as m from "$i18n/messages"
	import { setupViewTransition } from 'sveltekit-view-transition';

    import type { PageData } from './$types';

    export let data: PageData

    const dateFormatter = new Intl.DateTimeFormat('en-uk', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

	const { transition } = setupViewTransition();
</script>

<h1 class="ml-4 text-5xl lg:ml-8">
    Posts
</h1>

<ul class="mx-2 flex flex-wrap list-none gap-2 pa-0 lg:mx-8">
    {#each data.posts as post (post.slug)}
        <li class="flex-[1_1_280px]">
            <a
                class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                href="/posts/{post.slug}"
            >
                <article
                    class="h-full flex flex-col justify-between rounded-2xl bg-light-mantle px-6 dark:bg-dark-mantle"
                    use:transition={`post-${post.slug}`}
                >
                    <header>
                        <h1 class="mb-2 text-light-lavender dark:text-dark-lavender hover:decoration-underline" use:transition={`post-title-${post.slug}`}>
                            {post.title}
                        </h1>
                        <div
                            class="text-light-text/80 dark:text-dark-text/80"
                            role="doc-subtitle"
                            use:transition={`post-dates-${post.slug}`}
                        >
                            {m.post_card_published({
                                published: dateFormatter.format(new Date(post.date)),
                                updated: dateFormatter.format(new Date(post.updated))
                            })}
                        </div>
                    </header>

                    <footer>
                        <p>{post.description}</p>
                    </footer>
                </article>
            </a>
        </li>
    {/each}
</ul>
