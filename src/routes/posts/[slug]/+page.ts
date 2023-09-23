import { slugFromPath } from '$lib/helpers/slug-from-path';
import { D } from '@mobily/ts-belt';
import { error } from '@sveltejs/kit';

import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export type DataItem = {
	depth: 1 | 2 | 3 | 4 | 5 | 6;
	value: string | undefined;
};

export type DataItemWithChildren = {
	children: readonly DataItemWithChildren[];
} & DataItem;

export const load: PageLoad = async ({ params }) => {
	const modules = import.meta.glob(`/src/lib/posts/*.{md,svx,svelte.md}`);

	let match: { path?: string; resolver?: App.MdsvexResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === params.slug) {
			const typedResolver = resolver as unknown as App.MdsvexResolver;

			match = { path, resolver: typedResolver };
			break;
		}
	}

	const post = await match?.resolver?.();

	const cannotFindPost = !post?.metadata || !post.metadata.title;

	if (cannotFindPost) {
		throw error(404);
	}

	return {
		component: post.default,
		frontmatter: post.metadata,
		slug: params.slug
	};
};

export const entries: EntryGenerator = (async () => {
	const modules = import.meta.glob(`/src/lib/posts/*.{md,svx,svelte.md}`);

	const postPromises = Object.entries(modules).map(async ([path, resolver]) =>
		resolver().then(
			(post): App.BlogPost => ({
				...(post as App.MdsvexFile).metadata,
				slug: slugFromPath(path)
			})
		)
	);

	const posts = await Promise.all(postPromises);
	return posts.map(D.selectKeys(['slug']));
}) satisfies EntryGenerator;
