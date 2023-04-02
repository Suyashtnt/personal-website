<script context="module" lang="ts">
    export interface PageBlok extends SbBlokData {
        content: SbBlokData[];
    }
</script>

<script lang="ts">
    import { StoryblokComponent, storyblokEditable, type SbBlokData } from '@storyblok/svelte';
    export let blok: PageBlok;
</script>

<div
    use:storyblokEditable={blok}
>
    {#each blok.content as contentBlok}
        <StoryblokComponent
            blok={contentBlok}
        />
    {/each}
</div>
