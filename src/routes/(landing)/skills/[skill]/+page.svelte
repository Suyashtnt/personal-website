<script lang="ts">
    import {fly, slide} from 'svelte/transition';
    import type {PageData} from './$types';

    export let data: PageData;
    const {html, selectedSkill} = data;
</script>

<!-- title -->
<header class="my-4 flex items-center gap-4">
    {#key selectedSkill}
        <img
            src={selectedSkill?.icon}
            alt={selectedSkill?.iconAlt}
            class="w-12 h-auto"
            in:fly={{delay: 300, x: '-100%'}}
            out:fly={{duration: 300, x: '-100%'}}
        />
        <hgroup
            in:fly={{delay: 300, y: '-100%'}}
            out:fly={{duration: 300, y: '-100%'}}
        >
            <h1 class="text-4xl my-0">
                {selectedSkill?.name}
            </h1>
            <p class="text-2xl my-0">
                {selectedSkill?.description}
            </p>
        </hgroup>
    {/key}
</header>
<!-- chips -->
<section class="flex w-min">
    {#key selectedSkill}
        <div
            class="
            flex justify-center items-center m-1 py-1 px-2 rounded-full h-min
            text-light-mantle dark:text-dark-mantle
        "
            class:bg-light-green={selectedSkill?.proficiency ===
                'Beginner'}
            class:bg-light-yellow={selectedSkill?.proficiency ===
                'Intermediate'}
            class:bg-light-red={selectedSkill?.proficiency ===
                'Skilled'}
            class:dark-bg-dark-green={selectedSkill?.proficiency ===
                'Beginner'}
            class:dark-bg-dark-yellow={selectedSkill?.proficiency ===
                'Intermediate'}
            class:dark-bg-dark-red={selectedSkill?.proficiency ===
                'Skilled'}
            in:fly={{delay: 200, x: '-100%'}}
            out:fly={{duration: 100, x: '-100%'}}
        >
            <p
                class="text-lg font-normal leading-none max-w-full flex-initial my-0"
            >
                {selectedSkill?.proficiency}
            </p>
        </div>

        <div
            class="
            flex justify-center items-center m-1 py-1 px-2 rounded-full h-min
            text-light-mantle dark:text-dark-mantle
        "
            class:bg-light-green={selectedSkill?.type === 'Language'}
            class:bg-light-yellow={selectedSkill?.type ===
                'Framework'}
            class:bg-light-sapphire={selectedSkill?.type ===
                'Frontend'}
            class:bg-light-maroon={selectedSkill?.type === 'Backend'}
            class:bg-light-blue={selectedSkill?.type === 'Tool'}
            class:bg-light-mauve={selectedSkill?.type === 'Other'}
            class:dark-bg-dark-green={selectedSkill?.type ===
                'Language'}
            class:dark-bg-dark-yellow={selectedSkill?.type ===
                'Framework'}
            class:dark-bg-dark-sapphire={selectedSkill?.type ===
                'Frontend'}
            class:dark-bg-dark-maroon={selectedSkill?.type ===
                'Backend'}
            class:dark-bg-dark-blue={selectedSkill?.type === 'Tool'}
            class:dark-bg-dark-mauve={selectedSkill?.type === 'Other'}
            in:fly={{delay: 350, x: '-100%'}}
            out:fly={{delay: 50, duration: 100, x: '-100%'}}
        >
            <p
                class="text-lg font-normal leading-none max-w-full flex-initial my-0"
            >
                {selectedSkill?.type}
            </p>
        </div>
    {/key}
</section>
<!-- experience/main content. Key is required for transitions -->
{#key selectedSkill}
    <section
        class="text-xl mt-4"
        in:slide={{axis: 'y', delay: 300}}
        out:slide={{axis: 'y', duration: 300}}
    >
        {@html html}
    </section>
{/key}
