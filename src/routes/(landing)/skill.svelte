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
    const { isSelected, skill } = $props<Props>();
</script>

<a
	class="flex items-center gap-4 border-2 border-light-lavender/20 rounded-xl px-4 text-light-text decoration-none transition-all duration-200 dark:border-dark-primary_background/80 dark:text-dark-overlay_foreground hover:shadow-2xl"
	class:border-solid={isSelected}
    data-sveltekit-noscroll
	href={`/?skill=${skill.id}`}
>
	<img alt={skill.iconAlt} class="h-auto w-8 md:w-10" src={skill.icon} />

	<h2 class="text-2xl md:text-2xl">
		{skill.name}
	</h2>
</a>
