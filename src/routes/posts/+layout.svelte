<script lang="ts">
    import type {gsap as Gsap} from 'gsap';
    import type {Flip as FlipType} from 'gsap/Flip';

    import {afterNavigate, beforeNavigate} from '$app/navigation';
    import {onMount} from 'svelte';
    let state: Flip.FlipState | null = null;

    let gsap: null | typeof Gsap = null;
    let Flip: null | typeof FlipType = null;

    const selector = ["#card", "#title-card", "#text"];

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

    afterNavigate(async () => {
        if (gsap && Flip && state) {
            Flip.from(state, {
                absolute: true,
                duration: 0.64,
                ease: 'power4.inOut',
                scale: true,
                targets: selector
            });
        }
    });
</script>

<svelte:head>
    <link
        rel="alternate"
        type="application/atom+xml"
        title="The Badly Drawn Blog (Atom Feed)"
        href="/atom.xml"
    />
</svelte:head>

<slot />
