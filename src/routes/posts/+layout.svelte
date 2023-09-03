<script lang="ts">
    import type {gsap as Gsap} from 'gsap';
    import type {Flip as FlipType} from 'gsap/Flip';
    import {onMount} from 'svelte';
    import {afterNavigate, beforeNavigate} from '$app/navigation';
    let state: Flip.FlipState | null = null;

    let gsap: typeof Gsap | null = null;
    let Flip: typeof FlipType | null = null;

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
                duration: 0.64,
                ease: 'power4.inOut',
                scale: true,
                absolute: true,
                targets: selector
            });
        }
    });
</script>

<slot />
