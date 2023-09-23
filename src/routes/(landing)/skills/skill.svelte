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
    export let skill: ISkill;
    export let href: string;
</script>

<a
    class="max-w-full flex items-center gap-4 border-light-overlay-0 rounded-xl bg-light-base pl-4 text-light-text decoration-none transition-all duration-200 hover:cursor-pointer dark:border-dark-overlay-0 hover:border-light-sapphire dark:bg-dark-base dark:text-dark-text visited:text-light-text hover:shadow-2xl dark:hover:border-dark-sapphire visited:dark-text-dark-text"
    data-sveltekit-noscroll
    {href}
>
    <img
        alt={skill.iconAlt}
        class="h-auto w-8 md:w-10"
        src={skill.icon}
    />

    <h2 class="text-2xl md:text-2xl">
        {skill.name}
    </h2>
</a>
