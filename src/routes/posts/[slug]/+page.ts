import { slugFromPath } from '$lib/helpers/slug-from-path';
import { allPosts } from '$lib/posts';
import { D } from '@mobily/ts-belt';
import { error } from '@sveltejs/kit';

import type { EntryGenerator, PageLoad } from './$types';

export type DataItem = {
	depth: 1 | 2 | 3 | 4 | 5 | 6;
	value: string | undefined;
};

export type DataItemWithChildren = {
	children: readonly DataItemWithChildren[];
} & DataItem;

export const load: PageLoad = async ({ params, parent }) => {
	const { language } = await parent();

	const posts = await allPosts[language];
	const post = posts.find((post) => post.slug === params.slug);

	const cannotFindPost = !post?.title;

	if (cannotFindPost) {
		error(404, `Cannot find post with slug '${params.slug}'`);
	}

	return {
		component: post.component,
		frontmatter: post,
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
