<script lang="ts">
    import {fly} from 'svelte/transition';
    import type {gsap as Gsap} from 'gsap';
    import type {Flip as FlipType} from 'gsap/Flip';
    import {onMount} from 'svelte';
    import Hero from './hero.svelte';
    import Contact from './contact.svelte';
    import AboutToBlog from './about-to-blog.svelte';
    import Tabs from '$lib/components/tabs/tabs.svelte';
    import Tab from '$lib/components/tabs/tab.svelte';
    import {page} from '$app/stores';
    import PageHead from '$lib/components/page-head.svelte';
    import {afterNavigate, beforeNavigate} from '$app/navigation';

    let gsap: null | typeof Gsap = null;
    let Flip: null | typeof FlipType = null;
    let state: Flip.FlipState | null = null;

    const selector = '#card';

    onMount(async () => {
        const [{gsap: gsapModule}, {Flip: flipModule}] =
            await Promise.all([
                import('gsap/dist/gsap'),
                import('gsap/dist/Flip')
            ]);

        gsap = gsapModule;
        Flip = flipModule;
        gsap.registerPlugin(Flip);
    });

    beforeNavigate(() => {
        if (gsap && Flip) {
            state = Flip.getState(selector);
        }
    });

    afterNavigate(() => {
        if (gsap && Flip && state) {
            Flip.from(state, {
                duration: 0.6,
                ease: 'elastic.out(0.75, 1.2)',
                scale: true,
                targets: selector
            });
        }
    });
</script>

<PageHead title={undefined} description="Hi, I'm TNTMan1671." />

<Hero />

<section
    class="bg-light-surface-0 dark:bg-dark-surface-0 py-8 md:px-8 overflow-clip"
    id="about"
>
    <Tabs class="mb-4 px-8 md:px-0">
        <Tab name="Skills" path="/skills#about" />
        <Tab name="Projects" path="/projects#about" />
        <Tab name="Games" path="/games#about" />
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
