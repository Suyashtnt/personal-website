<script lang="ts">
	import 'atropos/css';
	import Atropos from 'atropos/svelte';

	import anime  from 'animejs';
	const{ remove, random, timeline } = anime;

	import { browser } from '$app/environment';
	// import 3 different sizes of the image and create a srcset from them
	import faceSrcsetAvif from '$lib/pictures/face.png?w=300;500;700;900;1200&avif&srcset'
	// do it a second time, but now as webp since safari can't display avif
	import faceSrcsetWebp from '$lib/pictures/face.png?w=300;500;700;900;1200&webp&srcset'
	// create a small placeholder and import its metadata
	import { src as facePlaceholder, width, height } from '$lib/pictures/face.png?width=300&metadata'
	import { autoHash } from '$lib/autohash';

	function animateWord(word: 'student' | 'programmer' | 'gamer') {
		remove(`.${word} .letter`);

		anime({
			targets: `.${word} .letter`,
			autoplay: true,
			rotate: () => random(-30, 30),
			translateX: () => random(30, 30),
			translateY: () => random(-30, 30),
			scale: () => random(0.9, 1.1),
		});
	}

	function endAnimateWord(word: 'student' | 'programmer' | 'gamer') {
		remove(`.${word} .letter`);

		anime({
			targets: `.${word} .letter`,
			autoplay: true,
			rotate: 0,
			translateX: 0,
			translateY: 0,
			scale: 1,
		});
	}

	if (browser) {
		const opacityIn = [0, 1];
		const transYIn = [-50, 0];
		const transYOut = [0, 50];
		const durationIn = 800;
		const durationOut = 600;
		const delay = 1000;

		timeline({ loop: true, autoplay: true })
			.add({
				targets: `.names .name-1`,
				opacity: opacityIn,
				translateY: transYIn,
				duration: durationIn
			})
			.add({
				targets: `.names .name-1`,
				opacity: 0,
				translateY: transYOut,
				duration: durationOut,
				easing: 'easeInExpo',
				delay: delay
			})
			.add({
				targets: `.names .name-2`,
				opacity: opacityIn,
				translateY: transYIn,
				duration: durationIn
			})
			.add({
				targets: `.names .name-2`,
				opacity: 0,
				translateY: transYOut,
				duration: durationOut,
				easing: 'easeInExpo',
				delay: delay
			})
			.add({
				targets: `.names .name-3`,
				opacity: opacityIn,
				translateY: transYIn,
				duration: durationIn
			})
			.add({
				targets: `.names .name-3`,
				opacity: 0,
				translateY: transYOut,
				duration: durationOut,
				easing: 'easeInExpo',
				delay: delay
			})
			.add({
				targets: `.names .name-4`,
				opacity: opacityIn,
				translateY: transYIn,
				duration: durationIn
			})
			.add({
				targets: `.names .name-4`,
				opacity: 0,
				translateY: transYOut,
				duration: durationOut,
				easing: 'easeInExpo',
				delay: delay
			});
	}
</script>

<section class="relative bg-light-base dark:bg-dark-base" id="landing" use:autoHash>
	<div class="flex flex-row flex-wrap justify-around content-center pb-32">
		<Atropos class="rounded-xl mx-8 mt-8 ">
			<div
				class="flex content-center justify-center pa-2 bg-gradient-to-br from-light-red to-light-rosewater dark:from-dark-red dark:to-dark-rosewater rounded-2xl"
			>
				<picture>
					<source srcset={faceSrcsetAvif} type="image/avif"/>
					<source srcset={faceSrcsetWebp} type="image/webp"/>
					<img
						src={facePlaceholder}
						class="rounded-lg object-cover"
						width={width}
						height={height}
						alt="a contemporary portrait of me"
					>
				</picture>
			</div>
		</Atropos>
		<div class="flex-grow flex justify-between items-center">
			<div class="h-full">
				<h1
					class="text-7xl md:text-8xl leading-22 md:leading-30 text-center md:text-left mb-0 px-2 md:px-0"
				>
					Hi, I'm
					<br />
					<span class="names">
						<span class="name-1 inline-block">TNT<wbr />Man<wbr />1671</span>
						<span class="name-2 inline-block opacity-0">Suyash<wbr />tnt</span>
						<span class="name-3 inline-block opacity-0">TNT Man Inc</span>
						<span class="name-4 inline-block opacity-0">A badly drawn wobbler</span>
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
								flex group
								text-light-text dark:text-dark-text
								visited:text-light-text dark:visited:text-dark-text
								hover:underline-light-blue dark:hover:underline-dark-blue
							"
						>
							{#each 'Programmer'.split('') as letter}
								<span class="letter group-hover:text-light-blue dark:group-hover:text-dark-blue">
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
								flex group
								text-light-text dark:text-dark-text
								visited:text-light-text dark:visited:text-dark-text
								hover:underline-light-blue dark:hover:underline-dark-blue
							"
						>
							{#each 'Gamer'.split('') as letter}
								<span class="letter group-hover:text-light-blue dark:group-hover:text-dark-blue">
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
						<div class="i-ic-baseline-discord h-24 w-24 text-light-blue dark:text-dark-blue" />
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
