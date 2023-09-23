<script lang="ts">
    const potentialFooterTexts = [
        'Do you really need a footer?',
        'Hello welcome to the bottom of the page!',
        'Why do websites even have footers anymore?',
        'Footer disclaimer: We ran out of witty things to say.'
    ] as const;

    const footerText =
        potentialFooterTexts[
            Math.floor(Math.random() * potentialFooterTexts.length)
        ];
</script>

<footer
    class="flex flex-col items-center justify-between bg-light-mantle px-2 text-light-text md:flex-row dark:bg-dark-mantle lg:px-16 dark:text-dark-text"
>
    <p class="text-2xl font-semibold">TNTMan1671</p>
    <p>
        Made with <a
            class="text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
            href="https://kit.svelte.dev">SvelteKit</a
        >
    </p>
    <p>{footerText}</p>
</footer>
