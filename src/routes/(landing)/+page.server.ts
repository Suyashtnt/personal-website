import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	throw redirect(301, '/skills/Svelte');
};
