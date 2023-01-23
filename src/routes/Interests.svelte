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
				"JavaScript is a programming language made to built websites, but you should know that if you are a web dev. If not, its what made made all of these animations possible along with the cloud you can see to the right. It's also known as the language which has at least 10 different ways to achieve the same goal, with varying degrees of readability and maintainability."
		},
		{
			name: 'TypeScript',
			description:
				"Typescript is Javascript but slightly less awful, as long as you are using libraries that have typescript definitions. It's a superset of Javascript, so it keeps all of Javascripts quirks, but now you know when you messed up your types and you get ✨ autocompletion ✨."
		},
		{
			name: 'ULTRAKILL',
			description: `
<p class="my-0">MANKIND IS <span class="text-red-6">DEAD</span>.</p>
<p class="my-0">BLOOD IS <span class="text-red-6">FUEL</span>.</p>
<p class="mt-0">HELL IS <span class="text-red-6">FULL</span>.</p>
ULTRAKILL is one of the games of all time. Go to <a href="https://devilmayquake.com">devilmayquake.com</a> and tell me where it leads you to.
`
		}
	];

	let selectedOpt: Opt | undefined = undefined;

	$: if (container)
		tagCloud = TagCloud(
			container,
			items.map((i) => i.name),
			{
				maxSpeed: 'slow',
				radius: 200
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

<section class="flex justify-around items-center bg-light-surface-0 dark:bg-dark-surface-0 py-16">
	<div class="w-1/2">
		<h1
			class="text-8xl mb-4 bg-gradient-to-r from-light-blue to-light-lavender dark:from-dark-blue dark:to-light-lavender h-min rounded-2xl pa-2"
		>
			<div
				class="h-full w-full bg-light-surface-0 dark:bg-dark-surface-0 rounded-xl-inner box-border pa-2 rounded-lg"
			>
				Interests
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
