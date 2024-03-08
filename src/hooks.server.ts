import type { Handle } from '@sveltejs/kit';

import { render } from '@master/css-server'
import config from '../master.css'
import { getCurrentLanguage } from '$lib/helpers/i18n';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			render(html.replace('%lang%', getCurrentLanguage(event.cookies, event.request)), config).html
	});

	return response;
};
