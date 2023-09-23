<script lang="ts">
    import {page} from '$app/stores';

    import type {LayoutData} from './$types';

    import Skill from './skill.svelte';

    export let data: LayoutData;

    $: skillsWithoutSelected = data.skills.filter(
        (skill) =>
            skill.id.toLowerCase() !==
            $page.params.skill?.toLowerCase()
    );
</script>

<section class="grid grid-cols-1 w-full gap-4 md:grid-cols-2">
    <ul class="my-0 flex flex-col list-none gap-4 px-2 lg:px-0">
        {#each skillsWithoutSelected as skill (skill.id)}
            <li class="rounded-xl" data-flip-id={skill.id} id="card">
                <Skill href={`/skills/${skill.id}`} {skill} />
            </li>
        {/each}
    </ul>

    <slot />
</section>
