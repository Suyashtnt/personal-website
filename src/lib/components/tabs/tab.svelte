<script lang="ts">
	import { page } from '$app/stores';

	$: active = $page.url.pathname.includes(onlyNameOfPath ?? '');

	export let name: string;

	/**
	 * The path to the page.
	 * Should be relative to the root of the website. (e.g. /about)
	 */
	export let path: string;
	const onlyNameOfPath = path.includes('#') ? path.split('#')[0] : path;
</script>

<a
	class="w-full flex-1 rounded-xl border-none from-light-blue to-light-sapphire bg-gradient-to-tr bg-clip-text px-4 py-2 text-center text-4xl font-400 text-transparent decoration-none transition-all hover:cursor-pointer dark:from-dark-blue dark:to-dark-sapphire md:text-5xl visited:text-transparent"
	class:important-bg-clip-unset={active}
	class:important-casl={active}
	class:important-dark-text-dark-surface-0={active}
	class:important-font-600={active}
	class:important-text-light-surface-0={active}
	class:important-visited-dark-text-dark-surface-0={active}
	class:important-visited-text-surface-0={active}
	data-sveltekit-noscroll
	href={path}
	id={name}
>
	{name}
</a>
