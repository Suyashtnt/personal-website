import type { AvailableLanguageTag } from '$i18n/runtime';

import * as m from '$i18n/messages';
import { error } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const potentialFooterTexts = [
        m.footer_txt_1(),
        m.footer_txt_2(),
        m.footer_txt_3(),
        m.footer_txt_4()
    ] as const;

    const footerText =
        potentialFooterTexts[Math.floor(Math.random() * potentialFooterTexts.length)] ??
        error(500, 'No footer text found. This should never happen');

    return {
        footerText,
        language: locals.paraglide.lang as AvailableLanguageTag
    };
}) satisfies LayoutServerLoad;
