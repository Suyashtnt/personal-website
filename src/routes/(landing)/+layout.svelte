<script lang="ts">
    import type {gsap as Gsap} from 'gsap';
    import type {Flip as FlipType} from 'gsap/Flip';

    import {afterNavigate, beforeNavigate} from '$app/navigation';
    import {page} from '$app/stores';
    import PageHead from '$lib/components/page-head.svelte';
    import Tab from '$lib/components/tabs/tab.svelte';
    import Tabs from '$lib/components/tabs/tabs.svelte';
    import {onMount} from 'svelte';
    import {fly} from 'svelte/transition';

    import AboutToBlog from './about-to-blog.svelte';
    import Contact from './contact.svelte';
    import Hero from './hero.svelte';

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
