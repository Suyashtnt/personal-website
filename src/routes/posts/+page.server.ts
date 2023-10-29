import { allPosts } from '$lib/posts';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { language } = await parent();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const posts = (await allPosts[language]).map(({ component: _, ...rest }) => rest);

	const publishedPosts = posts.filter((post) => post.published);

	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return { posts: publishedPosts };
};
