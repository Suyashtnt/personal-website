<script context="module" lang="ts">
    export interface SkillBlok extends SbBlokData {
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
         * My experience with the skill
         */
        experience: ISbRichtext;
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
    import type { SbBlokData, ISbRichtext } from '@storyblok/svelte';
	import { createEventDispatcher } from 'svelte';

    export let blok: SkillBlok;

    const dispatch = createEventDispatcher<{
        click: void;
    }>()
</script>

<button
    class="
        pa-3 w-full flex gap-4 items-center hover:cursor-pointer rounded-xl
        text-light-text dark:text-dark-text
        bg-light-base dark:bg-dark-base

        border-light-overlay-0 dark:border-dark-overlay-0
        transition-all duration-200
        hover:shadow-2xl hover:border-light-sapphire dark:hover:border-dark-sapphire
    "
    on:click={() => dispatch('click')}
>
    <img
        src={blok.icon}
        alt={blok.iconAlt}
        class="w-10 h-auto"
    >

    <h2
        class="text-2xl"
    >
        {blok.name}
    </h2>
</button>
