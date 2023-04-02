<script context="module" lang="ts">
    export interface SkillsBlok extends SbBlokData {
        skills: SkillBlok[]
    }
</script>

<script lang="ts">
    import { renderRichText, storyblokEditable, type SbBlokData } from '@storyblok/svelte';
	import { flip } from 'svelte/animate';
	import { fly, slide } from 'svelte/transition';
	import Skill, { type SkillBlok } from './Skill.svelte';

    export let blok: SkillsBlok;

    let selectedSkillUid: SkillBlok['_uid'] = blok.skills[0]._uid

    $: selectedSkillNullable = blok.skills.find(skill => skill._uid === selectedSkillUid)
    $: selectedSkill = selectedSkillNullable ?? blok.skills[0]
    $: selectedSkillExperienceHTML = renderRichText(selectedSkill.experience)

    $: shownSkills = blok.skills.filter(skill => skill._uid !== selectedSkillUid)
</script>

<section
    class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
    use:storyblokEditable={blok}
>
    <ul class="list-none flex flex-col gap-4 my-0 px-4 lg:px-0">
        {#each shownSkills as skill (skill._uid)}
            <li animate:flip={{ duration: 200 }} class="rounded-xl">
                <Skill
                    blok={skill}
                    on:click={() => selectedSkillUid = skill._uid}
                />
            </li>
        {/each}
    </ul>
    <article
        use:storyblokEditable={selectedSkill}
        class="bg-light-mantle dark:bg-dark-mantle rounded-xl px-4 box-border pb-4 mx-2"
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
                class:bg-light-sapphire={selectedSkill.type === 'Frontend'}

                class:dark-bg-dark-green={selectedSkill.type === 'Language'}
                class:dark-bg-dark-yellow={selectedSkill.type === 'Framework'}
                class:dark-bg-dark-sapphire={selectedSkill.type === 'Frontend'}

                in:fly={{ x: '-100%', delay: 350 }}
                out:fly={{ x: '-100%', duration: 100, delay: 50 }}
            >
                <p class="text-lg font-normal leading-none max-w-full flex-initial my-0">
                    {selectedSkill.type}
                </p>
            </div>
            {/key}
        </section>
        <!-- experience/main content. Key is required for transitions -->
        {#key selectedSkill}
            <section class="text-xl mt-4" in:slide={{ axis: 'y', delay: 300 }} out:slide={{ axis: 'y', duration: 300 }}>
                        {@html selectedSkillExperienceHTML}
            </section>
        {/key}
    </article>
</section>
