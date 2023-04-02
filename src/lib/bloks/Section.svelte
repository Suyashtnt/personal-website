<script context="module" lang="ts">
    export interface SectionBlok extends SbBlokData {
        id: string
        hasXPadding: boolean
        hasYPadding: boolean
        hasXMargin: boolean
        hasYMargin: boolean
        background: 'base' | 'mantle' | 'overlay' | 'surface'
        content: SbBlokData[]
    }

</script>

<script lang="ts">
	import { StoryblokComponent, storyblokEditable, type SbBlokData } from "@storyblok/svelte";

    export let blok: SectionBlok;
</script>

<section
    id={blok.id}
    class:py-4={blok.hasYPadding}
    class:px-4={blok.hasXPadding}
    class:my-4={blok.hasYMargin}
    class:mx-4={blok.hasXMargin}

    class:bg-light-base={blok.background === 'base'}
    class:dark-bg-dark-base={blok.background === 'base'}

    class:bg-light-mantle={blok.background === 'mantle'}
    class:dark-bg-dark-mantle={blok.background === 'mantle'}

    class:bg-light-overlay-0={blok.background === 'overlay'}
    class:dark-bg-dark-overlay-0={blok.background === 'overlay'}

    class:bg-light-surface-0={blok.background === 'surface'}
    class:dark-bg-dark-surface-0={blok.background === 'surface'}
    use:storyblokEditable={blok}
>
    {#each blok.content as contentBlok}
        <StoryblokComponent
            blok={contentBlok}
        />
    {/each}
</section>