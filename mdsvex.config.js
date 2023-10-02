import { defineMDSveXConfig as defineConfig } from "mdsvex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkAbbr from "remark-abbr";
import remarkGithub from "remark-github";
import { codeToHtml } from 'shikiji'

import mochaTheme from './mocha.json' assert { type: "json" }
import frappeTheme from './frappe.json' assert { type: "json" }

/**
 * @param {string} code
 * @param {string | undefined} lang
 */
async function highlighter(code, lang = "") {
    /**
     * escape curlies, backtick, \t, \r, \n to avoid breaking output of {@html `here`} in .svelte
     * @param {string} str the string to escape
     * @returns the escaped string
     */
    const escape_svelty = (str) => str
    .replace(
        /[{}`]/g,
        (c) => ({ '`': '&#96;', '{': '&#123;', '}': '&#125;' }[c])
    )
    .replace(/\\([trn])/g, '&#92;$1');

    const html = await codeToHtml(code, {
        lang,
        
        themes: {
            dark: mochaTheme,
            light: frappeTheme
        }
    });

    return escape_svelty(html)
}



const config = defineConfig({
    extensions: [".svelte.md", ".md", ".svx"],

    highlight: {
        highlighter
    },

    rehypePlugins: [
        rehypeSlug,
        [
            rehypeAutolinkHeadings,
            {
                behavior: "wrap",
            },
        ],
    ],

    remarkPlugins: [
        [
            remarkGithub,
            {
                repository: "https://github.com/suyashtnt/personal-website.git",
            },
        ],
        remarkAbbr,
    ],

    smartypants: {
        dashes: "oldschool",
    }
});

export default config;
