<script lang="ts">
    import * as m from '$i18n/messages'
    import Image from '@zerodevx/svelte-img';
    import anime from 'animejs';
    import 'atropos/css';
    import {onMount} from 'svelte';

    const {random, remove, timeline} = anime;

    import computer from '$lib/pictures/Computer.png?as=optimize';
    import face from '$lib/pictures/face.png?w=640;320;160&as=optimize'; import { easeEmphasized } from 'm3-svelte';

    const names = ['TNTMan\\1671', 'Suyashtnt', 'TNT \\Man \\Inc'];

    const updateCasl = (selector: string) => {
        document
            .querySelectorAll(selector)
            .forEach((el) => {
                if (el instanceof HTMLElement) {
                    el.style.fontVariationSettings = `"CASL" ${el.dataset.fontCasl} "MONO" ${el.dataset.fontCasl}`;
                }
            });
    };

    const animateWord = (word: string) =>{
        const selector = `.${word} .letter`;
        remove(selector);

        anime({
            autoplay: true,
            'data-font-casl': 1,
            fontWeight: [400, 900],
            rotate: () => random(-15, 15),
            scale: () => random(0.95, 1.05),
            targets: selector,
            translateX: () => random(-15, 15),
            translateY: () => random(-15, 15),
            update: () => updateCasl(selector)
        });
    }

    const endAnimateWord = (word: string) => {
        const selector = `.${word} .letter`;
        remove(selector);

        anime({
            autoplay: true,
            'data-font-casl': 0,
            fontWeight: [900, 400],
            rotate: 0,
            scale: 1,
            targets: selector,
            translateX: 0,
            translateY: 0,
            update: () => updateCasl(selector)
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

        const durationIn = 400;
        const durationOut = 400;
        const easing = () => easeEmphasized;

        const delay = 1000;

        const fontWeightIn = [100, 900];
        const fontWeightOut = [900, 100];

        const tl = timeline({
            autoplay: true,
            loop: true,
        });

        for (const [i] of names.entries()) {
            const selector = `.names .name-${i}`;

            tl.add({
                'data-font-casl': 1,
                duration: durationIn,
                easing,
                fontWeight: fontWeightIn,
                hidden: false,
                opacity: opacityIn,
                targets: selector,
                translateY: transYIn,
                update: () => updateCasl(selector)
            })
            .add({
                'data-font-casl': 0,
                delay,
                duration: durationOut,
                easing,
                fontWeight: fontWeightOut,
                hidden: true,
                opacity: 0,
                targets: selector,
                translateY: transYOut,
                update: () => updateCasl(selector)
            });
        }

        tl.play();
    })
</script>

<section
    class="relative bg-light-base dark:bg-dark-base"
    id="landing"
>
    <div class="flex flex-row justify-between gap-6 xl:mx-16">
        <div class="min-w-128 flex flex-[1_1_auto] flex-col items-center justify-between gap-6">
            <atropos-component
                class="group col-span-2 mt-8 w-64 rounded-xl rounded-xl"
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

            <div class="col-span-3">
                <h1
                    class="mb-2 mt-0 px-2 text-center text-6xl leading-18 md:mb-0 md:px-0 md:text-left md:text-7xl"
                >
                    {m.hello()}
                    <br />
                    <span class="names">
                        {#each names as name, i}
                            <span
                                class={`name-${i} inline-block`}
                                class:opacity-0={i !== 0}
                                data-font-casl={0}
                            >
                                {#each name.split('\\') as segement}
                                    {segement}<wbr />
                                {/each}
                            </span>
                        {/each}
                    </span>
                </h1>
                <ul
                    class="my-0 mt-4 flex flex-col list-none items-center pl-0 text-2xl leading-0 md:flex-row md:items-start md:gap-[1ch]"
                >
                    <h2
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
                    </h2>
                    <h2
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
                    </h2>
                    <h2
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
                    </h2>
                </ul>
            </div>
        </div>

        <section class="flex flex-[0_1_auto] flex-shrink flex-row items-center gap-6">
            <!-- <ul class="flex flex-wrap list-none gap-2 rounded-xl pa-0">
                {#each data.projects as project (project.name)}
                    <li class="flex-[1_1_200px]">
                        <Project {project} />
                    </li>
                {/each}
            </ul> -->

            <Image
                alt="Picture of my computer"
                class="block h-full max-h-full max-w-full w-auto rounded-xl object-cover transition-all group-hover:scale-105"
                loading="eager"
                src={computer}
            />
        </section>
    </div>
</section>

<div class="wave bg-light-base dark:bg-dark-base">
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

<style>
    .wave {
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
