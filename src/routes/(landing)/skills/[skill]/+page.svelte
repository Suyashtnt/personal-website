<script lang="ts">
    import {fly, slide} from 'svelte/transition';

    import type {PageData} from './$types';

    export let data: PageData;
    const {html, selectedSkill} = data;
</script>

<article
    class="mx-2 box-border overflow-hidden rounded-xl bg-light-mantle px-4 pb-4 dark:bg-dark-mantle"
    data-flip-id={selectedSkill.id}
    id="card"
>
    <!-- title -->
    <header class="my-4 flex items-center gap-4">
        {#key selectedSkill}
            <img
                alt={selectedSkill?.iconAlt}
                class="h-auto w-12"
                in:fly={{delay: 300, x: '-100%'}}
                out:fly={{duration: 300, x: '-100%'}}
                src={selectedSkill?.icon}
            />
            <hgroup
                in:fly={{delay: 300, y: '-100%'}}
                out:fly={{duration: 300, y: '-100%'}}
            >
                <h1 class="my-0 text-3xl">
                    {selectedSkill?.name}
                </h1>
                <p class="my-0 text-xl">
                    {selectedSkill?.description}
                </p>
            </hgroup>
        {/key}
    </header>
    <!-- chips -->
    <section class="w-min flex">
        {#key selectedSkill}
            <div
                class="m-1 h-5 flex items-center justify-center rounded-full px-2 py-1 text-light-mantle dark:text-dark-mantle"
                class:bg-light-green={selectedSkill?.proficiency ===
                    'Beginner'}
                class:bg-light-red={selectedSkill?.proficiency ===
                    'Skilled'}
                class:bg-light-yellow={selectedSkill?.proficiency ===
                    'Intermediate'}
                class:dark-bg-dark-green={selectedSkill?.proficiency ===
                    'Beginner'}
                class:dark-bg-dark-red={selectedSkill?.proficiency ===
                    'Skilled'}
                class:dark-bg-dark-yellow={selectedSkill?.proficiency ===
                    'Intermediate'}
                in:fly={{delay: 200, x: '-100%'}}
                out:fly={{duration: 100, x: '-100%'}}
            >
                <p
                    class="my-0 max-w-full flex-initial text-lg font-normal leading-none"
                >
                    {selectedSkill?.proficiency}
                </p>
            </div>

            <div
                class="m-1 h-5 flex items-center justify-center rounded-full px-2 py-1 text-light-mantle dark:text-dark-mantle"
                class:bg-light-blue={selectedSkill?.type === 'Tool'}
                class:bg-light-green={selectedSkill?.type ===
                    'Language'}
                class:bg-light-maroon={selectedSkill?.type ===
                    'Backend'}
                class:bg-light-mauve={selectedSkill?.type === 'Other'}
                class:bg-light-sapphire={selectedSkill?.type ===
                    'Frontend'}
                class:bg-light-yellow={selectedSkill?.type ===
                    'Framework'}
                class:dark-bg-dark-blue={selectedSkill?.type ===
                    'Tool'}
                class:dark-bg-dark-green={selectedSkill?.type ===
                    'Language'}
                class:dark-bg-dark-maroon={selectedSkill?.type ===
                    'Backend'}
                class:dark-bg-dark-mauve={selectedSkill?.type ===
                    'Other'}
                class:dark-bg-dark-sapphire={selectedSkill?.type ===
                    'Frontend'}
                class:dark-bg-dark-yellow={selectedSkill?.type ===
                    'Framework'}
                in:fly={{delay: 350, x: '-100%'}}
                out:fly={{delay: 50, duration: 100, x: '-100%'}}
            >
                <p
                    class="my-0 max-w-full flex-initial text-lg font-normal leading-none"
                >
                    {selectedSkill?.type}
                </p>
            </div>
        {/key}
    </section>
    <!-- experience/main content. Key is required for transitions -->
    {#key selectedSkill}
        <section
            class="mt-4 text-lg"
            in:slide={{axis: 'y', delay: 300}}
            out:slide={{axis: 'y', duration: 300}}
        >
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html html}
        </section>
    {/key}
</article>
