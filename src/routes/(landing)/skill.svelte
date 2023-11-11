<script context="module" lang="ts">
	export interface ISkill {
		/**
		 * Very short description or tagline of the skill
		 */
		description: string;
		/**
		 * My experience with the skill. In markdown.
		 */
		experience: string;
		/**
		 * Preferably SVG, 1:1 aspect ratio
		 */
		icon: string;
		iconAlt: string;
		id: string;
		/**
		 * Name of the skill
		 */
		name: string;
		/**
		 * My proficiency with the skill.
		 */
		proficiency: 'Beginner' | 'Intermediate' | 'Skilled';
		/**
		 * Type of skill
		 */
		type: 'Backend' | 'Framework' | 'Frontend' | 'Language' | 'Other' | 'Tool';
		/**
		 * URL to the skill's website or documentation
		 */
		url?: string;
	}
</script>

<script lang="ts">
	import type { TransitionConfig } from 'svelte/transition';

	export let skill: ISkill;

	export let send: (node: Element, args: { key: string }) => () => TransitionConfig;
	export let receive: (node: Element, args: { key: string }) => () => TransitionConfig;
</script>

<a
	class="flex items-center gap-4 text-light-text decoration-none dark:text-dark-text visited:text-light-text visited:dark:text-dark-text"
	data-sveltekit-noscroll
	href={`/?skill=${skill.id}`}
>
	<img
		alt={skill.iconAlt}
		class="h-auto w-8 md:w-10"
		in:receive={{ key: `img-${skill.id}` }}
		out:send={{ key: `img-${skill.id}` }}
		src={skill.icon}
	/>

	<h2
		class="text-2xl md:text-2xl"
		in:receive={{ key: `text-${skill.id}` }}
		out:send={{ key: `text-${skill.id}` }}
	>
		{skill.name}
	</h2>
</a>
