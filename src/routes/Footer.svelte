<script lang="ts">
	const potentialFooterTexts = [
		'Do you really need a footer?',
		'Hello welcome to the bottom of the page!',
		'Why do websites even have footers anymore?'
	] as const;

	const footerText = potentialFooterTexts[Math.floor(Math.random() * potentialFooterTexts.length)];
</script>

<footer
	class="
		flex flex-col md:flex-row items-center justify-between
		px-2 lg:px-16
		text-light-text dark:text-dark-text bg-light-mantle dark:bg-dark-mantle
		"
>
	<p class="font-semibold text-2xl">TNTMan1671</p>
	<p>
		Made with <a
			class="text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
			href="https://kit.svelte.dev">SvelteKit</a
		>
	</p>
	<p>{footerText}</p>
</footer>
