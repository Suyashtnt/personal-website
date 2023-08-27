<script lang="ts">
    import type {LayoutData} from './$types';
    import Skill from './skill.svelte';
    import {page} from '$app/stores';

    export let data: LayoutData;

    $: skillsWithoutSelected = data.skills.filter(
        (skill) =>
            skill.id.toLowerCase() !==
            $page.params.skill?.toLowerCase()
    );
</script>

<section class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
    <ul class="list-none flex flex-col gap-4 my-0 px-2 lg:px-0">
        {#each skillsWithoutSelected as skill (skill.id)}
            <li class="rounded-xl" id="card" data-flip-id={skill.id}>
                <Skill {skill} href={`/skills/${skill.id}`} />
            </li>
        {/each}
    </ul>

    <slot />
</section>
