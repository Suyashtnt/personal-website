import type {PageServerLoad} from './$types';
import {slugFromPath} from '$lib/helpers/slug-from-path';

export const prerender = true;

export const load: PageServerLoad = async () => {
    const modules = import.meta.glob(
        '/src/lib/posts/*.{md,svx,svelte.md}'
    );

    const postPromises = Object.entries(modules).map(
        async ([path, resolver]) =>
            resolver().then(
                (post): App.BlogPost => ({
                    ...(post as App.MdsvexFile).metadata,
                    slug: slugFromPath(path)
                })
            )
    );

    const posts = await Promise.all(postPromises);
    const publishedPosts = posts.filter((post) => post.published);

    publishedPosts.sort((a, b) =>
        new Date(a.date) > new Date(b.date) ? -1 : 1
    );

    return {posts: publishedPosts};
};
