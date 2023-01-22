<script lang="ts">
    import './app.css'
    import '@fontsource/inter/400.css'
</script>

<main class="flex flex-col h-full bg-light-base text-light-text dark:bg-dark-base dark:text-dark-text">
    <slot />
</main>

<style uno:preflights uno:safelist global></style>