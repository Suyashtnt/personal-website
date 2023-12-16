<script lang="ts">
	import { type TableOfContentsElements, type TableOfContentsItem, melt } from '@melt-ui/svelte';

	export let tree: TableOfContentsItem[] = [];
	export let activeHeadingIdxs: number[];
	export let item: TableOfContentsElements['item'];
	export let level = 1;
</script>

<ol class="counter-reset-item list-none text-lg" class:pl-0={level === 1} class:pl-4={level > 1}>
	{#if tree && tree.length}
		{#each tree as heading, i (i)}
			<li class="mt-0 pt-2">
				<!-- according to catppuccin style guidelines: red, peach, yellow, green, sapphire, Lavender -->
				<a
					class="relative inline-block text-inherit decoration-none after:absolute after:bottom-0 after:block after:h-0.5 after:w-0 after:bg-none after:bg-scroll after:bg-repeat before:text-light-text after:transition-all after:content-empty data-[active]:after:w-full hover:after:w-full dark:before:text-dark-base_foreground"
					class:after-bg-light-green={level === 4}
					class:after-bg-light-lavender={level === 6}
					class:after-bg-light-peach={level === 2}
					class:after-bg-light-red={level === 1}
					class:after-bg-light-sapphire={level === 5}
					class:after-bg-light-yellow={level === 3}
					class:after-dark-bg-dark-green={level === 4}
					class:after-dark-bg-dark-lavender={level === 6}
					class:after-dark-bg-dark-primary_foreground={level === 1}
					class:after-dark-bg-dark-red={level === 2}
					class:after-dark-bg-dark-teal={level === 5}
					class:after-dark-bg-dark-yellow={level === 3}
					class:dark-text-dark-green={level === 4}
					class:dark-text-dark-lavender={level === 6}
					class:dark-text-dark-orange={level === 3}
					class:dark-text-dark-primary_foreground={level === 1}
					class:dark-text-dark-red={level === 2}
					class:dark-text-dark-teal={level === 5}
					class:text-light-green={level === 4}
					class:text-light-lavender={level === 6}
					class:text-light-peach={level === 2}
					class:text-light-red={level === 1}
					class:text-light-sapphire={level === 5}
					class:text-light-yellow={level === 3}
					class:visited-dark-text-dark-green={level === 4}
					class:visited-dark-text-dark-lavender={level === 6}
					class:visited-dark-text-dark-orange={level === 3}
					class:visited-dark-text-dark-primary_foreground={level === 1}
					class:visited-dark-text-dark-red={level === 2}
					class:visited-dark-text-dark-teal={level === 5}
					class:visited-text-light-green={level === 4}
					class:visited-text-light-lavender={level === 6}
					class:visited-text-light-red={level === 1}
					class:visited-text-light-sapphire={level === 5}
					class:visited-text-light-yellow={level === 3}
					href="#{heading.id}"
					use:melt={$item(heading.id)}
				>
					{heading.title}
				</a>
			</li>
			{#if heading.children && heading.children.length}
				<li>
					<svelte:self
						{activeHeadingIdxs}
						{item}
						level={level + 1}
						tree={heading.children}
					/>
				</li>
			{/if}
		{/each}
	{/if}
</ol>

<style>
	.counter-reset-item {
		counter-reset: item;
	}

	a:before {
		content: counters(item, '.') '. ';
		counter-increment: item;
		display: inline;
	}
</style>
