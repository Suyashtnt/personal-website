import type { AvailableLanguageTag } from '@inlang/paraglide-js/website';
import type { Cookies } from '@sveltejs/kit';

export const getCurrentLanguage = (cookies: Cookies, request: Request): AvailableLanguageTag => {
	return (cookies.get('language') ??
		request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] ??
		'en') as AvailableLanguageTag;
};
