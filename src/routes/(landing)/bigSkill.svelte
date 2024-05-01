<script lang="ts">
	import * as m from '$i18n/messages';

	import type { PageData } from './$types';

  interface Props {
      data: PageData
  }
  const { data }: Props = $props();
	const { html, selectedSkill } = $derived(data);

    const getProficiency = () => {
        switch (data.selectedSkill.proficiency) {
            case 'Beginner':
                return m.skill_beginner()
            case 'Intermediate':
                return m.skill_intermediate()
            case 'Skilled':
                return m.skill_skilled()
        }
    }

    const getType = () => {
        switch (data.selectedSkill.type) {
            case 'Backend':
                return m.skill_backend()
            case 'Framework':
                return m.skill_framework()
            case 'Frontend':
                return m.skill_frontend()
            case 'Language':
                return m.skill_language()
            case 'Other':
                return m.skill_other()
            case 'Tool':
                return m.skill_tool()
        }
    }

    const proficiency = $derived(getProficiency())
    const type = $derived(getType())
</script>

<article
	class="flex bg:overlay box:border flex-basis:70ch flex:1 flex:col gap:4x mx:2 p:4x r:4x"
>
	<header class="flex align-items:center gap:4x">
		<img alt={selectedSkill?.iconAlt} class="square h:auto w:16x" src={selectedSkill?.icon} />
		<hgroup>
			<h1 class="text:7x line-height:0 my:0">
				{selectedSkill?.name}
			</h1>
			<p class="text:6x line-height:0 my:0">
				{selectedSkill?.description}
			</p>
		</hgroup>
	</header>

	<!-- chips -->
	<section class="w-min flex">
		<div
			class="flex h:8x m:1x opacity:.8 p:3x place-items:center r:4x"
      class:bg:green={selectedSkill?.proficiency === 'Beginner'}
			class:bg:red={selectedSkill?.proficiency === 'Skilled'}
			class:bg:yellow={selectedSkill?.proficiency === 'Intermediate'}
		>
			<p class="text:5x fg:black my:0">
				{proficiency}
			</p>
		</div>

		<div
			class="flex h:8x m:1x p:3x place-items:center r:4x"
			class:bg:blue={selectedSkill?.type === 'Tool'}
			class:bg:green={selectedSkill?.type === 'Language'}
			class:bg:mauve={selectedSkill?.type === 'Other'}
			class:bg:orange={selectedSkill?.type === 'Framework'}
			class:bg:purple={selectedSkill?.type === 'Backend'}
			class:bg:teal={selectedSkill?.type === 'Frontend'}
    >
			<p class="text:5x fg:black my:0">
				{type}
			</p>
		</div>
	</section>
	<section class="text:5x">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html html}
	</section>
</article>
