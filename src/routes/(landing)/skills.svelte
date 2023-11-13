<script lang="ts">
	import { page } from '$app/stores';
	import { containerTransform, easeEmphasized } from 'm3-svelte';
	import { flip } from 'svelte/animate';

	import type { PageData } from './$types';

	import BigSkill from './bigSkill.svelte';
	import Skill from './skill.svelte';

	export let data: PageData;

	$: skillsWithoutSelected = data.skills.filter(
		(skill) => skill.id !== $page.url.searchParams.get('skill')
	);

	const [_send, _receive] = containerTransform({
		duration: 1200,
		easing: easeEmphasized
	});

	const send = _send!;
	const receive = _receive!;
</script>

<section class="overflow-clip bg-light-surface-0 py-8 dark:bg-dark-surface-0 md:px-8" id="about">
	<h1 class="text-5xl">Skills</h1>

	<div class="grid grid-cols-2 grid-rows-1 gap-4 overflow-hidden">
		<ul
			class="grid-area-[1/1/span_1/span_1] my-0 flex flex-col list-none gap-4 overflow-hidden px-2 lg:px-0"
		>
			{#each skillsWithoutSelected as skill (skill.id)}
				<li
					animate:flip={{ duration: 600, easing: easeEmphasized }}
					class="rounded-xl bg-light-base dark:bg-dark-base"
					in:receive={{ key: `leave-skill-${skill.id}` }}
					out:send={{ key: `skill-${skill.id}` }}
				>
					<Skill {skill} />
				</li>
			{/each}
		</ul>

		{#key skillsWithoutSelected}
			<BigSkill {data} {receive} {send} />
		{/key}
	</div>
</section>
