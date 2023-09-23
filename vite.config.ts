import type { UserConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';
import unoCSS from '@unocss/svelte-scoped/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import {
	type OutputFormat,
	type Picture,
	type TransformFactory,
	imagetools,
	setMetadata
} from 'vite-imagetools';

import { createPlaceholder } from './placeholder';

const placeholderTransform: TransformFactory = (config) => {
	return async function (image) {
		if (!('lqip' in config)) return image;

		const href = await createPlaceholder(
			// @ts-expect-error it's a string
			image.options.input.file
		);
		setMetadata(image, 'lqip', href);
		return image;
	};
};

const pictureProxy = (a: OutputFormat | undefined): OutputFormat => {
	return function (metadatas) {
		if (!a) throw new Error('No picture format');

		const pictureFormat = a(metadatas);
		return async function (imageConfig) {
			const picture = pictureFormat(imageConfig) as Picture;
			// @ts-expect-error if it isn't there something is wrong
			return { ...picture, lqip: imageConfig[0].lqip };
		};
	};
};

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
			defaultDirectives(url) {
				if (url.searchParams.has('optimize')) {
					/** @ts-expect-error we can pass in booleans */
					return new URLSearchParams({
						as: 'picture',
						format: 'avif;webp;jpg',
						lqip: true,
						w: url.searchParams.get('w') ?? '1920;1366;780;414'
					});
				}

				return new URLSearchParams();
			},
			extendOutputFormats(builtins) {
				return {
					...builtins,
					picture: pictureProxy(builtins.picture)
				};
			},
			extendTransforms(builtins) {
				return [placeholderTransform, ...builtins];
			}
		}),
		sveltekit()
	]
};

export default config;
