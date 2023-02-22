<script lang="ts">
	import { autoHash } from '$lib/autohash';
	import Atropos from 'atropos/svelte';

	interface Project {
		name: string;
		description: string;
		url: string;
	}

	const projects: Project[] = [
		{
			name: 'Commafiles',
			description: 'My NixOS system configuration.',
			url: 'https://github.com/Suyashtnt/commafiles'
		}
	];
</script>

<section class="bg-light-base dark:bg-dark-base lg:mx-24" id="projects" use:autoHash>
	<h1
		class="pb-2 text-7xl w-full md:w-min text-center md:text-right md:text-8xl bg-gradient-to-br from-light-sapphire via-light-lavender to-light-mauve dark:from-dark-sapphire dark:via-dark-lavender dark:to-dark-mauve bg-clip-text text-transparent"
	>
		Projects
	</h1>

	<div
		class="pa-4 lg:pa-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:rounded-xl bg-gradient-to-br from-light-blue via-light-lavender to-light-red dark:from-dark-blue dark:from-dark-lavender dark:to-dark-red"
	>
		{#each projects as project}
			<a href={project.url} class="contents decoration-none text-light-text dark:text-dark-text">
				<Atropos class="rounded-xl group">
					<div
						class="
							h-min rounded-2xl pa-2
							bg-gradient-to-tl from-light-blue to-light-lavender dark:from-dark-blue dark:to-light-lavender
							transition-colors
							group-hover:bg-gradient-to-br group-hover:from-light-sapphire group-hover:to-light-mauve dark:group-hover:from-dark-sapphire dark:group-hover:to-dark-mauve
						"
					>
						<div
							class="
							rounded-xl flex flex-col items-center justify-center
							bg-light-mantle dark:bg-dark-mantle
							"
							data-atropos-offset="2"
						>
							<div
								class="w-4/5 flex flex-col items-center justify-center transition-all group-hover:pa-1"
							>
								<h2
									class="
									text-5xl mb-0
									transition-all
									group-hover:bg-gradient-to-br from-light-sapphire via-light-lavender to-light-mauve dark:from-dark-sapphire dark:via-dark-lavender dark:to-dark-mauve text-light-text dark:text-dark-text group-hover:bg-clip-text group-hover:text-transparent
									group-hover:tracking-wide group-hover:text-6xl
									"
									data-atropos-offset="3"
								>
									{project.name}
								</h2>
								<p
									class="text-2xl text-center text-light-text dark:text-dark-text transition-all group-hover:text-4xl"
								>
									{project.description}
								</p>
								<div class="flex flex-col space-y-2 mb-2 w-full">
									<a
										href={project.url}
										class="
										text-2xl rounded-xl pa-2 text-center decoration-none transition-all
										bg-light-maroon dark:bg-dark-maroon
										text-light-text visited:text-light-text dark:text-dark-text visited:dark:text-dark-text
										group-hover:tracking-[0.3rem] group-hover:transform group-hover:scale-110
										"
									>
										Learn more ->
									</a>
								</div>
							</div>
						</div>
					</div>
				</Atropos>
			</a>
		{/each}
	</div>
</section>
