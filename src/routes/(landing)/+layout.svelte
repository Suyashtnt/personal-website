<script lang="ts">
    import {fly} from 'svelte/transition';
    import Hero from './hero.svelte';
    import Contact from './contact.svelte';
    import AboutToBlog from './about-to-blog.svelte';
    import Tabs from '$lib/components/tabs/tabs.svelte';
    import Tab from '$lib/components/tabs/tab.svelte';
    import {page} from '$app/stores';
    import PageHead from '$lib/components/page-head.svelte';
</script>

<PageHead title={undefined} description="Hi, I'm TNTMan1671." />

<Hero />

<section class="bg-light-surface-0 dark:bg-dark-surface-0 py-8 md:px-8 overflow-clip" id="about">
    <Tabs class="mb-4">
        <Tab name="Skills" path="/skills" />
        <Tab name="Projects" path="/projects" />
        <Tab name="Games" path="/games" />
    </Tabs>

    <div class="grid grid-template-area overflow-hidden">
        {#key $page.url.pathname.split('/')[1]}
            <div
                out:fly={{duration: 300, x: '100%'}}
                in:fly={{delay: 300, duration: 300, x: '-100%'}}
                class="grid-area-[area]"
            >
                {#key $page.url.pathname}
                    <slot />
                {/key}
            </div>
        {/key}
    </div>
</section>

<AboutToBlog />

<Contact />

<style>
    .grid-template-area {
        grid-template: 'area';
    }
</style>
