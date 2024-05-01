<script lang="ts">
	import { type TableOfContentsElements, type TableOfContentsItem, melt } from '@melt-ui/svelte';

	const {
		item,
		level = 1,
		tree
	}: {
		item: TableOfContentsElements['item'];
		level?: number;
		tree: TableOfContentsItem[];
	} = $props();
</script>

<ol
	class="text:4x counter-reset:item list-style:none"
	class:pl:0={level === 1}
	class:pl:4x={level > 1}
>
	{#if tree && tree.length}
		{#each tree as heading, i (i)}
			<li class="pt-2x">
				<a
					class="relative absolute::after ~all::after block:after ~duration:300::after bg:repeat::after bg:scroll::after bg:none::after bottom:0::after h:1:after text:none w:full:hover::after w:0::after w:full[data-active]::after"
					class:bg:blue::after={level === 6}
					class:bg:purple::after={level === 1}
					class:bg:purple::after={level === 2}
					class:bg:red::after={level === 3}
					class:bg:teal::after={level === 5}
					class:bg:yellow::after={level === 4}
					class:fg:blue:hover={level === 6}
					class:fg:blue:visited:hover={level === 2}
					class:fg:blue:visited:hover={level === 6}
					class:fg:purple:hover={level === 1}
					class:fg:purple:hover={level === 2}
					class:fg:purple:visited:hover={level === 1}
					class:fg:red:hover={level === 3}
					class:fg:red:visited:hover={level === 3}
					class:fg:teal:hover={level === 5}
					class:fg:teal:visited:hover={level === 5}
					class:fg:yellow:hover={level === 4}
					class:fg:yellow:visited:hover={level === 4}
					href={`#${heading.id}`}
					use:melt={$item(heading.id)}
				>
					{heading.title}
				</a>
			</li>
			{#if heading.children && heading.children.length}
				<li>
					<svelte:self {item} level={level + 1} tree={heading.children} />
				</li>
			{/if}
		{/each}
	{/if}
</ol>

<style>
	a::before {
		content: counters(item, '.') '. ';
		counter-increment: item;
		display: inline;
	}

	a::after {
		content: ' ';
	}
</style>
