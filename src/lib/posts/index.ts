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
        (post): App.BlogPost & { path: string } => ({
            ...post.metadata,
            component: post.default,
            path,
            slug: slugFromPath(path)
        })
    );

const englishPosts = 
Object.fromEntries(Object.entries(englishModules).map(([path, resolver]) => [slugFromPath(path), moduleToPost(path, resolver)] as const))

const afrikaansPosts = 
Object.fromEntries(Object.entries(afrikaansModules).map(([path, resolver]) => [slugFromPath(path), moduleToPost(path, resolver)] as const))

export const allPosts: Record<AvailableLanguageTag, Record<string, Promise<App.BlogPost & {path: string}>>> = {
    af: afrikaansPosts,
    en: englishPosts
};
