<script lang="ts">
	import TagCloud from 'TagCloud';
	import Typewriter from 'svelte-typewriter';

	let container: HTMLElement | null = null;
	let tagCloud: ReturnType<typeof TagCloud> | null = null;

	interface Opt {
		name: string;
		description: string;
	}
	const items: Opt[] = [
		{
			name: 'JavaScript',
			description:
				"JavaScript is a programming language made to built websites, but you should know that if you are a web dev. If not, its what made made all of these animations possible along with the cloud you can see to the right. It's also known as the language which has at least 10 different ways to achieve the same goal, with varying degrees of readability and maintainability. It was one of the first programming languages I ever used"
		},
		{
			name: 'TypeScript',
			description:
				"Typescript is Javascript but slightly less awful, as long as you are using libraries that have typescript definitions. It's a superset of Javascript, so it keeps all of Javascripts quirks, but now you know when you messed up your types and you get ✨ autocompletion ✨. It was the first programming language I fully self taught myself."
		},
		{
			name: 'ULTRAKILL',
			description: `
<p class="my-0">MANKIND IS <span class="text-red-6">DEAD</span>.</p>
<p class="my-0">BLOOD IS <span class="text-red-6">FUEL</span>.</p>
<p class="mt-0">HELL IS <span class="text-red-6">FULL</span>.</p>
ULTRAKILL is one of the games of all time. Go to <a href="https://devilmayquake.com">devilmayquake.com</a> and tell me where it leads you to. This game is what you get if you only put good game decisions into one game.
`
		},
		{
			name: 'Svelte',
			description:
				'Svelte is yet another javascript frontend framework, except this time it\'s actually enjoyable to use. It converts your svelte code into regular high-performance JS, which is nearly regular JS speed (slower than solidjs, though). If you want a framework to go along with it, use <a href="https://kit.svelte.dev">SvelteKit</a>.'
		},
		{
			name: 'SolidJS',
			description:
				"SolidJS is yet another JSX frontend framework, except this time it's actually enjoyable to use. It converts your JSX code into regular high-performance JS, which is basically regular JS speed. Looks interesting to me, but I haven't used it much."
		},
		{
			name: 'Rust',
			description:
				'You ever wanted to go <span class="italic">Blazingly</span> fast, without sacrificing safety? Well, Rust now exists, and is probably the best designed language I\'ve used. It taught me a lot about good code quality and how to abuse type systems to my advantage. Currently using it for building my minecraft launcher, Glowsquid. I would like to eventually try using the unsafe/lower-level side of rust, but currently I\'m :clueless: about it.'
		},
		{
			name: 'Dyson Sphere Program',
			description:
				"You build a factory that eventually harnesses the power of tens of stars in space. Need I say more? If you do need me to say more, people have modded in multiplayer, custom upgrades and factory buildings, more megastructures, and overall QOL improvements. There is a reason it's my most played game on steam."
		}
	];

	let selectedOpt: Opt | undefined = undefined;

	$: if (container)
		tagCloud = TagCloud(
			container,
			items.map((i) => i.name),
			{
				maxSpeed: 'fast',
				radius: 250
			}
		);

	function handleTagCloudClick(event: MouseEvent) {
		if (tagCloud) {
			const tag = event.target as HTMLElement;
			if (tag.className === 'tagcloud--item') {
				selectedOpt = items.find((i) => i.name === tag.textContent);
			}
		}
	}
</script>

<section
	class="flex flex-col md:flex-row justify-around items-center bg-light-surface-0 dark:bg-dark-surface-0 py-16"
>
	<div class="w-1/2">
		<h1
			class="text-8xl mb-4 bg-gradient-to-r from-light-blue to-light-lavender dark:from-dark-blue dark:to-light-lavender h-min rounded-2xl pa-2"
		>
			<div
				class="h-full w-full bg-light-surface-0 dark:bg-dark-surface-0 rounded-xl-inner box-border px-2 py-4 rounded-lg"
			>
				Things I Enjoy
			</div>
		</h1>
		<div class="rounded-xl bg-light-mantle dark:bg-dark-mantle pa-4 text-2xl">
			<Typewriter>
				<h2>
					{selectedOpt?.name ?? 'Click a tag to learn more'}
				</h2>
			</Typewriter>
			<Typewriter interval={2} mode="cascade">
				<p>
					{@html selectedOpt?.description ?? 'Cmon, go ahead...'}
				</p>
			</Typewriter>
		</div>
	</div>
	<div id="tagcloud" bind:this={container} on:click={handleTagCloudClick} />
</section>

<style>
	:global(.tagcloud--item) {
		@apply text-2xl cursor-pointer text-light-text dark-text-dark-text underline underline-light-blue dark-underline-dark-blue hover-text-3xl hover-text-light-blue dark-hover-text-dark-blue transition-all;
	}
</style>
