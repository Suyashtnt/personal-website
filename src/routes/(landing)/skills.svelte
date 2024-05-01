<script lang="ts">
	import type { PageData } from './$types';

	import BigSkill from './bigSkill.svelte';
	import Skill from './skill.svelte';

  interface Props {
      data: PageData
  }
  const { data }: Props = $props();
</script>

<section class="bg:surface overflow:clip py:4x" id="about">
	<h2 class="text:8x fg:primary ml:4x ml:8x@md w:min">Skills</h2>

	<div class="flex flex:col flex:row@md gap:4x overflow:hidden px:6x">
		<ul
			class="flex flex-basis:50% flex:col gap:4x list-style:none my:0 pl:0"
		>
			{#each data.skills as skill (skill.id)}
				<li class="bg:overlay r:4x">
		       {#key data.selectedSkill}
					    <Skill isSelected={skill.id === data.selectedSkill.id} {skill} />
		       {/key}
				</li>
			{/each}
		</ul>

		{#key data.selectedSkill}
			<BigSkill {data} />
		{/key}
	</div>
</section>
