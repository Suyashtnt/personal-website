<script lang="ts">
	import * as m from '$i18n/messages';
	import Discord from '~icons/ic/baseline-discord';
	import Email from '~icons/material-symbols/mail-outline';
	import { easeEmphasized } from 'm3-svelte';
	import { type TimelineDefinition, animate, timeline } from 'motion';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment'
	const names = ['TNT\\Man\\1671', 'Suyash\\tnt', 'TNT Man Inc'];

	const easing = easeEmphasized;
	const random = (min: number, max: number) => {
		return Math.random() * (max - min) + min;
	};

	const animateWord = (word: string) => {
		const selector = `.${word} .letter`;
		const elements = document.querySelectorAll(selector);

		for (const element of elements) {
			animate(
				element,
				{
					'--casl': [0, 1],
					fontWeight: [400, 900],
					rotate: random(-15, 15),
					scale: random(0.95, 1.05),
					x: random(-15, 15),
					y: random(-15, 15)
				},
				{
					duration: 0.3,
					easing
				}
			);
		}
	};

	const endAnimateWord = (word: string) => {
		const selector = `.${word} .letter`;

		animate(
			selector,
			{
				'--casl': [1, 0],
				fontWeight: [900, 400],
				rotate: 0,
				scale: 1,
				x: 0,
				y: 0
			},
			{
				duration: 0.3,
				easing
			}
		);
	};

	onMount(() => {
		const duration = 0.45;
		const delay = 2.5;

		const tlDefinition: TimelineDefinition = [];

		for (const [i] of names.entries()) {
			const selector = `.names .name-${i}`;

			tlDefinition.push(
				[
					selector,
					{
						'--casl': [0, 1],
						fontWeight: [100, 600],
						opacity: [0, 1],
						y: [-30, 0]
					}
				],
				[
					selector,
					{
						'--casl': [1, 0],
						fontWeight: [600, 100],
						opacity: [1, 0],
						y: [0, 30]
					},
					{ delay }
				]
			);
		}

		timeline(tlDefinition, {
			autoplay: true,
			defaultOptions: {
				duration,
				easing
			},
			repeat: Infinity
		});
	});
</script>

<section
	class="flex rel bg:base fg:base flex:col flex:row@lg gap:6x justify-items:stretch m:6x mt:0x"
	id="landing"
>
	<div class="flex align-items:center bg:surface flex-grow:1 flex:auto flex:col px:6x r:4x">
		<div
			class="flex align-items:center gap:6x@sm justify-content:space-between mt:8x r:4x"
		>
			<div
				class={'r:4x ~all|300ms gradient(90deg,var(--from),var(--to)) $from:text-primary $to:secondary scale(0.9):hover scale(1.25):hover>div>picture>img'}
			>
				<div class="flex p:2x place-items:center r:6x">
					<enhanced:img
						alt="A contemporary portrait of me."
						class="object-cover ~all|300ms h:auto r:4x w:28x w:36x@sm vertical:middle"
						loading="eager"
						sizes="min(180px, 100vw)"
						src="$lib/pictures/face.png?w=160;140"
					></enhanced:img>
				</div>
			</div>
			<h1
				class={'m:0 text:center text:12x text:14x@sm line-height:1.2! {mb:0;px:0;text:left}@md'}
			>
				{m.hello()}
				<span 
					class="flex flex:col"
					class:names={browser}
				>
					{#each names as name, i}
						<span
							class="name-{i} animate-casl $from:text-primary $to:secondary gradient-text inline gradient(90deg,var(--from),var(--to))"
						>
							{#each name.split('\\') as segement}
								{segement}<wbr />
							{/each}
						</span>
					{/each}
				</span>
			</h1>
		</div>
		<div class="mb:8x">
			<ul
				class={'my:0 mt:4x  flex flex:col align-items:center pl:0 text:6x line-height:0.2! {flex:row;align-items:start;gap:2ch}@2xs list-style:none@<2xs'}
			>
				<li class="list-style:none">
					<h2
						class="student w:36x@2xs"
						on:mouseenter={() => animateWord('student')}
						on:mouseleave={() => endAnimateWord('student')}
						on:touchend={() => endAnimateWord('student')}
						on:touchstart={() => animateWord('student')}
					>
						{#each m.hero_student().split('') as letter}
							<span class="letter animate-casl inline-block">{letter}</span>
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
							class="flex fg:surface fg:surface:visited fg:blue:hover>span text-decoration:surface text-decoration:blue:hover text-underline-offset:14 text:underline"
							href="https://github.com/Suyashtnt"
							rel="me"
						>
							{#each m.hero_programmer().split('') as letter}
								<span class="letter animate-casl inline-block">
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
							class="flex fg:surface fg:surface:visited text-decoration:surface text-decoration:blue:hover text-underline-offset:14 text:blue:hover>span text:underline"
							href="https://steamcommunity.com/id/suyashtnt123"
							rel="me"
						>
							{#each m.hero_gamer().split('') as letter}
								<span class="letter animate-casl inline-block">
									{letter}
								</span>
							{/each}
						</a>
					</h2>
				</li>
			</ul>
			<ul
				class="flex align-items:center align-items:start@md flex:col@<2xs gap:1ch line-height:0 list-style:none mt:3x my:0 pl:0 text:5x"
			>
				<li
					class="flex align-items:center fg:surface fg:surface@visited gap:1ch text-decoration:blue:hover"
				>
					<Email class="h-8 w-8" />
					<a
						class="fg:surface fg:surface@visited text-decoration:blue:hover"
						href="mailto:suyashtnt@gmail.com"
					>
						Suyashtnt@gmail.com
					</a>
				</li>
				<li
					class="flex align-items:center fg:surface fg:surface@visited gap:1ch text-decoration:blue:hover"
				>
					<Discord class="h-8 w-8" />
					<a
						class="fg:surface fg:surface@visited text-decoration:blue:hover"
						href="https://discord.com"
						on:click|preventDefault={() => {
							navigator.clipboard.writeText('tabiasgeehuman');
							alert('Copied to clipboard!');
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

	<section class="flex flex:auto flex:row flex:shrink place-items:center">
		<enhanced:img
			alt="My desktop computer rice."
			class="block aspect:21/9@md h:full max-h:full max-w:full obj:contain r:4x w:auto"
			loading="eager"
			sizes="min(1280px, 100vw)"
			src="$lib/pictures/Computer.png?w=1280;720;480;360;240"
		></enhanced:img>
	</section>
</section>

<style>
	.names {
		display: grid;
	}

	.names > * {
		grid-row: 1;
		grid-column: 1;
	}

	.animate-casl {
		font-variation-settings:
			'CASL' var(--casl),
			'MONO' var(--casl);
	}
</style>
