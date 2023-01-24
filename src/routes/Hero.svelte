<script lang="ts">
	import 'atropos/css';
	import Atropos from 'atropos/svelte';
	import anime from 'animejs';
	import { browser } from '$app/environment';

	function animateWord(word: 'student' | 'programmer' | 'gamer') {
		anime.remove(`.${word} .letter`);

		anime({
			targets: `.${word} .letter`,
			autoplay: true,
			rotate: () => anime.random(-30, 30),
			translateX: () => anime.random(30, 30),
			translateY: () => anime.random(-30, 30)
		});
	}

	function endAnimateWord(word: 'student' | 'programmer' | 'gamer') {
		anime.remove(`.${word} .letter`);

		anime({
			targets: `.${word} .letter`,
			autoplay: true,
			rotate: 0,
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

		anime
			.timeline({ loop: true, autoplay: true })
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

<section class="relative bg-light-base dark:bg-dark-base">
	<div class="flex flex-row flex-wrap justify-around content-center pb-32">
		<Atropos class="rounded-xl mx-8 mt-8 ">
			<!-- placeholder image here -->
			<div
				class="flex content-center justify-center pa-2 bg-gradient-to-br from-light-red to-light-rosewater dark:from-dark-red dark:to-dark-rosewater rounded-2xl"
			>
				<img
					src="https://picsum.photos/800/900"
					alt="placeholder"
					class="rounded-lg"
					width="400"
					height="450"
				/>
			</div>
		</Atropos>
		<div class="flex-grow">
			<h1 class="text-8xl leading-30">
				Hi,
				<br />
				I'm
				<span class="names ml-4">
					<span class="name-1 inline-block absolute">TNTMan1671</span>
					<span class="name-2 inline-block opacity-0 absolute">Suyashtnt</span>
					<span class="name-3 inline-block opacity-0 absolute">TNT Man Inc</span>
					<span class="name-4 inline-block opacity-0 absolute">A badly drawn wobbler</span>
				</span>

				<h2 class="text-5xl mt-0 flex justify-start gap-[1ch] leading-0">
					<p
						class="student"
						on:mouseenter={() => animateWord('student')}
						on:mouseleave={() => endAnimateWord('student')}
					>
						{#each 'Student'.split('') as letter}
							<span class="letter inline-block">{letter}</span>
						{/each}
					</p>

					<p
						class="programmer"
						on:mouseenter={() => animateWord('programmer')}
						on:mouseleave={() => endAnimateWord('programmer')}
					>
						<a
							href="https://github.com/Suyashtnt"
							class="
								flex group
								text-light-text dark:text-dark-text
								visited:text-light-text dark:visited:text-dark-text
								hover:underline-light-blue dark:hover:underline-dark-blue
							"
						>
							{#each 'Programmer'.split('') as letter}
								<span class="letter group-hover:text-light-blue dark:group-hover:text-dark-blue"
									>{letter}</span
								>
							{/each}
						</a>
					</p>

					<p
						class="gamer"
						on:mouseenter={() => animateWord('gamer')}
						on:mouseleave={() => endAnimateWord('gamer')}
					>
						<a
							href="https://github.com/Suyashtnt"
							class="
								flex group
								text-light-text dark:text-dark-text
								visited:text-light-text dark:visited:text-dark-text
								hover:underline-light-blue dark:hover:underline-dark-blue
							"
						>
							{#each 'Gamer'.split('') as letter}
								<span class="letter group-hover:text-light-blue dark:group-hover:text-dark-blue"
									>{letter}</span
								>
							{/each}
						</a>
					</p>
				</h2>
			</h1>
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
</style>
