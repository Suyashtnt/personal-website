import type { LayoutLoad } from './$types';

export const skills = [
    {
        name: 'Svelte',
        description: 'Cybernetically enhanced web apps',
        experience: `
I've been using svelte for about 3 years now. From this personal website to basically anything that isn't Nuxt 3, it's been an absolute blast to use. It's the only frontend JS framework I can truely consider myself skilled in, and it's my most used out of all that I have used.

Started learning it after I heard about it from a Youtube video, and have not regretted that decision since. Possibly my favourite feature is svelte stores, which makes app state incredibly easy to manage. Very handy for basically anything, especially for persisting data across reloads/saving settings in a tauri app.
        `,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg',
        iconAlt: 'Svelte logo',
        proficiency: 'Skilled',
        type: 'Frontend',
        url: 'https://svelte.dev/'
    },
    {
        name: 'SvelteKit',
        description: 'Web development, streamlined',
        experience: `
Sveltekit turns Svelte from a frontend library into a fullstack app framework. It makes svelte the best frontend framework I've used. From folder-based routing to load functions, it does basically everything I need to build any website.

It has allowed me to make 0 JS incredibly easily with its server side rendering capabilities and form actions, and I can still have benefits if JS is enabled via progressive enhancement.

Tl;Dr Sveltekit is amazing.
        `,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg',
        iconAlt: 'Svelte logo',
        proficiency: 'Skilled',
        type: 'Frontend',
        url: 'https://kit.svelte.dev/'
    },
    {
        name: 'Vue',
        description: 'The Progressive JavaScript Framework',
        experience: `
Vue was the first JS framework I learnt, and I still try it out sometimes. Vue was my first real step in becoming a web dev, and was my go-to before Svelte. It's an absolute blast to use for prototyping and getting stuff running quickly with it's huge ecosystem and Nuxt 3, but it just lacks some of the features I like in Svelte which is why I don't really use it often anymore.

I first used it when making a website for my first discord bot, emojicord. That bot is dead and so is the website, but I still have memories of both. I also learnt Vuetify from this website, as I used one of its starter templates. 
        `,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
        iconAlt: 'Vue logo',
        proficiency: 'Intermediate',
        type: 'Frontend',
        url: 'https://vuejs.org/'
    },
    {
        name: 'Rust',
        description: 'Empowering everyone to build reliable and efficient software.',
        experience: `
I've been using Rust for about 3 years now.

I've used it for a few projects, including Glowsquid, Copper, and Chesscord.

It's possibly my favorite language to use because of its sheer speed and safety guarantees.

I am yet to use it in some sort of production environment, nor go into its dark arts of unsafe code.
`,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg',
        iconAlt: 'Rust logo',
        proficiency: 'Intermediate',
        type: 'Language',
        url: 'https://www.rust-lang.org/'
    }
] as const

export const load: LayoutLoad = async () => {
    return {
        skills
    }
};
