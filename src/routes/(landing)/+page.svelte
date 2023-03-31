<script lang="ts">
	import Hero from './Hero.svelte';
	import About from './About.svelte';
</script>

<Hero />
<About />
<!-- <div class="spacer interests-to-projects" />
<Projects /> -->

<style>
	.spacer {
		aspect-ratio: 960 / 150;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}

	@media (prefers-color-scheme: dark) {
		.interests-to-projects {
			background-image: url('$lib/pictures/interestsToProjectsDark.svg');
		}
	}

	@media (prefers-color-scheme: light) {
		.interests-to-projects {
			background-image: url('$lib/pictures/interestsToProjectsLight.svg');
		}
	}
</style>
