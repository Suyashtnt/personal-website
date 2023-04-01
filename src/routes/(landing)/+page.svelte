<script lang="ts">
	import Hero from './Hero.svelte';
	import About from './About.svelte';
	import Contact from './Contact.svelte';
</script>

<Hero />
<About />
<div class="spacer about-to-blog" />
<Contact />

<style>
	.spacer {
		aspect-ratio: 960 / 150;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}

	@media (prefers-color-scheme: dark) {
		.about-to-blog {
			background-image: url('$lib/pictures/interestsToProjectsDark.svg');
		}
	}

	@media (prefers-color-scheme: light) {
		.about-to-blog {
			background-image: url('$lib/pictures/interestsToProjectsLight.svg');
		}
	}
</style>
