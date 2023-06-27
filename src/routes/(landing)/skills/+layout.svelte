<script lang="ts">
    import type {LayoutData} from './$types';
    import Skill from './skill.svelte';

    export let data: LayoutData;
</script>

<section class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
    <ul class="list-none flex flex-col gap-4 my-0 px-2 lg:px-0">
        {#each data.skills as skill (skill.name)}
            <li class="rounded-xl">
                <Skill {skill} href={`/skills/${skill.name}`} />
            </li>
        {/each}
    </ul>

    <article
        class="bg-light-mantle dark:bg-dark-mantle rounded-xl px-4 box-border pb-4 mx-2 overflow-hidden"
    >
        <slot />
    </article>
</section>
