<script lang="ts">
	import { onMount } from "svelte";
	import { useStoryblokBridge, StoryblokComponent } from "@storyblok/svelte";

	export let data;

	onMount(() => {
		useStoryblokBridge(
			data.story.id,
			(newStory) => (data.story = newStory)
		);
	});
</script>

{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}