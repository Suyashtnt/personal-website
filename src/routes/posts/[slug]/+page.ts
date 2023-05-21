import type { PageLoad, EntryGenerator } from './$types';
import { slugFromPath } from '$lib/helpers/slugFromPath';
import { error } from '@sveltejs/kit';
export const prerender = true;

export const load: PageLoad = async ({ params }) => {
    const modules = import.meta.glob(`/src/lib/posts/*.{md,svx,svelte.md}`);

    let match: { path?: string; resolver?: App.MdsvexResolver } = {};

    for (const [path, resolver] of Object.entries(modules)) {
        if (slugFromPath(path) === params.slug) {
            match = { path, resolver: resolver as unknown as App.MdsvexResolver };
            break;
        }
    }

    const post = await match?.resolver?.();

    if (!post || !post.metadata.published) {
        throw error(404); // Couldn't resolve the post
    }

    return {
        component: post.default,
        frontmatter: post.metadata
    };
};

export const entries = (async () => {
    const modules = import.meta.glob(`/src/lib/posts/*.{md,svx,svelte.md}`);

    const postPromises = Object.entries(modules).map(([path, resolver]) =>
        resolver().then(
            (post) =>
            ({
                slug: slugFromPath(path),
                ...(post as unknown as App.MdsvexFile).metadata
            } as App.BlogPost)
        )
    );

    const posts = await Promise.all(postPromises);
    return posts.filter((post) => post.published);
}) satisfies EntryGenerator;
