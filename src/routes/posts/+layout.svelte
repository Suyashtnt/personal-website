<svelte:head>
	<link
		href="/atom.xml"
		rel="alternate"
		title="The Badly Drawn Blog (Atom Feed)"
		type="application/atom+xml"
	/>
</svelte:head>

<script>
    const { children } = $props();
</script>

{@render children()}
