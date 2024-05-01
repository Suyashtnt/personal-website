import { slugFromPath } from '$lib/helpers/slug-from-path';
import { allPosts } from '$lib/posts';
import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';

import type { EntryGenerator, PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ params, parent }) => {
	const { language } = await parent();

	const posts = await allPosts[language];
	const { component, ...frontmatter } =
		posts.find((post) => post.slug === params.slug) ?? error(404, 'Post not found');

	const cannotFindPost = !frontmatter?.title;

	if (cannotFindPost) {
		error(404, `Cannot find post with slug '${params.slug}'`);
	}

	return {
		frontmatter,
		postHtml: render(component, {
			context: new Map(),
			props: {}
		}).html.replaceAll(/<!--ssr:([^-])-->/g, ''),
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
	return posts.map(({ slug }) => ({ slug }));
}) satisfies EntryGenerator;
