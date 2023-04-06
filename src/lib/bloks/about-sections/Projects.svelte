<script context="module" lang="ts">
    export interface ProjectsBlok extends SbBlokData {
        projects: ProjectBlok[]
    }
</script>

<script lang="ts">
    import { storyblokEditable, type SbBlokData } from "@storyblok/svelte"
    import Project from "./Project.svelte";
    import type { ProjectBlok } from "./Project.svelte";

    export let blok: ProjectsBlok;
</script>

<div
    class="
        rounded-xl md:pa-2
        projects
        "
    use:storyblokEditable={blok}
>
    {#each blok.projects as project (project._uid)}
        <Project blok={project} />
    {/each}
</div>

<style>
/* stolen from https://css-tricks.com/an-auto-filling-css-grid-with-max-columns/ */
.projects {
    /**
    * User input values.
    */
    --grid-layout-gap: 1rem;
    --grid-column-count: 6;
    --grid-item--min-width: 400px;

    /**
    * Calculated values.
    */
    --gap-count: calc(var(--grid-column-count) - 1);
    --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
    --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
    grid-gap: var(--grid-layout-gap);
}
</style>