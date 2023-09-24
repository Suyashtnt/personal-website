import type { UserConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';
import unoCSS from '@unocss/svelte-scoped/vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

const targets = browserslistToTargets(
	browserslist('defaults, not IE 11, not IE_Mob 11, not OperaMini all')
);
const config: UserConfig = {
	build: {
		cssMinify: 'lightningcss'
	},
	css: {
		devSourcemap: true,
		lightningcss: {
			drafts: {
				nesting: true
			},
			targets
		},
		transformer: 'lightningcss'
	},
	plugins: [
		unoCSS(),
		imagetools({
			profiles: {
				optimize: new URLSearchParams({
					format: 'avif;webp;jpg',
					w: '1920;1366;780;414'
				})
			}
		}),
		sveltekit()
	]
};

export default config;
