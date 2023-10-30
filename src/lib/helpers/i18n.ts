import type { AvailableLanguageTag } from '@inlang/paraglide-js/website';
import type { Cookies } from '@sveltejs/kit';

export const getCurrentLanguage = (cookies: Cookies, request: Request): AvailableLanguageTag => {
	return (new URL(request.url).searchParams.get('lang') ??
		cookies.get('language') ??
		request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] ??
		'en') as AvailableLanguageTag;
};
