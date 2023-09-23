<script lang="ts">
    import type {Picture} from 'vite-imagetools';

    import {onMount} from 'svelte';

    interface PictureWithLQIP extends Picture {
        lqip: string;
    }

    export let src: PictureWithLQIP | string;
    export let alt: string;
    export let decoding: 'async' | 'auto' | 'sync' = 'auto';

    export let className = '';
    export {className as class};

    export let dominantColor = '#F8F8F8';
    export let loading: 'eager' | 'lazy' = 'lazy';

    // eslint-disable-next-line no-undef
    let image: HTMLImageElement;
    let hidden: boolean | undefined;

    onMount(() => {
        if (image.complete) return;
        image.addEventListener('load', () => {
            hidden = false;
        });
        if (hidden === undefined) hidden = true;
    });
</script>

<div
    class="img__placeholder{className}"
    style="{typeof src !== 'string' && src.lqip
        ? `background-image: url(${src.lqip})`
        : `background-color: ${dominantColor}`};"
>
    {#if typeof src === 'string'}
        <img
            {alt}
            bind:this={image}
            class={className}
            class:hidden
            {decoding}
            {loading}
            {src}
        />
    {:else}
        <picture class={className}>
            {#each Object.entries(src.sources) as [format, images]}
                <source
                    srcset={images
                        .map((i) => `${i.src} ${i.w}w`)
                        .join(', ')}
                    type={'image/' + format}
                />
            {/each}
            <img
                {alt}
                bind:this={image}
                class={className}
                class:hidden
                {decoding}
                height={src.img.h}
                {loading}
                src={src.img.src}
                width={src.img.w}
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
