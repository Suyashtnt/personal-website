<script lang="ts">
	import type { TransitionConfig } from 'svelte/transition';

	import type { PageData } from './$types';

	export let data: PageData;
	export let send: (node: Element, args: { key: string }) => () => TransitionConfig;
	export let receive: (node: Element, args: { key: string }) => () => TransitionConfig;

	const { html, selectedSkill } = data;
</script>

<article
	class="grid-area-[1/2/span_1/span_1] mx-2 box-border flex flex-col gap-4 rounded-xl bg-light-mantle p-4 dark:bg-dark-overlay_background"
	in:receive={{ key: `skill-${selectedSkill.id}` }}
	out:send={{ key: `leave-skill-${selectedSkill.id}` }}
>
	<!-- title -->
	<header class="flex items-center gap-4">
		<img alt={selectedSkill?.iconAlt} class="h-auto w-12" src={selectedSkill?.icon} />
		<hgroup>
			<h1 class="my-0 text-3xl">
				{selectedSkill?.name}
			</h1>
			<p class="my-0 text-xl">
				{selectedSkill?.description}
			</p>
		</hgroup>
	</header>
	<!-- chips -->
	<section class="w-min flex">
		<div
			class="m-1 h-5 flex items-center justify-center rounded-full bg-opacity-15 pa-3"
			class:bg-light-green={selectedSkill?.proficiency === 'Beginner'}
			class:bg-light-red={selectedSkill?.proficiency === 'Skilled'}
			class:bg-light-yellow={selectedSkill?.proficiency === 'Intermediate'}
			class:dark-bg-dark-base09={selectedSkill?.proficiency === 'Intermediate'}
			class:dark-bg-dark-base0A={selectedSkill?.proficiency === 'Skilled'}
			class:dark-bg-dark-base0B={selectedSkill?.proficiency === 'Beginner'}

			class:dark-text-dark-base09={selectedSkill?.proficiency === 'Intermediate'}
			class:dark-text-dark-base0A={selectedSkill?.proficiency === 'Skilled'}
			class:dark-text-dark-base0B={selectedSkill?.proficiency === 'Beginner'}
			class:text-light-green={selectedSkill?.proficiency === 'Beginner'}
			class:text-light-red={selectedSkill?.proficiency === 'Skilled'}
			class:text-light-yellow={selectedSkill?.proficiency === 'Intermediate'}
		>
			<p class="my-0 max-w-full flex-initial text-lg font-normal leading-none">
				{selectedSkill?.proficiency}
			</p>
		</div>

		<div
			class="m-1 h-5 flex items-center justify-center rounded-full bg-opacity-15 pa-3"
			class:bg-light-blue={selectedSkill?.type === 'Tool'}
			class:bg-light-green={selectedSkill?.type === 'Language'}
			class:bg-light-maroon={selectedSkill?.type === 'Backend'}
			class:bg-light-mauve={selectedSkill?.type === 'Other'}
			class:bg-light-sapphire={selectedSkill?.type === 'Frontend'}
			class:bg-light-yellow={selectedSkill?.type === 'Framework'}
			class:dark-bg-dark-base01={selectedSkill?.type === 'Other'}
			class:dark-bg-dark-base07={selectedSkill?.type === 'Frontend'}
			class:dark-bg-dark-base0A={selectedSkill?.type === 'Backend'}
			class:dark-bg-dark-base0B={selectedSkill?.type === 'Framework'}
			class:dark-bg-dark-base0C={selectedSkill?.type === 'Tool'}
			class:dark-bg-dark-base0E={selectedSkill?.type === 'Language'}

			class:dark-text-dark-base01={selectedSkill?.type === 'Other'}
			class:dark-text-dark-base07={selectedSkill?.type === 'Frontend'}
			class:dark-text-dark-base0A={selectedSkill?.type === 'Backend'}
			class:dark-text-dark-base0B={selectedSkill?.type === 'Framework'}
			class:dark-text-dark-base0C={selectedSkill?.type === 'Tool'}
			class:dark-text-dark-base0E={selectedSkill?.type === 'Language'}
			class:text-light-blue={selectedSkill?.type === 'Tool'}
			class:text-light-green={selectedSkill?.type === 'Language'}
			class:text-light-maroon={selectedSkill?.type === 'Backend'}
			class:text-light-mauve={selectedSkill?.type === 'Other'}
			class:text-light-sapphire={selectedSkill?.type === 'Frontend'}
			class:text-light-yellow={selectedSkill?.type === 'Framework'}
		>
			<p class="my-0 max-w-full flex-initial text-lg font-normal leading-none">
				{selectedSkill?.type}
			</p>
		</div>
	</section>
	<section class="text-lg">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html html}
	</section>
</article>
