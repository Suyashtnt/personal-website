<script lang="ts">
	import { autoHash } from '$lib/autohash';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Projects from './Projects.svelte';
	import { fly } from 'svelte/transition';
	import Skills from './Skills.svelte';
	import Games from './Games.svelte';

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
		bg-light-surface-0 dark:bg-dark-surface-0
		"
	id="about"
	use:autoHash
>
	<div class="flex justify-around w-full">
		{#each sectionsWithSelected as section}
		<a
			class="
				text-7xl px-4 pt-3 pb-5
				rounded-xl border-none hover:cursor-pointer
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
	<div class="w-full h-full">
			{#if selectedSection === 'skills'}
				<section class="lg:mx-24" in:fly={{ x: '-100%', delay: 300 }} out:fly={{ x: '100%', duration: 300 }}>
					<Skills />
				</section>
			{:else if selectedSection === 'games'}
				<section class="lg:mx-24" in:fly={{ x: '-100%', delay: 300 }} out:fly={{ x: '100%', duration: 300 }}>
					<Games />
				</section>
			{:else if selectedSection === 'projects'}
				<section class="lg:mx-24" in:fly={{ x: '-100%', delay: 300 }} out:fly={{ x: '100%', duration: 300 }}>
					<Projects />
				</section>
			{/if}
	</div>
</div>
