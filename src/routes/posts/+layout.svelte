<script lang="ts">
    import type {gsap as Gsap} from 'gsap';
    import type {Flip as FlipType} from 'gsap/Flip';
    import {onMount} from 'svelte';
    import {afterNavigate, beforeNavigate} from '$app/navigation';

    let gsap: null | typeof Gsap = null;
    let Flip: null | typeof FlipType = null;
    let state: Flip.FlipState | null = null;

    const selector = '#title-card';

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
                duration: 0.6,
                ease: 'elastic.out(1, 1)',
                scale: true,
                targets: selector
            });
        }
    });
</script>

<slot />
