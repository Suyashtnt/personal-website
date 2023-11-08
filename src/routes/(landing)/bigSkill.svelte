<script lang="ts">
    import type { TransitionConfig } from 'svelte/transition';

    import type {PageData} from './$types';

    export let data: PageData;
    export let send: (node: Element, args: { key: string }) => ( ) => TransitionConfig
    export let receive: (node: Element, args: { key: string }) => ( ) => TransitionConfig

    const {html, selectedSkill} = data;
</script>

<article
    class="grid-area-[1/2/span_1/span_1] mx-2 box-border overflow-hidden rounded-xl bg-light-mantle px-4 pb-4 dark:bg-dark-mantle"
    in:receive={{key: `skill-${selectedSkill.id}`}}
    out:send={{key: `skill-${selectedSkill.id}`}}
>
    <!-- title -->
    <header class="my-4 flex items-center gap-4">
        <img
            alt={selectedSkill?.iconAlt}
            class="h-auto w-12"
            in:receive={{key: `img-${selectedSkill.id}`}}
            out:send={{key: `img-${selectedSkill.id}`}}
            src={selectedSkill?.icon}
        />
        <hgroup>
            <h1
                class="my-0 text-3xl"
                in:receive={{key: `text-${selectedSkill.id}`}}
                out:send={{key: `text-${selectedSkill.id}`}}
            >
                {selectedSkill?.name}
            </h1>
            <p class="my-0 text-xl">
                {selectedSkill?.description}
            </p>
        </hgroup>
    </header>
    <!-- chips -->
    <section class="w-min flex">
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
            >
                <p
                    class="my-0 max-w-full flex-initial text-lg font-normal leading-none"
                >
                    {selectedSkill?.type}
                </p>
            </div>
    </section>
    <section
        class="mt-4 text-lg"
    >
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html html}
    </section>
</article>
