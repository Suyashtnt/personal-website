import { sveltekit } from '@sveltejs/kit/vite';
import type { Theme } from 'unocss/preset-uno';
import UnoCSS from 'unocss/vite';
import type { UserConfig } from 'vite';
import { imagetools } from 'vite-imagetools'

const config: UserConfig = {
	plugins: [
		UnoCSS<Theme>({
			mode: 'svelte-scoped'
		}),
		imagetools(),
		sveltekit()
	]
};

export default config;
