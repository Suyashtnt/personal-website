import { sveltekit } from '@sveltejs/kit/vite';
import type { Theme } from 'unocss/preset-uno'
import UnoCSS from 'unocss/vite';
import type { UserConfig } from 'vite';


const config: UserConfig = {
	plugins: [
		UnoCSS<Theme>(),
		sveltekit()
	]
};

export default config;
