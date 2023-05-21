<script lang="ts">
	import { onMount } from 'svelte';
	import type { Picture } from 'vite-imagetools';

	interface PictureWithLQIP extends Picture {
		lqip: string;
	}

	export let src: string | PictureWithLQIP;
	export let alt: string;
	export let decoding: 'async' | 'sync' | 'auto' = 'auto';

	export let className = '';
	export { className as class };

	export let dominantColor = '#F8F8F8';
	export let loading: 'eager' | 'lazy' = 'lazy';

	// fade-in the image after it has loaded
	let image: HTMLImageElement;
	let hidden: boolean | undefined = undefined;

	onMount(() => {
		if (image.complete) return;
		image.onload = () => (hidden = false);
		if (hidden === undefined) hidden = true;
	});
</script>

<div
	style="{typeof src !== 'string' && src.lqip
		? `background-image: url(${src.lqip})`
		: `background-color: ${dominantColor}`};"
	class="img__placeholder {className}"
>
	{#if typeof src === 'string'}
		<img
			bind:this={image}
			class={className}
			class:hidden
			{src}
			{alt}
			{loading}
			{decoding}
		/>
	{:else}
		<picture class={className}>
			{#each Object.entries(src.sources) as [format, images]}
				<source
					srcset={images.map((i) => `${i.src} ${i.w}w`).join(', ')}
					type={'image/' + format}
				/>
			{/each}
			<img
				bind:this={image}
				class={className}
				class:hidden
				src={src.img.src}
				width={src.img.w}
				height={src.img.h}
				{alt}
				{loading}
				{decoding}
			/>
		</picture>
	{/if}
</div>

<style>
	.img__placeholder,
	img {
		width: 100%;
		height: auto;
	}

	.img__placeholder {
		height: min-content;
		background-size: cover;
		background-repeat: no-repeat;
		overflow: hidden;
	}

	img {
		display: block;
		transition: opacity 0.25s ease-out;
		object-fit: cover;

		/* hide alt text while image is loading */
		color: transparent;
	}

	.hidden {
		opacity: 0;
	}
</style>