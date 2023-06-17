<script lang="ts">
    export let title: string | undefined;
    export let description: string;

    const siteTitle = 'TNTMan1671';
    const formattedTitle = title ? `${title} | ${siteTitle}` : siteTitle;
</script>

<svelte:head>
    <title>{formattedTitle}</title>
    <meta name="description" content={description} />

    <meta property="og:site_name" content={siteTitle} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
</svelte:head>
