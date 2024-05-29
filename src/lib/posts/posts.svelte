<script lang="ts">
    import type { AvailableLanguageTag } from '$i18n/runtime';

    import * as m from '$i18n/messages';
    import { setupViewTransition } from 'sveltekit-view-transition';

    import type { PageData } from '../../routes/(landing)/$types';

    interface Props {
        lang: AvailableLanguageTag;
        posts: PageData['posts'];
    }
    const { lang, posts }: Props = $props();

    const getLocaleFromLanguageTag = () => {
        switch (lang) {
            case 'en':
                return 'en-uk';
            case 'af':
                return 'af-za';
            default:
                throw new Error(`Unknown language tag: ${lang}`);
        }
    };

    const locale = $derived(getLocaleFromLanguageTag());
    const dateFormatter = $derived(
        new Intl.DateTimeFormat(locale, {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    );

    const { transition } = setupViewTransition();
</script>

<ul class="flex flex:wrap gap:4x list-style:none mx:4x mx:8x@md p:0">
    {#each posts as post (post.slug)}
        <li class={'flex:grow flex:shrink flex:280px'}>
            <a
                class="bg:surface fg:surface fg:surface:visited text-decoration:none"
                href="/posts/{post.slug}"
            >
                <article
                    class="flex bg:overlay flex:col h:full px:6x r:4x"
                    use:transition={`post-${post.slug}`}
                >
                    <header>
                        <h1
                            class="fg:primary mb:2 text:underline:hover"
                            use:transition={`post-title-${post.slug}`}
                        >
                            {post.title}
                        </h1>
                        <div
                            class="fg:subtle/.80"
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
