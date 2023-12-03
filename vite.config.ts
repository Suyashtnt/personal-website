import { paraglide } from '@inlang/paraglide-js-adapter-vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import unoCSS from '@unocss/svelte-scoped/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { defineConfig } from 'vite';

const targets = browserslistToTargets(
	browserslist('defaults, not IE 11, not IE_Mob 11, not OperaMini all')
);

export default defineConfig({
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
		enhancedImages(),
		paraglide({
			outdir: './src/paraglide',
			project: './project.inlang'
		}),
		sveltekit()
	]
});
