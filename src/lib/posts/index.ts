import type { AvailableLanguageTag } from '$i18n/runtime';

import { slugFromPath } from '$lib/helpers/slug-from-path';

const englishModules = import.meta.glob<false, '', App.MdsvexFile>(
    `/src/lib/posts/en/*.{md,svx,svelte.md}`
);
const afrikaansModules = import.meta.glob<false, '', App.MdsvexFile>(
    `/src/lib/posts/af/*.{md,svx,svelte.md}`
);

const moduleToPost = (path: string, resolver: App.MdsvexResolver) =>
    resolver().then(
        (post): App.BlogPost => ({
            ...post.metadata,
            component: post.default,
            slug: slugFromPath(path)
        })
    );

const englishPosts = Promise.all(
    Object.entries(englishModules).map(([path, resolver]) => moduleToPost(path, resolver))
);

const afrikaansPosts = Promise.all(
    Object.entries(afrikaansModules).map(([path, resolver]) => moduleToPost(path, resolver))
);

export const allPosts: Record<AvailableLanguageTag, Promise<App.BlogPost[]>> = {
    af: afrikaansPosts,
    en: englishPosts
};
