import type { PageLoad, EntryGenerator } from './$types';
import { slugFromPath } from '$lib/helpers/slugFromPath';
import { error } from '@sveltejs/kit';
export const prerender = true;

import { A, G, O, pipe } from '@mobily/ts-belt'

export interface DataItem {
    depth: 1 | 2 | 3 | 4 | 5 | 6;
    value: string | null;
}

export interface DataItemWithChildren extends DataItem {
    children: readonly DataItemWithChildren[];
}

function convertToNestedObject(headings: readonly DataItemWithChildren[]): DataItemWithChildren {
    const [potentialRoots, rest] = A.partition(headings, val => val.depth === 1)
    const root = potentialRoots[0]
    if (potentialRoots.length !== 1 || !root) throw new Error('There should only be one root')

    return {
        ...root,
        children: recurseDepth(rest, 2)
    }
}

function recurseDepth(headingsToRecurse: readonly DataItemWithChildren[], level: DataItemWithChildren['depth']): readonly DataItemWithChildren[] {
    const firstAtLevelIndex = headingsToRecurse.findIndex(val => val.depth === level)

    const [firstAtLevel, rest] = pipe(
        headingsToRecurse,
        A.splitAt(firstAtLevelIndex + 1),
        O.getExn,
        ([[firstAtLevel], rest]) => [firstAtLevel, rest],
    )

    // if there is no firstAtLevel, then there is no rest, which means we are done with this level
    if (!G.isObject(firstAtLevel) || !G.isArray(rest)) return []

    const secondAtLevelIndex = rest.findIndex(val => val.depth === level)
    const [restUntilNextSibling, restAfterNextSibling] = pipe(
        rest,
        A.splitAt(secondAtLevelIndex === -1 ? rest.length : secondAtLevelIndex),
        O.getExn
    )

    const nextLevel = level + 1 as DataItemWithChildren['depth']
    return [
        {
            ...firstAtLevel,
            children: recurseDepth(restUntilNextSibling, nextLevel)
        },
        ...recurseDepth(restAfterNextSibling, level)
    ]
}


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

    if (!post || !post.metadata.published || !post.metadata.title) {
        throw error(404); // Couldn't resolve the post
    }

    const typedHeadings = post.metadata.headings as unknown as DataItem[];
    const headingsWithChildren = typedHeadings.map(val => ({
        ...val,
        children: []
    }))
    const headings = convertToNestedObject([
        {
            depth: 1,
            value: post.metadata.title,
            children: []
        },
        ...headingsWithChildren
    ])

    return {
        component: post.default,
        slug: params.slug,
        headings,
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
