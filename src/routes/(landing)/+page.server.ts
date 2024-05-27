import Nix from '~icons/devicon/nixos?raw&width=2.5em&height=2.5em';
import Rust from '~icons/logos/rust?raw&width=2.5em&height=2.5em';
import Svelte from '~icons/logos/svelte-icon?raw&width=2.5em&height=2.5em';
import Vue from '~icons/logos/vue?raw&width=2.5em&height=2.5em';

import type { IProject } from './project.svelte';
import type { ISkill } from './skill.svelte';

export const prerender = false;
import { allPosts } from '$lib/posts';

import type { PageServerLoad } from './$types';

export const _skills: ISkill[] = [
	{
		description: 'Cybernetically enhanced web apps',
		experience: `
I've been using svelte for about 3 years now. From this personal website to basically anything that isn't Nuxt 3, it's been an absolute blast to use. It's the only frontend JS framework I can truely consider myself skilled in, and it's my most used out of all that I have used.

Started learning it after I heard about it from a Youtube video, and have not regretted that decision since. Possibly my favourite feature is svelte stores, which makes app state incredibly easy to manage. Very handy for basically anything, especially for persisting data across reloads/saving settings in a tauri app.

Sveltekit then turns Svelte from a frontend library into a fullstack app framework. It makes svelte the best frontend framework I've used. From folder-based routing to load functions, it does basically everything I need to build any website. Routing? Check. SSR? Check. NoJS support with ease? Check. Progressive enhancement? Check. It has allowed me to make 0 JS incredibly easily and in a way thats actually fun.
        `,
		icon: Svelte,
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
		icon: Vue,
		id: 'Vue',
		name: 'Vue',
		proficiency: 'Intermediate',
		type: 'Frontend',
		url: 'https://vuejs.org/'
	},
	{
		description: 'Empowering everyone to build efficient software.',
		experience: `
I've been using Rust since 1 January 2020 at 00:00 UTC+2. It's been very
enjoyable to use in a few projects (such as Glowsquid, Copper, and a few side projects that have died)
because of its sheer speed and safety guarantees. Who cares about memory safety when the compiler can
tell me exactly where my program can break because I forgot a null check or didn't account for a certain path.

\`unsafe\` Still scares me though...
`,
		icon: Rust,
		id: 'Rust',
		name: 'Rust',
		proficiency: 'Intermediate',
		type: 'Language',
		url: 'https://www.rust-lang.org/'
	},
	{
		description: 'Reproducible builds and deployments.',
		experience: `
I've been using NixOS since around 2022. I use it on my desktop, raspberry pi, and laptop.
It's a great distro mainly because my whole system and user config [is in a git repo](https://github.com/Suyashtnt/commafiles).
If something breaks, I can just git revert and rebuild the whole system. I can also just push from my laptop and get github actions
to rebuild my system and send it back to my laptop. It's an extremely flexible and configurable OS at the cost of the most brutal
learning code and unreadable errors known to mankind (I fear the day I ask a question and nobody knows what to do).
`,
		icon: Nix,
		id: 'Nix',
		name: 'Nix/OS',
		proficiency: 'Intermediate',
		type: 'Tool',
		url: 'https://nixos.org/'
	}
];

export const _projects: IProject[] = [
	{
		description: 'This very website!',
		name: 'Personal website',
		url: 'https://github.com/suyashtnt/personal-website'
	},
	{
		description: 'Next-generation minecraft launcher',
		name: 'Glowsquid',
		url: 'https://github.com/glowsquid-launcher/glowsquid-new'
	},
	{
		description: 'My NixOS configuration',
		name: 'Commafiles',
		url: 'https://github.com/suyashtnt/commafiles'
	}
];

export const load: PageServerLoad = async ({ parent }) => {
	const { language } = await parent();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const posts = (await allPosts[language]).map(({ component: _, ...rest }) => rest);

	const publishedPosts = posts.filter((post) => post.published);

	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return {
		posts: publishedPosts,
		projects: _projects,
		skills: _skills
	};
};
