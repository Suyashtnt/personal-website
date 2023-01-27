<script lang="ts">
	import Hero from './Hero.svelte';
	import Interests from './Interests.svelte';
	import Projects from './Projects.svelte';
</script>

<Hero />
<Interests />
<div class="spacer interests-to-projects" />
<Projects />

<style>
	.spacer {
		aspect-ratio: 960 / 150;
		width: 100%;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}

	.interests-to-projects {
		background-image: url('./interestsToProjects.svg');
	}
</style>
