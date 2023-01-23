<script lang="ts">
    import TagCloud from "TagCloud"

    const languages = ["javascript", "typescript", "rust"]
    let container: HTMLElement | null = null
    let mergedTagCloud: ReturnType<typeof TagCloud> | null = null

    $: if (container) mergedTagCloud = TagCloud(container, [...languages], {
        maxSpeed: "slow",
        radius: 300
    })
</script>

<section class="flex justify-around align-center bg-light-surface-0 dark:bg-dark-surface-0">
    <h1 class="text-8xl">
        Interests
    </h1>
    <div id="tagcloud" bind:this={container} />
</section>