import { getCurrentLanguage } from '$lib/helpers/i18n';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html
            .replace('%unocss-svelte-scoped.global%', 'unocss_svelte_scoped_global_styles')
            .replace('%lang%', getCurrentLanguage(event.cookies, event.request))
	});

	return response;
};
