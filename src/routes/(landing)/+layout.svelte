<script lang="ts">
    import {page} from '$app/stores';
    import PageHead from '$lib/components/page-head.svelte';
    import Tab from '$lib/components/tabs/tab.svelte';
    import Tabs from '$lib/components/tabs/tabs.svelte';
    import {fly} from 'svelte/transition';

    import AboutToBlog from './about-to-blog.svelte';
    import Contact from './contact.svelte';
    import Hero from './hero.svelte';
</script>

<PageHead description="Hi, I'm TNTMan1671." title={undefined} />

<Hero />

<section
    class="overflow-clip bg-light-surface-0 py-8 dark:bg-dark-surface-0 md:px-8"
    id="about"
>
    <Tabs class="mb-2 mb-4 flex px-8 md:flex-row md:px-0">
        <Tab name="Skills" path="/skills#about" />
        <Tab name="Projects" path="/projects#about" />
        <Tab name="Games" path="/games#about" />
    </Tabs>

    <div class="grid-template-area grid overflow-hidden">
        {#key $page.url.pathname.split('/')[1]}
            <div
                class="grid-area-[area]"
                in:fly={{delay: 300, duration: 300, x: '-100%'}}
                out:fly={{duration: 300, x: '100%'}}
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
