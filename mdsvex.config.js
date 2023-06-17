import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import remarkHeadings from '@vcarl/remark-headings';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { defineMDSveXConfig as defineConfig } from 'mdsvex';

function headings() {
  return async function transformer(_tree, vFile) {
    console.log("here")
    if (!vFile.data.fm) vFile.data.fm = {};
    vFile.data.fm.headings = vFile.data.headings;
  };
};

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool'
  },

  remarkPlugins: [
    remarkHeadings,
    headings,
    [
      remarkGithub,
      {
        repository: 'https://github.com/suyashtnt/personal-website.git'
      }
    ],
    remarkAbbr,
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap'
      }
    ]
  ]
});

export default config;
