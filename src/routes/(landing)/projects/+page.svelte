<script lang="ts">
	import Project, { type IProject } from './Project.svelte';

	let projects: IProject[] = [
		{
			name: 'Personal website',
			description: 'This very website!',
			url: 'https://github.com/suyashtnt/personal-website'
		},
		{
			name: 'Glowsquid',
			description: '[WIP] Next-generation minecraft launcher',
			url: 'https://github.com/glowsquid-launcher/glowsquid-new'
		},
		{
			name: 'Commafiles',
			description: 'My NixOS configuration',
			url: 'https://github.com/suyashtnt/commafiles'
		},
		{
			name: 'Copper',
			description: '[WIP] Minecraft launching rust crate',
			url: 'https://github.com/glowsquid-launcher/copper'
		},
		{
			name: 'Afr School Website',
			description: 'Small website I made for a bit of my grade 8 Afrikaans and LO projects',
			url: 'https://afr-school-website.vercel.app'
		},
		{
			name: 'FizzBuzz',
			description: '🚀A blazingly fast fizzbuzz implementation in rust🚀',
			url: 'https://github.com/Suyashtnt/fizzbuzz'
		}
	];
</script>

<ul class="rounded-xl md:pa-2 projects list-none">
	{#each projects as project (project.name)}
		<li>
			<Project {project} />
		</li>
	{/each}
</ul>

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
		grid-template-columns: repeat(
			auto-fill,
			minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
		);
		grid-gap: var(--grid-layout-gap);
	}
</style>
