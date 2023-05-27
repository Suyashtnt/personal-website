import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from '@unocss/svelte-scoped/vite'
import type { UserConfig } from 'vite';
import { imagetools, setMetadata, type OutputFormat, type TransformFactory, type Picture } from 'vite-imagetools'
import { createPlaceholder } from './placeholder';

const placeholderTransform: TransformFactory = (config) => {
	return async function (image) {
		if (!('lqip' in config)) return image;

		/** @ts-ignore it's a string */
		const href = await createPlaceholder(image.options.input.file);
		setMetadata(image, 'lqip', href);
		return image;
	};
};

const pictureProxy = (a: OutputFormat): OutputFormat => {
	return function (metadatas) {
		const pictureFormat = a(metadatas);
		return async function (imageConfig) {
			const picture = pictureFormat(imageConfig) as Picture;
			return { ...picture, lqip: imageConfig[0].lqip };
		};
	};
};

const config: UserConfig = {
	plugins: [
		UnoCSS(),
		imagetools({
			extendOutputFormats: (builtins) => {
				return { ...builtins, picture: pictureProxy(builtins.picture) };
			},
			extendTransforms: (builtins) => {
				return [placeholderTransform, ...builtins];
			},
			defaultDirectives: (url) => {
				if (url.searchParams.has('optimize')) {
					/** @ts-ignore we can pass in booleans */
					return new URLSearchParams({
						w: url.searchParams.get('w') || '1920;1366;780;414',
						format: 'avif;webp;jpg',
						as: 'picture',
						lqip: true
					});
				}
				return new URLSearchParams();
			}
		}),
		sveltekit(),
	],
};

export default config;
