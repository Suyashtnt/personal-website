import type { Cookies } from '@sveltejs/kit';

import {
	type AvailableLanguageTag,
	isAvailableLanguageTag,
	sourceLanguageTag
} from '$i18n/runtime';

export const getCurrentLanguage = (cookies: Cookies, request: Request): AvailableLanguageTag => {
	const lang =
		new URL(request.url).searchParams.get('lang') ??
		cookies.get('language') ??
		request.headers.get('accept-language')?.split(',')[0]?.split('-')[0];

	return isAvailableLanguageTag(lang) ? lang : sourceLanguageTag;
};
