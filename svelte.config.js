import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';
import {mdsvex} from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', ...mdsvexConfig.extensions],

    kit: {
        adapter: adapter(),
        alias: {
            $lib: './src/lib',
            '@storyblok/svelte': './node_modules/@storyblok/svelte'
        }
    },

    preprocess: [preprocess(), mdsvex(mdsvexConfig)]
};

export default config;
