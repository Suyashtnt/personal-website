// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { Picture } from 'vite-imagetools';
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		interface MdsvexFile {
			default: import('svelte/internal').SvelteComponent;
			metadata: Record<string, string>;
		}

		type MdsvexResolver = () => Promise<MdsvexFile>;

		interface BlogPost {
			slug: string;
			title: string;
			author: string;
			description: string;
			date: string;
			published: boolean;
		}
	}

	module "*&srcset" {
		/**
		 * actual types
		 * - code https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
		 * - docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
		 */
		const out;
		export default out;
	}

	module "*&metadata" {
		export const width: number;
		export const height: number;
		export const src: string;
	}

	module "*optimize" {
		interface PictureWithLQIP extends Picture {
			lqip: string;
		}

		const out: PictureWithLQIP;
		export default out;
	}
}


export {};
