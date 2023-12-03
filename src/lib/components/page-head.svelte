<script lang="ts">
	export let title: string | undefined;
	export let description: string;

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
