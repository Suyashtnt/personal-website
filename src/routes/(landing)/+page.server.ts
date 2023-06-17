import {redirect} from '@sveltejs/kit';
import type {PageServerLoad} from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect(301, '/skills/Svelte');
};
