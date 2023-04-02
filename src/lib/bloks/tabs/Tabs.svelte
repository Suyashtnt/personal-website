<script context="module" lang="ts">
    export interface TabsBlok extends SbBlokData {
        tabs: TabBlok[];
    }
</script>

<script lang="ts">
	import { type SbBlokData, StoryblokComponent, storyblokEditable } from "@storyblok/svelte";
	import { fly } from "svelte/transition";
	import Tab, { type TabBlok } from "./Tab.svelte";


    export let blok: TabsBlok;

    let activeIdx = 0;
    $: activeContent = blok.tabs[activeIdx].content
    $: typedActiveContent = Array.isArray(activeContent) ? activeContent[0] as SbBlokData : activeContent as SbBlokData;

    function setActive(idx: number) {
        activeIdx = idx;
    }
</script>


<section class="flex flex-col gap-4" use:storyblokEditable={blok}>
    <div
        class="flex flex-col md:flex-row items-center justify-around gap-4"
    >
        {#each blok.tabs as tab, idx}
            <Tab
                blok={tab}
                active={activeIdx === idx}
                on:click={() => setActive(idx)}
            />
        {/each}
    </div>

    <!-- Key is required to trigger the transition -->
    <div class="overflow-hidden">
        {#key activeIdx}
            <section in:fly={{ x: '-100%', delay: 300 }} out:fly={{ x: '100%', duration: 300 }}>
                <StoryblokComponent blok={typedActiveContent} />
            </section>
        {/key}
    </div>
</section>