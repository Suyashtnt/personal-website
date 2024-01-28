import type { AvailableLanguageTag } from '$i18n/runtime';

import { allPosts } from '$lib/posts';
import { v5 as uuid } from 'uuid';

import type { RequestHandler } from './$types';

export const prerender = true;

// keep the old URL so its the same
const blogUuid = uuid('https://tntman.tech', uuid.URL);

function _objectEntries<T extends Record<PropertyKey, unknown>, K extends keyof T, V extends T[K]>(
	o: T
) {
	return Object.entries(o) as [K, V][];
}

export const GET: RequestHandler = async () => {
	const posts = await Promise.all(
		_objectEntries(allPosts).map(async ([language, postPromises]) => {
			const posts = await postPromises;
			return posts.map((post) => ({
				...post,
				language
			}));
		})
	).then((posts) => posts.flat());

	const publishedPosts = posts.filter((post) => post.published);
	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	const body = _render(publishedPosts);

	const options = {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/atom+xml'
		}
	};

	return new Response(body, options);
};

const _render = (posts: (App.BlogPost & { language: AvailableLanguageTag })[]) =>
	`
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>The Badly Drawn Blog</title>
  <subtitle>Your local wobblers blog about random stuff (usually relating to tech).</subtitle>

  <id>tag:tntman.tech,2008-03-10:${blogUuid}</id>

  <link href="https://wobbl.in/posts" />
  <link href="https://wobbl.in/atom.xml" rel="self" type="application/atom+xml" />

  <updated>${new Date(posts[0]!.updated).toISOString()}</updated>

  <author>
    <name>Suyashtnt</name>
    <email>Suyashtnt@gmail.com</email>
    <uri>https://wobbl.in</uri>
  </author>

  ${posts.map(_renderPost).join('\n')}
</feed>
`.trim();

// TODO: copyright (still figuring it out)
const _renderPost = (post: App.BlogPost & { language: string }) =>
	`
<entry>
    <title>${post.title}</title>
    <id>tag:tntman.tech,${new Date(post.date).toISOString().split('T')[0]}:${_getPostUuid(
		post
	)}</id>


    <link
        href="https://wobbl.in/posts/${post.slug}?lang=${post.language}"
        hreflang="${post.language}"
        type="text/html"
    />

    <author>
        <name>${post.author}</name>
    </author>

    <summary>${post.description}</summary>
    <content src="https://wobbl.in/posts/${post.slug}" type="text/html" />

    <updated>${new Date(post.updated).toISOString()}</updated>
    <published>${new Date(post.date).toISOString()}</published>
</entry>
`.trim();

const _getPostUuid = (post: App.BlogPost) => uuid(post.slug, blogUuid);
