import remarkHeadings from '@vcarl/remark-headings';
import {defineMDSveXConfig as defineConfig} from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkAbbr from 'remark-abbr';
import remarkGithub from 'remark-github';

function headings() {
    return async (_tree, vFile) => {
        if (!vFile.data.fm) vFile.data.fm = {};
        vFile.data.fm.headings = vFile.data.headings;
    };
}

const config = defineConfig({
    extensions: ['.svelte.md', '.md', '.svx'],

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
        remarkHeadings,
        headings,
        [
            remarkGithub,
            {
                repository:
                    'https://github.com/suyashtnt/personal-website.git'
            }
        ],
        remarkAbbr
    ],
    smartypants: {
        dashes: 'oldschool'
    }
});

export default config;
