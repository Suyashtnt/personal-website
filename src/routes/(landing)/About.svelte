<script lang="ts">
	import { autoHash } from '$lib/autohash';

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
			name: 'Sample Text',
			id: 'sample-text',
		},
	] as const;
	let selectedSection: typeof sections[number]['id'] = 'skills';

	$: sectionsWithSelected = sections.map((section) => ({
		...section,
		selected: section.id === selectedSection,
	}));
</script>

<section
	class="flex flex-col md:flex-row justify-around items-center bg-light-surface-0 dark:bg-dark-surface-0 py-16"
	id="about"
	use:autoHash
>
	<div class="flex justify-around w-full">
		{#each sectionsWithSelected as section}
		<button
			class="
				text-7xl
				bg-gradient-to-tr from-light-sapphire to-light-lavender dark:from-dark-sapphire dark:to-light-lavender
				bg-clip-text text-transparent
				rounded-xl border-none hover:cursor-pointer
			"
			class:bg-clip-unset={section.selected}
			class:text-light-text={section.selected}
			class:dark-text-dark-text={section.selected}
			on:click={() => {
				selectedSection = section.id;
			}}
		>
			{section.name}
		</button>
		{/each}
	</div>
</section>

<style>
	:global(.tagcloud--item) {
		--at-apply: 'text-2xl cursor-pointer text-light-text dark-text-dark-text underline underline-light-blue dark-underline-dark-blue hover-text-3xl hover-text-light-blue dark-hover-text-dark-blue transition-all';
	}
</style>
