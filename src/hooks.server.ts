import type { Handle } from '@sveltejs/kit';

import { i18n } from '$lib/i18n';
import { render } from '@master/css-server';
import { sequence } from '@sveltejs/kit/hooks';

import config from '../master.css';

export const handle: Handle = sequence(i18n.handle(), ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => render(html, config).html
	})
);
