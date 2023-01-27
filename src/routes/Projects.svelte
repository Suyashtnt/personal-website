<script lang="ts">
	import Atropos from 'atropos/svelte';

	interface Project {
		name: string
		description: string
		url: string
	}

	const projects: Project[] = [
		{
			name: "Commafiles",
			description: "My NixOS system configuration.",
			url: "https://github.com/Suyashtnt/commafiles"
		}
	]
</script>

<section class="bg-light-base dark:bg-dark-base mx-24">
	<h1
		class="pb-2 text-8xl bg-gradient-to-br from-light-sapphire via-light-lavender to-light-mauve dark:from-dark-sapphire dark:via-dark-lavender dark:to-dark-mauve bg-clip-text text-transparent w-min"
	>
		Projects
	</h1>

	<div
		class="pa-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 rounded-xl bg-gradient-to-br from-light-blue via-light-lavender to-light-red dark:from-dark-blue dark:from-dark-lavender dark:to-dark-red"
	>
		{#each projects as project}
			<a href={project.url} class="contents decoration-none text-light-text dark:text-dark-text">
				<Atropos class="rounded-xl group">
					<div
						class="
							h-min rounded-2xl pa-2
							bg-gradient-to-br from-light-blue to-light-lavender dark:from-dark-blue dark:to-light-lavender
							transition-colors
							group-hover:from-light-sapphire group-hover:to-light-mauve dark:group-hover:from-dark-sapphire dark:group-hover:to-dark-mauve
						"
					>
						<div
							class="
							rounded-xl flex flex-col items-center justify-center
							bg-light-mantle dark:bg-dark-mantle
							"
							data-atropos-offset="2"
						>
							<h2
								class="
								text-5xl mb-0
								transition-colors
								group-hover:bg-gradient-to-br from-light-sapphire via-light-lavender to-light-mauve dark:from-dark-sapphire dark:via-dark-lavender dark:to-dark-mauve text-light-text dark:text-dark-text group-hover:bg-clip-text group-hover:text-transparent
								"
								data-atropos-offset="3"
							>
								{project.name}
							</h2>
							<p class="text-2xl text-center">{project.description}</p>
							<div class="flex flex-col space-y-2 pa-2 mb-2 w-4/5">
								<a href={project.url} class="text-2xl rounded-xl pa-2 text-center bg-light-blue dark:bg-dark-blue text-light-text visited:text-light-text dark:text-dark-text visited:dark:text-dark-text">Learn more -></a>
							</div>
						</div>
					</div>
				</Atropos>
			</a>
		{/each}
	</div>
</section>
