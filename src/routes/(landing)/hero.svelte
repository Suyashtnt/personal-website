<script lang="ts">
	import * as m from '$i18n/messages';
	import anime from 'animejs';
	import 'atropos/css';
	import { onMount } from 'svelte';

	const { random, remove, timeline } = anime;

	import { easeEmphasized } from 'm3-svelte';

	const names = ['TNTMan\\1671', 'Suyashtnt', 'TNT \\Man \\Inc'];

	const updateCasl = (selector: string) => {
		document.querySelectorAll(selector).forEach((el) => {
			if (el instanceof HTMLElement) {
				el.style.fontVariationSettings = `"CASL" ${el.dataset.fontCasl}, "MONO" ${el.dataset.fontCasl}`;
			}
		});
	};

	const animateWord = (word: string) => {
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
	};

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
	};

	onMount(async () => {
		const { default: AtroposComponent } = await import('atropos/element');
		if (!customElements.get('atropos-component')) {
			customElements.define('atropos-component', AtroposComponent);
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
			loop: true
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
			}).add({
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
	});
</script>

<section
    class="relative bg-light-mantle dark:bg-dark-base_background"
    id="landing"
>
    <div class="flex flex-col xl:flex-row justify-between gap-6 xl:mx-16">
        <div class="min-w-max flex flex-[1_1_auto] flex-col items-center justify-between rounded-xl bg-light-base dark:bg-dark-surface_background">
            <atropos-component
                class="group mt-8 w-64 rounded-xl rounded-xl"
            >
                <div
                    class="flex content-center justify-center rounded-2xl from-light-red to-light-rosewater bg-gradient-to-br pa-2 transition-all group-hover:ma-2 dark:from-dark-primary_foreground dark:to-dark-secondary_foreground group-hover:pa-0"
                >
                    <enhanced:img
                        alt="A contemporary portrait of me."
                        class="h-auto w-60 rounded-xl object-cover transition-all group-hover:scale-105"
                        loading="eager"
                        src='$lib/pictures/face.png'
                        sizes="240px 360px"
                    />
                </div>
            </atropos-component>

			<div class="mx-4 mb-8">
				<h1
					class="mx-0 px-2 text-center text-6xl leading-18 md:mb-0 md:px-0 md:text-left md:text-7xl"
				>
					{m.hello()}
					<br />
					<span class="names">
						{#each names as name, i}
							<span
								class="name-{i} inline-block dark:from-dark-primary_foreground dark:to-dark-secondary_foreground from-light-lavender to-light-blue bg-gradient-to-br bg-clip-text text-transparent"
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
                    <li>
                        <h2
                            class="student"
                            on:mouseenter={() => animateWord('student')}
                            on:mouseleave={() => endAnimateWord('student')}
                            on:touchend={() => endAnimateWord('student')}
                            on:touchstart={() => animateWord('student')}
                        >
                            {#each m.hero_student().split('') as letter}
                                <span class="letter inline-block">{letter}</span>
                            {/each}
                        </h2>
                    </li>
                    <li>
                        <h2
                            class="programmer"
                            on:mouseenter={() => animateWord('programmer')}
                            on:mouseleave={() => endAnimateWord('programmer')}
                            on:touchend={() => endAnimateWord('programmer')}
                            on:touchstart={() => animateWord('programmer')}
                        >
                            <a
                                class="group dark:hover:underline-dark-blue flex text-light-text underline-offset-14 dark:text-dark-surface_foreground visited:text-light-text hover:underline-light-blue dark:visited:text-dark-surface_foreground"
                                href="https://github.com/Suyashtnt"
                                rel="me"
                            >
                                {#each m.hero_programmer().split('') as letter}
                                    <span
                                        class="letter group-hover:text-light-blue dark:group-hover:text-dark-secondary_foreground"
                                    >
                                        {letter}
                                    </span>
                                {/each}
                            </a>
                        </h2>
                    </li>
					<li>
                        <h2
                            class="gamer"
                            on:mouseenter={() => animateWord('gamer')}
                            on:mouseleave={() => endAnimateWord('gamer')}
                            on:touchend={() => endAnimateWord('gamer')}
                            on:touchstart={() => animateWord('gamer')}
                        >
                            <a
                                class="group dark:hover:underline-dark-blue flex text-light-text underline-offset-14 dark:text-dark-surface_foreground visited:text-light-text hover:underline-light-blue dark:visited:text-dark-surface_foreground"
                                href="https://steamcommunity.com/id/suyashtnt123"
                                rel="me"
                            >
                                {#each m.hero_gamer().split('') as letter}
                                    <span
                                        class="letter group-hover:text-light-blue dark:group-hover:text-dark-secondary_foreground"
                                    >
                                        {letter}
                                    </span>
                                {/each}
                            </a>
                        </h2>
                    </li>
				</ul>
                <ul
					class="my-0 mt-6 flex flex-col list-none items-center pl-0 text-2xl leading-0 md:flex-row md:items-start md:gap-[1ch]"
                >
                    <li class="dark:hover:underline-dark-blue flex items-center gap-[1ch] text-light-text dark:text-dark-surface_foreground visited:text-light-text hover:underline-light-blue dark:visited:text-dark-surface_foreground">
	                    <div class="i-ic-email inline-block h-8 w-8" />
                        <a
                            class="dark:hover:underline-dark-blue text-light-text dark:text-dark-surface_foreground visited:text-light-text hover:underline-light-blue dark:visited:text-dark-surface_foreground"
                            href="mailto:suyashtnt@gmail.com"
                        >
                            Suyashtnt@gmail.com
                        </a>
                    </li>
                    <li class="flex items-center gap-[1ch]">
	                    <div class="i-ic-baseline-discord inline-block h-8 w-8" />
                        <a
                            class="dark:hover:underline-dark-blue text-light-text dark:text-dark-surface_foreground visited:text-light-text hover:underline-light-blue dark:visited:text-dark-surface_foreground"
                            href="https://discord.com"
                            on:click|preventDefault={() => {
                                navigator.clipboard.writeText("tabiasgeehuman")
                                alert("Copied to clipboard!")
                            }}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            @tabiasgeehuman
                        </a>
                    </li>
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

			<enhanced:img
				alt="My desktop computer rice."
				class="block h-full max-h-full max-w-full w-auto rounded-xl object-cover transition-all group-hover:scale-105"
				loading="eager"
				src='$lib/pictures/Computer.png'
                sizes="1280px 720px 480px 360px"
			/>
		</section>
	</div>
</section>

<div class="wave bg-light-base dark:bg-dark-base_background">
    <svg
        data-name="Layer 1"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            class="fill-light-surface-0 dark:fill-dark-surface_background"
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
