<script lang="ts">
	import type { PageData } from './$types';

	import BigSkill from './bigSkill.svelte';
	import Skill from './skill.svelte';

  interface Props {
      data: PageData
  }
  const { data }: Props = $props();
</script>

<section class="overflow:clip bg:surface py:4x" id="about">
	<h2 class="ml:4x w:min text:8x fg:primary ml:8x@md">Skills</h2>

	<div class="flex flex:col gap:4x overflow:hidden flex:row@md px:6x">
		<ul
			class="my:0 flex flex-basis:50% flex:col list-style:none gap:4x pl:0"
		>
			{#each data.skills as skill (skill.id)}
				<li class="r:4x bg:overlay">
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
