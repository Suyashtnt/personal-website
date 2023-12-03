<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { html, selectedSkill } = data;
</script>

<article
	class="mx-2 box-border flex flex-col gap-4 rounded-xl bg-light-mantle p-4 dark:bg-dark-overlay_background"
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
			class="m-1 h-5 flex items-center justify-center rounded-full pa-3"
            class:bg-light-green={selectedSkill?.proficiency === 'Beginner'}
			class:bg-light-red={selectedSkill?.proficiency === 'Skilled'}
			class:bg-light-yellow={selectedSkill?.proficiency === 'Intermediate'}
			class:dark-bg-dark-base09={selectedSkill?.proficiency === 'Intermediate'}
			class:dark-bg-dark-base0B={selectedSkill?.proficiency === 'Beginner'}
			class:dark-bg-dark-red={selectedSkill?.proficiency === 'Skilled'}
			class:dark-text-dark-base09={selectedSkill?.proficiency === 'Intermediate'}

			class:dark-text-dark-base0B={selectedSkill?.proficiency === 'Beginner'}
			class:dark-text-dark-red={selectedSkill?.proficiency === 'Skilled'}
			class:text-light-green={selectedSkill?.proficiency === 'Beginner'}
			class:text-light-red={selectedSkill?.proficiency === 'Skilled'}
			class:text-light-yellow={selectedSkill?.proficiency === 'Intermediate'}
			style="--un-bg-opacity: 15%;"
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
			class:dark-bg-dark-base0B={selectedSkill?.type === 'Framework'}
			class:dark-bg-dark-base0C={selectedSkill?.type === 'Tool'}
			class:dark-bg-dark-base0E={selectedSkill?.type === 'Language'}
			class:dark-bg-dark-red={selectedSkill?.type === 'Backend'}
			class:dark-text-dark-base01={selectedSkill?.type === 'Other'}

			class:dark-text-dark-base07={selectedSkill?.type === 'Frontend'}
			class:dark-text-dark-base0B={selectedSkill?.type === 'Framework'}
			class:dark-text-dark-base0C={selectedSkill?.type === 'Tool'}
			class:dark-text-dark-base0E={selectedSkill?.type === 'Language'}
			class:dark-text-dark-red={selectedSkill?.type === 'Backend'}
			class:text-light-blue={selectedSkill?.type === 'Tool'}
			class:text-light-green={selectedSkill?.type === 'Language'}
			class:text-light-maroon={selectedSkill?.type === 'Backend'}
			class:text-light-mauve={selectedSkill?.type === 'Other'}
			class:text-light-sapphire={selectedSkill?.type === 'Frontend'}
			class:text-light-yellow={selectedSkill?.type === 'Framework'}
			style="--un-bg-opacity: 15%;"
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
