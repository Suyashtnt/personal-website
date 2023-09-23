import {preprocessMeltUI} from "@melt-ui/pp";
import adapter from '@sveltejs/adapter-cloudflare';
import {mdsvex} from 'mdsvex';
import preprocess from 'svelte-preprocess';
import sequence from "svelte-sequential-preprocessor";

import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  kit: {
    adapter: adapter(),
    alias: {
      $lib: './src/lib',
      '@storyblok/svelte': './node_modules/@storyblok/svelte'
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
        config.include.push('../placeholder.ts');
        return config;
      }
    }
  },
  preprocess: sequence([preprocess(), mdsvex(mdsvexConfig), preprocessMeltUI()])
};
export default config;
