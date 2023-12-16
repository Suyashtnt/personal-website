<script lang="ts">
	import type { AvailableLanguageTag } from '$i18n/runtime';

	import * as m from '$i18n/messages';
    import { setupViewTransition } from 'sveltekit-view-transition';

	import type { PageData } from '../../routes/(landing)/$types';

	export let posts: PageData["posts"];
    export let lang: AvailableLanguageTag

    $: locale = getLocaleFromLanguageTag(lang)

    const getLocaleFromLanguageTag = (lang: AvailableLanguageTag) => {
        switch (lang) {
            case 'en':
                return 'en-uk'
            case 'af':
                return 'af-za'
        }
    }

	const dateFormatter = new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	});

	const { transition } = setupViewTransition();
</script>


<ul class="mx-2 flex flex-wrap list-none gap-2 pa-0 lg:mx-8">
	{#each posts as post (post.slug)}
		<li class="flex-[1_1_280px]">
			<a
				class="text-light-text decoration-none dark:text-dark-surface_foreground visited:text-light-text dark:visited:text-dark-surface_foreground"
				href="/posts/{post.slug}"
			>
				<article
					class="h-full flex flex-col justify-between rounded-2xl bg-light-mantle px-6 dark:bg-dark-overlay_background"
					use:transition={`post-${post.slug}`}
				>
					<header>
						<h1
							class="mb-2 text-light-lavender dark:text-dark-primary_foreground hover:decoration-underline"
							use:transition={`post-title-${post.slug}`}
						>
							{post.title}
						</h1>
						<div
							class="text-light-text/80 dark:text-dark-subtle/90"
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
