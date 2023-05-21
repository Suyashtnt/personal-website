<script context="module" lang="ts">
    export interface ISkill {
        /**
         * Name of the skill
         */
        name: string;
        /**
         * Very short description or tagline of the skill
         */
        description: string;
        /**
         * Preferably SVG, 1:1 aspect ratio
         */
        icon: string;
        iconAlt: string;
        /**
         * URL to the skill's website or documentation
        */
        url?: string;
        /**
         * My experience with the skill. In markdown.
         */
        experience: string;
        /**
         * My proficiency with the skill.
        */
        proficiency: 'Beginner' | 'Intermediate' | 'Skilled'
        /**
         * type of skill
         */
        type: 'Language' | 'Framework' | 'Tool' | 'Frontend' | 'Backend' | 'Other'
    }
</script>

<script lang="ts">
    export let skill: ISkill;
    export let href: string
</script>

<a
    class="
        pa-3 max-w-full flex gap-4 items-center hover:cursor-pointer rounded-xl
        decoration-none
        text-light-text dark:text-dark-text
        visited:text-light-text visited:dark-text-dark-text
        bg-light-base dark:bg-dark-base

        border-light-overlay-0 dark:border-dark-overlay-0
        transition-all duration-200
        hover:shadow-2xl hover:border-light-sapphire dark:hover:border-dark-sapphire
    "

    {href}
    data-sveltekit-noscroll
>
    <img
        src={skill.icon}
        alt={skill.iconAlt}
        class="w-10 h-auto"
    >

    <h2 class="text-2xl">
        {skill.name}
    </h2>
</a>
