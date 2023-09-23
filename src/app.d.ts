// See https://kit.svelte.dev/docs/types#app
import type { SvelteComponent } from 'svelte';
// for information about these interfaces
import type { Picture } from 'vite-imagetools';

declare global {
	namespace App {
		// Interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		type MdsvexFile = {
			default: SvelteComponent;
			metadata: BlogPost & Record<string, string>;
		};

		type MdsvexResolver = () => Promise<MdsvexFile>;

		type BlogPost = {
			author: string;
			date: string;
			description: string;
			published: boolean;
			slug: string;
			title: string;
			updated: string;
		};
	}

	module '*&srcset' {
		/**
		 * Actual types
		 * - code https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
		 * - docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
		 */
		const out;
		export default out;
	}

	module '*&metadata' {
		export const width: number;
		export const height: number;
		export const src: string;
	}

	module '*optimize' {
		type PictureWithLqip = Picture & {
			lqip: string;
		};

		const out: PictureWithLqip;
		export default out;
	}
}
