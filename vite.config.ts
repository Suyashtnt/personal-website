import { paraglide } from '@inlang/paraglide-sveltekit/vite';

import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite'

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
			targets
		},
		transformer: 'lightningcss'
	},
	plugins: [
		enhancedImages(),
		paraglide({
			outdir: './src/paraglide',
			project: './project.inlang'
		}),
		sveltekit(),
		Icons({
			compiler: 'svelte',
			autoInstall: true
		})
	],
	server: {
		fs: {
			allow: ['./master.css.ts']
		}
	}
});
