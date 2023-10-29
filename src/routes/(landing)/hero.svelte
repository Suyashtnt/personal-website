<script lang="ts">
    import * as m from '@inlang/paraglide-js/website/messages'
    import Image from '@zerodevx/svelte-img';
    import anime from 'animejs';
    import 'atropos/css';
    import {onMount} from 'svelte';

    const {random, remove, timeline} = anime;

    import face from '$lib/pictures/face.png?w=640;320;160&as=optimize';

    const names = ['TNTMan\\1671', 'Suyashtnt', 'TNT \\Man \\Inc'];

    const animateWord = (word: string) =>{
        remove(`.${word} .letter`);

        anime({
            autoplay: true,
            rotate: () => random(-15, 15),
            scale: () => random(0.95, 1.05),
            targets: `.${word} .letter`,
            translateX: () => random(-15, 15),
            translateY: () => random(-15, 15)
        });
    }

    const endAnimateWord = (word: string) => {
        remove(`.${word} .letter`);

        anime({
            autoplay: true,
            rotate: 0,
            scale: 1,
            targets: `.${word} .letter`,
            translateX: 0,
            translateY: 0
        });
    }

    onMount(async () => {
        const {default: AtroposComponent} = await import(
            'atropos/element'
        );
        if (!customElements.get('atropos-component')) {
            customElements.define(
                'atropos-component',
                AtroposComponent
            );
        }
    });


    onMount(() => {
        const opacityIn = [0, 1];
        const transYIn = [-50, 0];
        const transYOut = [0, 50];
        const durationIn = 800;
        const durationOut = 600;
        const delay = 1000;

        const tl = timeline({autoplay: true, loop: true});

        for (const [i] of names.entries()) {
            tl.add({
                duration: durationIn,
                opacity: opacityIn,
                targets: `.names .name-${i}`,
                translateY: transYIn
            }).add({
                delay,
                duration: durationOut,
                easing: 'easeInExpo',
                opacity: 0,
                targets: `.names .name-${i}`,
                translateY: transYOut
            });
        }

        tl.play();
    })
</script>

<section
    class="relative bg-light-base dark:bg-dark-base"
    id="landing"
>
    <div
        class="flex flex-col items-center justify-center pb-32 lg:flex-row lg:justify-start"
    >
        <atropos-component
            class="group mx-8 mt-8 w-64 rounded-xl rounded-xl"
        >
            <div
                class="flex content-center justify-center rounded-2xl from-light-red to-light-rosewater bg-gradient-to-br pa-2 transition-all group-hover:ma-2 dark:from-dark-red dark:to-dark-rosewater group-hover:pa-0"
            >
                <Image
                    alt="a contemporary portrait of me"
                    class="h-auto w-60 rounded-xl object-cover transition-all group-hover:scale-105"
                    loading="eager"
                    src={face}
                />
            </div>
        </atropos-component>
        <div>
            <h1
                class="mb-2 px-2 text-center text-6xl leading-18 md:mb-0 md:px-0 md:text-left md:text-7xl"
            >
                {m.hello()}
                <br />
                <span class="names">
                    {#each names as name, i}
                        <span
                            class={`name-${i} inline-block`}
                            class:opacity-0={i !== 0}
                        >
                            {#each name.split('\\') as segement}
                                {segement}<wbr />
                            {/each}
                        </span>
                    {/each}
                </span>
            </h1>
            <h2
                class="my-0 flex flex-col items-center text-4xl leading-0 md:flex-row md:items-start md:gap-[1ch]"
            >
                <p
                    class="student"
                    on:mouseenter={() => animateWord('student')}
                    on:mouseleave={() => endAnimateWord('student')}
                    on:touchend={() => endAnimateWord('student')}
                    on:touchstart={() => animateWord('student')}
                >
                    {#each m.hero_student().split('') as letter}
                        <span class="letter inline-block"
                            >{letter}</span
                        >
                    {/each}
                </p>

                <p
                    class="programmer"
                    on:mouseenter={() => animateWord('programmer')}
                    on:mouseleave={() => endAnimateWord('programmer')}
                    on:touchend={() => endAnimateWord('programmer')}
                    on:touchstart={() => animateWord('programmer')}
                >
                    <a
                        class="group flex text-light-text underline-offset-14 dark:text-dark-text visited:text-light-text hover:underline-light-blue dark:visited:text-dark-text dark:hover:underline-dark-blue"
                        href="https://github.com/Suyashtnt"
                        rel="me"
                    >
                        {#each m.hero_programmer().split('') as letter}
                            <span
                                class="letter group-hover:text-light-blue dark:group-hover:text-dark-blue"
                            >
                                {letter}
                            </span>
                        {/each}
                    </a>
                </p>

                <p
                    class="gamer"
                    on:mouseenter={() => animateWord('gamer')}
                    on:mouseleave={() => endAnimateWord('gamer')}
                    on:touchend={() => endAnimateWord('gamer')}
                    on:touchstart={() => animateWord('gamer')}
                >
                    <a
                        class="group flex text-light-text underline-offset-14 dark:text-dark-text visited:text-light-text hover:underline-light-blue dark:visited:text-dark-text dark:hover:underline-dark-blue"
                        href="https://steamcommunity.com/id/suyashtnt123"
                        rel="me"
                    >
                        {#each m.hero_gamer().split('') as letter}
                            <span
                                class="letter group-hover:text-light-blue dark:group-hover:text-dark-blue"
                            >
                                {letter}
                            </span>
                        {/each}
                    </a>
                </p>
            </h2>
            <ul
                class="mt-0 flex flex-col list-none items-center justify-center gap-4 pl-0 text-2xl md:flex-row"
            >
                <li class="w-min flex flex-row items-center gap-2">
                    <div
                        class="i-ic-baseline-discord h-16 w-16 text-light-blue dark:text-dark-blue"
                    />
                    @tabiasgeehuman
                </li>
                <li class="w-min flex flex-row items-center gap-2">
                    <div
                        class="i-mdi-youtube h-16 w-16 text-light-red dark:text-dark-red"
                    />
                    <a
                        class="whitespace-nowrap text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                        href="https://www.youtube.com/@tabiasgeehuman"
                        >TNT Man Inc</a
                    >
                </li>
                <li class="w-min flex flex-row items-center gap-2">
                    <div
                        class="i-mdi-github h-16 w-16 text-dark-mantle dark:text-light-mantle"
                    />
                    <a
                        class="text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                        href="https://github.com/Suyashtnt"
                        >Suyashtnt</a
                    >
                </li>
            </ul>
        </div>
    </div>

    <div class="wave">
        <svg
            data-name="Layer 1"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                class="fill-light-surface-0 dark:fill-dark-surface-0"
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            />
        </svg>
    </div>
</section>

<style>
    .wave {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        line-height: 0;
        transform: rotate(180deg);
    }

    .wave svg {
        position: relative;
        display: block;
        width: calc(155% + 1.3px);
        height: 180px;
    }

    .names {
        display: grid;
    }
    .names > * {
        grid-row: 1;
        grid-column: 1;
    }
</style>
