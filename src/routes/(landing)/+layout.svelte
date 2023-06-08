<script lang="ts">
	import { page } from '$app/stores';
	import Tab from '$lib/components/tabs/Tab.svelte';
	import Tabs from '$lib/components/tabs/Tabs.svelte';
	import { fly } from 'svelte/transition';
	import Hero from './Hero.svelte';
	import Contact from './Contact.svelte';
	import AboutToBlog from './AboutToBlog.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
</script>

<PageHead description="Hi, I'm TNTMan1671." />

<Hero />

<section class="bg-light-surface-0 dark:bg-dark-surface-0 py-8 md:px-8 overflow-clip" id="about">
	<Tabs class="mb-4">
		<Tab name="Skills" path="/skills" />
		<Tab name="Projects" path="/projects" />
		<Tab name="Games" path="/games" />
	</Tabs>

	{#key $page.url.pathname}
		<div out:fly|global={{ duration: 300, x: '100%' }} in:fly|global={{ delay: 300, duration: 300, x: '-100%' }}>
			<slot />
		</div>
	{/key}
</section>

<AboutToBlog />

<Contact />
