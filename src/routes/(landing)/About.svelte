<script lang="ts">
	import { autoHash } from '$lib/autohash';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import Projects from './about-sections/Projects.svelte';
	import Skills from './about-sections/Skills.svelte';
	import Games from './about-sections/Games.svelte';

	const sections = [
		{
			name: 'Skills',
			id: 'skills',
		},
		{
			name: 'Games',
			id: 'games',
		},
		{
			name: 'Projects',
			id: 'projects',
		},
	] as const;
	const sectionIDs = sections.map((section) => section.id);
	type sectionID = typeof sectionIDs[number];

	// check if $page.url.hash is a valid section
	$: parsedHash = $page.url.hash.slice(1) in sectionIDs ? $page.url.hash.slice(1) as unknown as sectionID : null;

	$: selectedSection = parsedHash || 'skills';

	$: sectionsWithSelected = sections.map((section) => ({
		...section,
		selected: section.id === selectedSection,
	}));
</script>

<div
	class="
		flex flex-col justify-around items-center gap-16 py-16
		bg-light-surface-0 dark:bg-dark-surface-0 lg:px-24
		"
	id="about"
	use:autoHash
>
	<div class="flex flex-col md:flex-row justify-around w-full gap-6 box-border px-4 lg:px-0">
		{#each sectionsWithSelected as section}
			<a
				class="
					text-7xl px-4 py-2 text-center flex-1
					rounded-xl border-none hover:cursor-pointer decoration-none
					bg-clip-text text-transparent visited:text-transparent
					bg-gradient-to-tr
					from-light-blue to-light-sapphire
					dark:from-dark-blue dark:to-dark-sapphire
				"
				class:bg-clip-unset={section.selected}

				class:text-light-surface-0={section.selected}
				class:dark-text-dark-surface-0={section.selected}

				class:visited-text-surface-0={section.selected}
				class:visited-dark-text-dark-surface-0={section.selected}

				id={section.id}
				href={`#${section.id}`}
				on:click|preventDefault={() => {
					selectedSection = section.id;
					goto(`#${section.id}`, { noScroll: true });
				}}
			>
				{section.name}
			</a>
		{/each}
	</div>
	<section class="w-full h-full overflow-y-hidden">
			{#if selectedSection === 'skills'}
				<section in:fly={{ x: '-100%', delay: 300 }} out:fly={{ x: '100%', duration: 300 }}>
					<Skills />
				</section>
			{:else if selectedSection === 'games'}
				<section in:fly={{ x: '-100%', delay: 300 }} out:fly={{ x: '100%', duration: 300 }}>
					<Games />
				</section>
			{:else if selectedSection === 'projects'}
				<section in:fly={{ x: '-100%', delay: 300 }} out:fly={{ x: '100%', duration: 300 }}>
					<Projects />
				</section>
			{/if}
	</section>
</div>
