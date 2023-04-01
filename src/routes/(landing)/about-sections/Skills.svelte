<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly, slide } from 'svelte/transition';

    interface Skill {
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

    const skills = [
        {
            name: 'Svelte',
            description: 'Cybernetically enhanced web apps',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg',
            iconAlt: 'Svelte Logo',
            url: 'https://svelte.dev/',
            experience: `
                I've been using svelte for about 4 years now.
                From this personal website to 37 Ocean Breeze, it's been an absolute blast to use.
                [I should make this longer, but that will come later™]
            `,
            proficiency: 'Skilled',
            type: 'Framework'
        },
        {
            name: 'Rust',
            description: 'Empowering everyone to build reliable and efficient software.',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg',
            iconAlt: 'Rust Logo',
            url: 'https://www.rust-lang.org/',
            experience: `
                I've been using Rust for about 3 years now.
                I've used it for a few projects, including Glowsquid, copper, and chesscord.
                It's possibly my favorite language to use because of its sheer speed and safety guarantees.
                I am yet to use it in some sort of production environment, nor go into its dark arts of unsafe code.
            `,
            proficiency: 'Intermediate',
            type: 'Language'
        },
        {
            name: 'TypeScript',
            description: 'Typed superset of JavaScript',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
            iconAlt: 'TypeScript Logo',
            url: 'https://www.typescriptlang.org/',
            experience: `
                I've been using TypeScript for about 5 years now. Just a few months after I started using JavaScript.
                It makes JavaScript actually bearable to use, and I've used it for a few projects, including this website.
            `,
            proficiency: 'Skilled',
            type: 'Language'
        },
        {
            name: 'Deno',
            description: 'The easiest, most secure JavaScript runtime.',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Deno_2021.svg',
            iconAlt: 'Deno Logo',
            url: 'https://deno.land/',
            experience: `
                I've been using Deno for about 2 years now, although only basic scripts.
                I'm yet to use it for anything big, but it seems like a great alternative to Node.js.
            `,
            proficiency: 'Beginner',
            type: 'Framework'
        }
    ] as const satisfies readonly Skill[]

    let selectedSkillName: typeof skills[number]['name'] = skills[0].name
    $: selectedSkill = skills.filter(skill => skill.name === selectedSkillName)[0]
    $: shownSkills = skills.filter(skill => skill.name !== selectedSkillName)
</script>

<section
    class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full
            ring-4 ring-offset-8 rounded-lg
            ring-offset-light-surface-0 dark:ring-offset-dark-surface-0
            ring-light-blue dark:ring-dark-blue
">
    <ul class="list-none flex flex-col gap-4 my-0 pl-0">
        {#each shownSkills as skill (skill.name)}
            <li
                animate:flip={{ duration: 200 }}
                class="transition-all duration-200 hover:shadow-md ring-0"
            >
                <button
                    class="
                        pa-3 w-full flex gap-4 items-center
                        rounded-xl border-none
                        text-light-text dark:text-dark-text
                        bg-light-base dark:bg-dark-base
                    "
                    on:click={() => selectedSkillName = skill.name}
                >
                    <img
                        src={skill.icon}
                        alt={skill.iconAlt}
                        class="w-10 h-auto"
                    >

                    <h2
                        class="text-2xl"
                    >
                        {skill.name}
                    </h2>
                </button>
            </li>
        {/each}
    </ul>
    <article
        class="bg-light-mantle dark:bg-dark-mantle rounded-xl px-4 box-border"
    >
        <!-- title -->
        <header class="my-4 flex items-center gap-4">
            {#key selectedSkill}
                <img
                    src={selectedSkill.icon}
                    alt={selectedSkill.iconAlt}
                    class="w-12 h-auto"
                    in:fly={{ x: '-100%', delay: 300 }}
                    out:fly={{ x: '-100%', duration: 300 }}
                >
                <hgroup
                    in:fly={{ y: '-100%', delay: 300 }}
                    out:fly={{ y: '-100%', duration: 300 }}
                >
                    <h1
                        class="text-4xl my-0"
                    >
                        {selectedSkill.name}
                    </h1>
                    <p class="text-2xl my-0">
                        {selectedSkill.description}
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

                class:bg-light-green={selectedSkill.proficiency === 'Beginner'}
                class:bg-light-yellow={selectedSkill.proficiency === 'Intermediate'}
                class:bg-light-red={selectedSkill.proficiency === 'Skilled'}

                class:dark-bg-dark-green={selectedSkill.proficiency === 'Beginner'}
                class:dark-bg-dark-yellow={selectedSkill.proficiency === 'Intermediate'}
                class:dark-bg-dark-red={selectedSkill.proficiency === 'Skilled'}

                in:fly={{ x: '-100%', delay: 200 }}
                out:fly={{ x: '-100%', duration: 100 }}
            >
                <p class="text-lg font-normal leading-none max-w-full flex-initial my-0">
                    {selectedSkill.proficiency}
                </p>
            </div>

            <div
                class="
                    flex justify-center items-center m-1 py-1 px-2 rounded-full h-min
                    text-light-mantle dark:text-dark-mantle
                "

                class:bg-light-green={selectedSkill.type === 'Language'}
                class:bg-light-yellow={selectedSkill.type === 'Framework'}

                class:dark-bg-dark-green={selectedSkill.type === 'Language'}
                class:dark-bg-dark-yellow={selectedSkill.type === 'Framework'}

                in:fly={{ x: '-100%', delay: 350 }}
                out:fly={{ x: '-100%', duration: 100, delay: 50 }}
            >
                <p class="text-lg font-normal leading-none max-w-full flex-initial my-0">
                    {selectedSkill.type}
                </p>
            </div>
            {/key}
        </section>
        <!-- experience/main content -->
        <section class="text-xl mt-4">
            {#key selectedSkill}
                <p class="my-0" in:slide={{ axis: 'y', delay: 300 }} out:slide={{ axis: 'y', duration: 300 }}>
                    {selectedSkill.experience}
                </p>
            {/key}
        </section>
    </article>
</section>
