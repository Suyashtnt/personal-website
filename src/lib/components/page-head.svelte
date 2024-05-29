<script lang="ts">
    interface Props {
        description: string;
        title?: string;
    }

    const { description, title }: Props = $props();

    const siteTitle = 'TNTMan1671';
    const formattedTitle = title ? `${title} | ${siteTitle}` : siteTitle;
</script>

<svelte:head>
    <title>{formattedTitle}</title>
    <meta content={description} name="description" />

    <meta content={siteTitle} property="og:site_name" />
    <meta content={title} property="og:title" />
    <meta content={description} property="og:description" />
</svelte:head>
