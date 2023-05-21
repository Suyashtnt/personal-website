<script lang="ts">
	import type { PageData } from './$types';
	import type { SvelteComponentTyped } from 'svelte/internal';
	import PageHead from '$lib/components/PageHead.svelte';

	export let data: PageData;

	type C = $$Generic<typeof SvelteComponentTyped<unknown, unknown, unknown>>;
	$: component = data.component as unknown as C;
</script>

<PageHead title={data.frontmatter.title} description={data.frontmatter.description} />

<div class="flex items-center justify-center">
    <article class="text-base prose prose-light-text dark:prose-dark-text xl:text-xl w-full">
        <svelte:component this={component} />
    </article>
</div>
