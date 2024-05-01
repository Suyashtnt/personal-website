import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkAbbr from 'remark-abbr';
import remarkGithub from 'remark-github';
import remarkCallouts from "@portaljs/remark-callouts";
import { codeToHtml } from 'shiki';

import syntaxDark from './syntax-dark.json' assert { type: 'json' };

/**
 * @param {string} code
 * @param {string | undefined} lang
 */
async function highlighter(code, lang = '') {
	/**
	 * escape curlies, backtick, \t, \r, \n to avoid breaking output of {@html `here`} in .svelte
	 * @param {string} str the string to escape
	 * @returns the escaped string
	 */
	const escape_svelty = (str) =>
		str
			.replace(/{/g, '&#123;')
			.replace(/}/g, '&#125;')
			.replace(/`/g, '&#96;')
			.replace(/\\([trn])/g, ' ')

	const html = await codeToHtml(code, {
		lang,
		themes: {
			dark: syntaxDark,
			light: 'github-light'
		}
	});

	return escape_svelty(html);
}

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	highlight: {
		highlighter
	},

	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap'
			}
		]
	],

	remarkPlugins: [
		remarkAbbr,
		[
			remarkGithub,
			{
				repository: 'https://github.com/suyashtnt/personal-website.git'
			}
		],
		remarkCallouts
	],

	smartypants: {
		dashes: 'oldschool'
	}
});

export default config;
