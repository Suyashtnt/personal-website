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
        type:
            | 'Backend'
            | 'Framework'
            | 'Frontend'
            | 'Language'
            | 'Other'
            | 'Tool';
        /**
         * URL to the skill's website or documentation
         */
        url?: string;
    }
</script>

<script lang="ts">
	import { setupViewTransition } from 'sveltekit-view-transition';
	import type { OnNavigate } from '@sveltejs/kit';

    export let skill: ISkill;
    export let href: string;

    const { transition } = setupViewTransition();

	function shouldApply({ navigation }: { navigation: OnNavigate }) {
		return navigation?.to?.params?.skill === skill.id.toString();
	}

	function applyImmediately({ navigation }: { navigation: OnNavigate }) {
		return navigation?.from?.params?.skill === skill.id.toString();
	}
</script>

<a
    class="max-w-full flex items-center gap-4 border-light-overlay-0 rounded-xl bg-light-base pl-4 text-light-text decoration-none transition-all duration-200 hover:cursor-pointer dark:border-dark-overlay-0 hover:border-light-sapphire dark:bg-dark-base dark:text-dark-text visited:text-light-text hover:shadow-2xl dark:hover:border-dark-sapphire visited:dark-text-dark-text"
    data-sveltekit-noscroll
    {href}
    use:transition={{
        name: `card-${skill.id}`,
        shouldApply,
        applyImmediately
    }}
>
    <img
        alt={skill.iconAlt}
        class="h-auto w-8 md:w-10"
        src={skill.icon}
        use:transition={{
            name: `img-${skill.id}`,
            shouldApply,
            applyImmediately
        }}
    />

    <h2
        class="text-2xl md:text-2xl"
        use:transition={{
            name: `text-${skill.id}`,
            shouldApply,
            applyImmediately
        }}
    >
        {skill.name}
    </h2>
</a>
