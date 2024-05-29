import { preprocessMeltUI } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import sequence from 'svelte-sequential-preprocessor';

import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
    extensions: ['.svelte', ...(mdsvexConfig.extensions ?? [])],
    kit: {
        adapter: adapter(),
        alias: {
            $i18n: './src/paraglide',
            $lib: './src/lib'
        },
        prerender: {
            handleMissingId: 'warn'
        },
        typescript: {
            config(config) {
                config.include.push('../uno.config.ts');
                config.include.push('../vite.config.ts');
                config.include.push('../mdsvex.config.js');
                config.include.push('../eslint.config.js');
                config.include.push('../svelte.config.js');
                return config;
            }
        }
    },
    preprocess: sequence([vitePreprocess(), mdsvex(mdsvexConfig), preprocessMeltUI()])
};
export default config;
