import { sveltekit } from '@sveltejs/kit/vite';
import unoCSS from '@unocss/svelte-scoped/vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { defineConfig } from 'vite';
import { watch } from 'vite-plugin-watch';

const targets = browserslistToTargets(
	browserslist('defaults, not IE 11, not IE_Mob 11, not OperaMini all')
);

export default defineConfig(({ command }) => ({
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
	optimizeDeps: {
		exclude: command === 'serve' ? ['@inlang/paraglide-js'] : []
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
		watch({
			command: 'paraglide-js compile --namespace website',
			pattern: 'static/messages.json'
		}),
		sveltekit()
	],
	ssr: {
		noExternal: ['@inlang/paraglide-js']
	}
}));
