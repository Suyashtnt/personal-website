import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import remarkHeadings from '@vcarl/remark-headings';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import {defineMDSveXConfig as defineConfig} from 'mdsvex';

function headings() {
    return async (_tree, vFile) => {
        console.log('here');
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
