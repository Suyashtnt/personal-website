import { error, redirect } from '@sveltejs/kit';
export const prerender = false;
import { availableLanguageTags } from '@inlang/paraglide-js/website';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	throw redirect(301, '/skills/Svelte');
};

const isElementOfAvailableLanguageTags = (
	element: string
): element is (typeof availableLanguageTags)[number] => {
	return availableLanguageTags.includes(element as never);
};

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const dataLanguage = data.get('language')?.toString();
		const newLanguage =
			dataLanguage ??
			request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] ??
			cookies.get('language') ??
			'en';

		if (isElementOfAvailableLanguageTags(newLanguage)) {
			cookies.set('language', newLanguage);

			return {
				language: newLanguage
			};
		} else {
			throw error(
				400,
				`Invalid language. Valid languages are: ${availableLanguageTags.join(', ')}`
			);
		}
	}
} satisfies Actions;
