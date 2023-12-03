<script lang="ts">
	const potentialFooterTexts = [
		'Do you really need a footer?',
		'Hello welcome to the bottom of the page!',
		'Why do websites even have footers anymore?',
		'Footer disclaimer: We ran out of witty things to say.'
	] as const;

	const footerText =
		potentialFooterTexts[Math.floor(Math.random() * potentialFooterTexts.length)];
</script>

<footer
	class="flex flex-col items-center justify-between rounded-t-2xl bg-light-mantle px-2 text-light-text lg:mx-8 lg:mb-8 md:flex-row dark:bg-dark-surface_background lg:px-16 dark:text-dark-surface_foreground"
>
    <p class="my-4 text-2xl font-semibold">TNTMan1671</p>
    <p>{footerText}</p>
</footer>
