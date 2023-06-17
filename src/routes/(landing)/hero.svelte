<script lang="ts">
    import Atropos from 'atropos/svelte';
    import anime from 'animejs';
    import Image from '$lib/components/image.svelte';
    import 'atropos/css'; // eslint-disable-line import/no-unassigned-import, import/order

    const {random, remove, timeline} = anime;

    import {browser} from '$app/environment';
    import face from '$lib/pictures/face.png?w=640;320;160&optimize';

    const names = ['TNTMan\\1671', 'Suyashtnt', 'TNT \\Man \\Inc'];

    function animateWord(word: string) {
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

    function endAnimateWord(word: string) {
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

    if (browser) {
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
    }
</script>

<section class="relative bg-light-base dark:bg-dark-base" id="landing">
    <div class="flex flex-col lg:flex-row justify-center lg:justify-start items-center pb-32">
        <Atropos class="rounded-xl mx-8 mt-8 group rounded-xl w-64">
            <div
                class="flex content-center justify-center transition-all pa-2 group-hover:pa-0 group-hover:ma-2 bg-gradient-to-br from-light-red to-light-rosewater dark:from-dark-red dark:to-dark-rosewater rounded-2xl"
            >
                <Image
                    alt="a contemporary portrait of me"
                    loading="eager"
                    src={face}
                    class="object-cover transition-all group-hover:scale-105 rounded-xl"
                />
            </div>
        </Atropos>
        <div>
            <h1
                class="text-7xl md:text-8xl leading-22 md:leading-30 text-center md:text-left mb-0 px-2 md:px-0"
            >
                Hi, I'm
                <br />
                <span class="names">
                    {#each names as name, i}
                        <span class={`name-${i} inline-block`} class:opacity-0={i !== 0}>
                            {#each name.split('\\') as segement}
                                {segement}<wbr />
                            {/each}
                        </span>
                    {/each}
                </span>
            </h1>
            <h2
                class="text-5xl my-0 flex flex-col md:flex-row items-center md:items-start md:gap-[1ch] leading-0"
            >
                <p
                    class="student"
                    on:mouseenter={() => animateWord('student')}
                    on:touchstart={() => animateWord('student')}
                    on:mouseleave={() => endAnimateWord('student')}
                    on:touchend={() => endAnimateWord('student')}
                >
                    {#each 'Student'.split('') as letter}
                        <span class="letter inline-block">{letter}</span>
                    {/each}
                </p>

                <p
                    class="programmer"
                    on:mouseenter={() => animateWord('programmer')}
                    on:touchstart={() => animateWord('programmer')}
                    on:mouseleave={() => endAnimateWord('programmer')}
                    on:touchend={() => endAnimateWord('programmer')}
                >
                    <a
                        href="https://github.com/Suyashtnt"
                        rel="me"
                        class="
							flex group underline-offset-14
							text-light-text dark:text-dark-text
							visited:text-light-text dark:visited:text-dark-text
							hover:underline-light-blue dark:hover:underline-dark-blue
						"
                    >
                        {#each 'Programmer'.split('') as letter}
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
                    on:touchstart={() => animateWord('gamer')}
                    on:mouseleave={() => endAnimateWord('gamer')}
                    on:touchend={() => endAnimateWord('gamer')}
                >
                    <a
                        href="https://steamcommunity.com/id/suyashtnt123"
                        rel="me"
                        class="
							flex group underline-offset-14
							text-light-text dark:text-dark-text
							visited:text-light-text dark:visited:text-dark-text
							hover:underline-light-blue dark:hover:underline-dark-blue
						"
                    >
                        {#each 'Gamer'.split('') as letter}
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
                class="grid justify-center items-center md:grid-cols-3 gap-4 list-none pl-0 mt-0 text-3xl"
            >
                <li class="flex flex-row gap-2 w-min items-center">
                    <div
                        class="i-ic-baseline-discord h-24 w-24 text-light-blue dark:text-dark-blue"
                    />
                    A badly drawn wobbler#8550
                </li>
                <li class="flex flex-row gap-2 w-min items-center">
                    <div class="i-mdi-youtube h-16 w-16 text-light-red dark:text-dark-red" />
                    <a
                        href="https://www.youtube.com/@tabiasgeehuman"
                        class="text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text whitespace-nowrap"
                        >TNT Man Inc</a
                    >
                </li>
                <li class="flex flex-row gap-2 w-min items-center">
                    <div class="i-mdi-github h-16 w-16 text-dark-mantle dark:text-light-mantle" />
                    <a
                        href="https://github.com/Suyashtnt"
                        class="text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                        >Suyashtnt</a
                    >
                </li>
            </ul>
        </div>
    </div>

    <div class="wave">
        <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
        >
            <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                class="fill-light-surface-0 dark:fill-dark-surface-0"
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
