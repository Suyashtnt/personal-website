import { getCurrentLanguage } from '$lib/helpers/i18n';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, request }) => {
	return {
		language: getCurrentLanguage(cookies, request)
	};
}) satisfies LayoutServerLoad;
