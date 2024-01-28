import { load as parentServerLoad } from '../(landing)/+page.server';

export const csr = false;
export const load = parentServerLoad;
