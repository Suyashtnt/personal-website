<script lang="ts">
	import type { PageData } from './$types';

	import BigSkill from './bigSkill.svelte';
	import Skill from './skill.svelte';

  interface Props {
      data: PageData
  }
  const { data }: Props = $props();
</script>

<section class="bg:surface by:2|overlay" id="about">
	<h2 class="fg:primary ml:4x ml:8x@md text:9x w:min my:2x">Skills</h2>

	<div class="flex flex:col@<md gap:4x px:6x pb:4x">
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
