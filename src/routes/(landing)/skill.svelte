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
    interface Props {
        isSelected: boolean;
        skill: ISkill;
    }
    const { isSelected, skill }: Props = $props();
</script>

<a
	class="decoration:none flex align-items:center b:2|primary/.2 gap:4x px:4x r:4x text:overlay"
	class:border-solid={isSelected}
    data-sveltekit-noscroll
	href={`/?skill=${skill.id}`}
>
	<img alt={skill.iconAlt} class="h:auto w:8x w:10x@md" src={skill.icon} />

	<h2 class="text:6x">
		{skill.name}
	</h2>
</a>
