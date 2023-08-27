import type {LayoutLoad} from './$types';
import type {ISkill} from './skill.svelte';

export const _skills: ISkill[] = [
    {
        description: 'Cybernetically enhanced web apps',
        experience: `
I've been using svelte for about 3 years now. From this personal website to basically anything that isn't Nuxt 3, it's been an absolute blast to use. It's the only frontend JS framework I can truely consider myself skilled in, and it's my most used out of all that I have used.

Started learning it after I heard about it from a Youtube video, and have not regretted that decision since. Possibly my favourite feature is svelte stores, which makes app state incredibly easy to manage. Very handy for basically anything, especially for persisting data across reloads/saving settings in a tauri app.

Sveltekit then turns Svelte from a frontend library into a fullstack app framework. It makes svelte the best frontend framework I've used. From folder-based routing to load functions, it does basically everything I need to build any website. Routing? Check. SSR? Check. NoJS support with ease? Check. Progressive enhancement? Check. It has allowed me to make 0 JS incredibly easily and in a way thats actually fun.
        `,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg',
        iconAlt: 'Svelte logo',
        id: 'Svelte',
        name: 'Svelte/Kit',
        proficiency: 'Skilled',
        type: 'Frontend',
        url: 'https://svelte.dev/'
    },
    {
        description: 'The Progressive JavaScript Framework',
        experience: `
Vue was the first JS framework I learnt, and I still try it out sometimes. Vue was my first real step in becoming a web dev, and was my go-to before Svelte. It's an absolute blast to use for prototyping and getting stuff running quickly with it's huge ecosystem and Nuxt 3, but it just lacks some of the features I like in Svelte which is why I don't really use it often anymore.

I first used it when making a website for my first discord bot, emojicord. That bot is dead and so is the website, but I still have memories of both. I also learnt Vuetify from this website, as I used one of its starter templates. 
        `,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
        iconAlt: 'Vue logo',
        id: 'Vue',
        name: 'Vue',
        proficiency: 'Intermediate',
        type: 'Frontend',
        url: 'https://vuejs.org/'
    },
    {
        description:
            'Empowering everyone to build reliable and efficient software.',
        experience: `
I've been using Rust for about 3 years now.

I've used it for a few projects, including Glowsquid, Copper, and Chesscord.

It's possibly my favorite language to use because of its sheer speed and safety guarantees.

I am yet to use it in some sort of production environment, nor go into its dark arts of unsafe code.
`,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg',
        iconAlt: 'Rust logo',
        id: 'Rust',
        name: 'Rust',
        proficiency: 'Intermediate',
        type: 'Language',
        url: 'https://www.rust-lang.org/'
    },
    {
        description: 'Reproducible builds and deployments.',
        experience: `
I've been using NixOS for about 2 years now. I use it on my main PC, and it's been the best linux distro so far.

It's package manager is probably the best part. I have access to the biggest repository of apps, all of which are built from source and are reproducible. I can also create my own packages stupidly easily.

I've used it in production to create and deploy minimal docker containers. The fact that I can turn my apps binary into a baseless docker image with basically 0 effort seems like dark magic.
`,
        icon: 'https://raw.githubusercontent.com/NixOS/nixos-artwork/master/logo/nix-snowflake.svg',
        iconAlt: 'NixOS logo',
        id: 'Nix',
        name: 'Nix/OS',
        proficiency: 'Intermediate',
        type: 'Tool',
        url: 'https://nixos.org/'
    }
];

export const load: LayoutLoad = async () => {
    return {
        skills: _skills
    };
};
