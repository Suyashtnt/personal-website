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
	class="mx:2 box:border flex flex:1 flex-basis:70ch flex:col gap:4x r:4x bg:overlay p:4x"
>
	<header class="flex align-items:center gap:4x">
		<img alt={selectedSkill?.iconAlt} class="square h:auto w:16x" src={selectedSkill?.icon} />
		<hgroup>
			<h1 class="my:0 text:7x line-height:0">
				{selectedSkill?.name}
			</h1>
			<p class="my:0 text:6x line-height:0">
				{selectedSkill?.description}
			</p>
		</hgroup>
	</header>

	<!-- chips -->
	<section class="w-min flex">
		<div
			class="m:1x h:8x flex place-items:center r:4x p:3x opacity:.8"
      class:bg:green={selectedSkill?.proficiency === 'Beginner'}
			class:bg:red={selectedSkill?.proficiency === 'Skilled'}
			class:bg:yellow={selectedSkill?.proficiency === 'Intermediate'}
		>
			<p class="my:0 text:5x fg:black">
				{proficiency}
			</p>
		</div>

		<div
			class="m:1x h:8x flex place-items:center r:4x p:3x"
			class:bg:blue={selectedSkill?.type === 'Tool'}
			class:bg:green={selectedSkill?.type === 'Language'}
			class:bg:purple={selectedSkill?.type === 'Backend'}
			class:bg:mauve={selectedSkill?.type === 'Other'}
			class:bg:teal={selectedSkill?.type === 'Frontend'}
			class:bg:orange={selectedSkill?.type === 'Framework'}
    >
			<p class="my:0 text:5x fg:black">
				{type}
			</p>
		</div>
	</section>
	<section class="text:5x">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html html}
	</section>
</article>
