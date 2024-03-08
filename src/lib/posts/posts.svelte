<script lang="ts">
	import type { AvailableLanguageTag } from '$i18n/runtime';

	import * as m from '$i18n/messages';
  import { setupViewTransition } from 'sveltekit-view-transition';
	import type { PageData } from '../../routes/(landing)/$types';

    interface Props {
        lang: AvailableLanguageTag
        posts: PageData["posts"];
    }
    const { lang, posts } = $props<Props>();

    const getLocaleFromLanguageTag = () => {
        switch (lang) {
            case 'en':
                return 'en-uk'
            case 'af':
                return 'af-za'
            default:
                throw new Error(`Unknown language tag: ${lang}`)
        }
    }


  const locale = $derived(getLocaleFromLanguageTag())
	const dateFormatter = $derived(new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	}));

	const { transition } = setupViewTransition();
</script>


<ul class="mx:2x flex flex:wrap list-style:none gap:2x p:0 mx:8x@md">
	{#each posts as post (post.slug)}
		<li class={"flex:grow flex:shrink flex:280px"}>
			<a
				class="text:none bg:surface text:surface text:surface@visited"
				href="/posts/{post.slug}"
			>
				<article
					class="h:full flex flex:col justify-items:space-between r:4x bg:overlay px:6x"
					use:transition={`post-${post.slug}`}
				>
					<header>
						<h1
							class="mb:2 text:primary text:underline:hover"
							use:transition={`post-title-${post.slug}`}
						>
							{post.title}
						</h1>
						<div
							class="text:subtle/.80"
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
