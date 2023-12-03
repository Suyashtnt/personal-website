<script lang="ts">
	import type { PageData } from './$types';

	import BigSkill from './bigSkill.svelte';
	import Skill from './skill.svelte';

	export let data: PageData;
</script>

<section class="overflow-clip bg-light-surface-0 py-8 dark:bg-dark-surface_background md:px-8" id="about">
	<h2 class="w-min text-5xl text-light-lavender dark:text-dark-primary_foreground">Skills</h2>

	<div class="md:grid flex flex-col grid-cols-2 grid-rows-1 gap-4 overflow-hidden">
		<ul
			class="my-0 flex flex-col list-none gap-4 px-2 lg:px-0"
		>
			{#each data.skills as skill (skill.id)}
				<li
					class="rounded-xl bg-light-base dark:bg-dark-overlay_background"
				>
					<Skill {skill} />
				</li>
			{/each}
		</ul>

		{#key data.selectedSkill}
			<BigSkill {data} />
		{/key}
	</div>
</section>
