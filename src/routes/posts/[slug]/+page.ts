import {error} from '@sveltejs/kit';
import {A, D, G, O, pipe} from '@mobily/ts-belt';
import type {EntryGenerator, PageLoad} from './$types';
import {slugFromPath} from '$lib/helpers/slug-from-path';

export const prerender = true;

export type DataItem = {
    depth: 1 | 2 | 3 | 4 | 5 | 6;
    value: string | undefined;
};

export type DataItemWithChildren = {
    children: readonly DataItemWithChildren[];
} & DataItem;

function convertToNestedObject(
    headings: readonly DataItemWithChildren[]
): DataItemWithChildren {
    const [potentialRoots, rest] = A.partition(
        headings,
        (value) => value.depth === 1
    );
    const root = potentialRoots[0];
    if (potentialRoots.length !== 1 || !root)
        throw new Error('There should only be one root');

    return {
        ...root,
        children: recurseDepth(rest, 2)
    };
}

function recurseDepth(
    headingsToRecurse: readonly DataItemWithChildren[],
    level: DataItemWithChildren['depth']
): readonly DataItemWithChildren[] {
    const firstAtLevelIndex = headingsToRecurse.findIndex(
        (value) => value.depth === level
    );

    const [firstAtLevel, rest] = pipe(
        headingsToRecurse,
        A.splitAt(firstAtLevelIndex + 1),
        O.getExn,
        ([[firstAtLevel], rest]) => [firstAtLevel, rest]
    );

    // If there is no firstAtLevel, then there is no rest, which means we are done with this level
    if (!G.isObject(firstAtLevel) || !G.isArray(rest)) return [];

    const secondAtLevelIndex = rest.findIndex(
        (value) => value.depth === level
    );
    const [restUntilNextSibling, restAfterNextSibling] = pipe(
        rest,
        A.splitAt(
            secondAtLevelIndex === -1
                ? rest.length
                : secondAtLevelIndex
        ),
        O.getExn
    );

    const nextLevel = (level + 1) as DataItemWithChildren['depth'];
    return [
        {
            ...firstAtLevel,
            children: recurseDepth(restUntilNextSibling, nextLevel)
        },
        ...recurseDepth(restAfterNextSibling, level)
    ];
}

export const load: PageLoad = async ({params}) => {
    const modules = import.meta.glob(
        `/src/lib/posts/*.{md,svx,svelte.md}`
    );

    let match: {path?: string; resolver?: App.MdsvexResolver} = {};

    for (const [path, resolver] of Object.entries(modules)) {
        if (slugFromPath(path) === params.slug) {
            const typedResolver =
                resolver as unknown as App.MdsvexResolver;

            match = {path, resolver: typedResolver};
            break;
        }
    }

    const post = await match?.resolver?.();

    const cannotFindPost =
        !post?.metadata ||
        !post.metadata.published ||
        !post.metadata.title;
    if (cannotFindPost) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw error(404);
    }

    const typedHeadings = post.metadata
        .headings as unknown as DataItem[];
    const headingsWithChildren = typedHeadings.map((value) => ({
        ...value,
        children: []
    }));
    const headings = convertToNestedObject([
        {
            children: [],
            depth: 1,
            value: post.metadata.title
        },
        ...headingsWithChildren
    ]);

    return {
        component: post.default,
        frontmatter: post.metadata,
        headings,
        slug: params.slug
    };
};

export const entries: EntryGenerator = (async () => {
    const modules = import.meta.glob(
        `/src/lib/posts/*.{md,svx,svelte.md}`
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
    return posts
        .filter((post) => post.published)
        .map(D.selectKeys(['slug']));
}) satisfies EntryGenerator;
