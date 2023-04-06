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
		grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4
		"
    use:storyblokEditable={blok}
>
	{#each blok.projects as project (project._uid)}
		<Project blok={project} />
	{/each}
</div>