<script lang="ts">
    import '@fontsource/inter/400.css';
    import '@fontsource/inter/600.css';
    import Header from './header.svelte';
    import Footer from './footer.svelte';
</script>

<Header />
<main class="bg-light-base text-light-text dark:bg-dark-base dark:text-dark-text">
    <slot />
</main>
<Footer />

<!-- Due to the new way unocss svelte-scoped works, we need to use this -->
<style lang="scss" global>
    a {
        --at-apply: 'text-light-blue visited:text-light-lavender dark:text-dark-blue dark:visited:text-dark-lavender';
    }

    body {
        font-family: 'Inter', sans-serif;
        min-height: 100vh;

        &:has(#dropdown-button[data-active='true']) {
            overflow: hidden;
        }
    }

    html,
    body {
        scroll-behavior: smooth;
        --at-apply: 'bg-light-base dark:bg-dark-base';
    }
</style>
