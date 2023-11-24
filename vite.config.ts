import { sveltekit } from '@sveltejs/kit/vite';
import unoCSS from '@unocss/svelte-scoped/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { defineConfig } from 'vite';
import { watch } from 'vite-plugin-watch';
import { enhancedImages } from '@sveltejs/enhanced-img';

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
		enhancedImages(),
		watch({
			command: 'paraglide-js compile',
			pattern: 'src/lib/i18n/*.json'
		}),
		sveltekit()
	],
	ssr: {
		noExternal: ['@inlang/paraglide-js']
	}
}));
