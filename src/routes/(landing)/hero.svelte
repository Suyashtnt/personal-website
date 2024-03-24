<script lang="ts">
	import * as m from '$i18n/messages';
	import anime from 'animejs';
	import 'atropos/css';
	import Email from '~icons/ic/email'
	import Discord from '~icons/ic/baseline-discord'

	const { random, remove, timeline } = anime;

	import { easeEmphasized } from 'm3-svelte';
	import { onMount } from 'svelte';

	const names = ['TNT\\Man\\1671', 'Suyash\\tnt', 'TNT Man Inc'];

	const updateCasl = (selector: string) => {
		document.querySelectorAll(selector).forEach((el) => {
			if (el instanceof HTMLElement) {
				el.style.fontVariationSettings = `"CASL" ${el.dataset.fontCasl}, "MONO" ${el.dataset.fontCasl}`;
			}
		});
	};

	const easing = () => easeEmphasized;

	const animateWord = (word: string) => {
		const selector = `.${word} .letter`;
		remove(selector);

		anime({
			autoplay: true,
			easing,
			duration: 300,
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
			easing,
			duration: 300,
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
		const duration = 450;
		const delay = 2500;

		const tl = timeline({
			autoplay: true,
			loop: true
		});

		for (const [i] of names.entries()) {
			const selector = `.names .name-${i}`;

			tl.add({
				'data-font-casl': 1,
				duration: duration,
				easing,
				hidden: false,
				opacity: opacityIn,
				targets: selector,
				update: () => updateCasl(selector)
			}).add({
				'data-font-casl': 0,
				delay,
				duration: duration,
				easing,
				hidden: true,
				opacity: 0,
				targets: selector,
				update: () => updateCasl(selector)
			});
		}
	});
</script>

<section
    class="rel bg:base fg:base mx:6x flex flex:col flex:row@lg gap:6x justify-items:space-between"
    id="landing"
>
  <div class="flex align-items:center bg:surface flex:auto flex:grow flex:col r:4x px:6x">
    <div class="flex align-items:center justify-content:space-between gap:6x@sm mt:8x w:full">
      <atropos-component
          class={"w:32x w:40x@sm r:4x {m:2x;p:0}:hover>div scale(1.05):hover>div>picture>img"}
      >
          <div
              class="flex ~all|300ms p:2x place-items:center r:6x"
          >
              <enhanced:img
                  alt="A contemporary portrait of me."
                  class="object-cover ~all|300ms h:auto r:4x w:28x w:36x@sm"
                  loading="eager"
                  sizes="240px 360px"
                  src='$lib/pictures/face.png'
              />
          </div>
      </atropos-component>
  		<h1
  			class={"m:0 text:center text:12x text:14x@sm line-height:1.2! {mb:0;px:0;text:left}@md flex-grow:1"}
  		>
  			{m.hello()}
  			<span class="names h:2lh">
  				{#each names as name, i}
  					<span
  						class="name-{i} gradient-text inline-block gradient(90deg,var(--from),var(--to)) $from:text-primary $to:secondary"
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
    </div>
		<div class="mb:8x">
  		<ul
  			class={"my:0 mt:4x  flex flex:col align-items:center pl:0 text:6x line-height:0.2! {flex:row;align-items:start;gap:2ch}@2xs list-style:none@<2xs"}
  		>
        <li class="list-style:none">
            <h2
                class="student w:36x@md"
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
                    class="flex text-decoration:surface text-decoration:blue:hover text-underline-offset:14 text:surface text:blue:hover>span text:surface@visited text:underline"
                    href="https://github.com/Suyashtnt"
                    rel="me"
                >
                    {#each m.hero_programmer().split('') as letter}
                        <span class="letter">
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
                    class="flex text-decoration:surface text-decoration:blue:hover text-underline-offset:14 text:surface text:blue:hover>span text:surface@visited text:underline"
                    href="https://steamcommunity.com/id/suyashtnt123"
                    rel="me"
                >
                    {#each m.hero_gamer().split('') as letter}
                        <span class="letter">
                            {letter}
                        </span>
                    {/each}
                </a>
            </h2>
        </li>
  		</ul>
      <ul
  				class="my:0 mt:3x list-style:none align-items:center pl:0 text:5x line-height:0 align-items:start@md gap:1ch flex flex:col@<2xs"
      >
          <li class="text-decoration:blue:hover align-items:center gap:1ch fg:surface fg:surface@visited flex">
              <Email class="h-8 w-8" />
              <a
                  class="text-decoration:blue:hover fg:surface fg:surface@visited"
                  href="mailto:suyashtnt@gmail.com"
              >
                  Suyashtnt@gmail.com
              </a>
          </li>
          <li class="text-decoration:blue:hover align-items:center gap:1ch fg:surface fg:surface@visited flex">
              <Discord class="h-8 w-8" />
              <a
                  class="text-decoration:blue:hover fg:surface fg:surface@visited"
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

  <section class="flex:auto flex:shrink flex:row flex place-items:center">
    <enhanced:img
      alt="My desktop computer rice."
      class="h:full max-h:full max-w:full w:auto r:4x obj:contain block aspect:21/9@md"
      loading="eager"
      sizes="1280px 720px 480px 360px"
      src='$lib/pictures/Computer.png'
    />
  </section>
</section>

<div class="wave bg:base">
    <svg
        data-name="Layer 1"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            class="fill:surface"
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
