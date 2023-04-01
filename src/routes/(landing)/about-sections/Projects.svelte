<script lang="ts">
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
		},
		{
			name: 'Glowsquid',
			description: '[WIP] Next-gen minecraft launcher.',
			url: 'https://github.com/Glowsquid-launcher/glowsquid-new'
		},
		{
			name: 'Copper',
			description: 'Rust library for launching minecraft. Used in glowsquid.',
			url: 'https://github.com/Glowsquid-launcher/copper'
		},
		{
			name: '37 Ocean Breeze',
			description: 'Where happiness comes in waves.',
			url: 'https://37oceanbreeze.co.za'
		},
		{
			name: 'Chesscord',
			description: '[WIP] Chess bot for discord.',
			url: 'https://github.com/Suyashtnt/discord-chess-2'
		}
	];
</script>

<div
	class="
		pa-4 rounded-xl
		grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4
		bg-gradient-to-br
		from-light-blue via-light-lavender to-light-red
		dark:from-dark-blue dark:from-dark-lavender dark:to-dark-red
		"
>
	{#each projects as project}
		<a href={project.url} class="decoration-none text-light-text dark:text-dark-text">
			<Atropos class="rounded-xl group h-full" highlight={false}>
				<div
					class="
						rounded-2xl pa-2 h-full
						bg-gradient-to-tl from-light-blue to-light-lavender dark:from-dark-blue dark:to-light-lavender
						transition-colors box-border
						group-hover:bg-gradient-to-br
						group-hover:from-light-sapphire group-hover:to-light-mauve
						dark:group-hover:from-dark-sapphire dark:group-hover:to-dark-mauve
					"
				>
					<div
						class="
						rounded-xl flex flex-col items-center justify-between h-full pa-2 box-border
						bg-light-mantle dark:bg-dark-mantle
						"
						data-atropos-offset="2"
					>
						<h2
							class="
							text-5xl mb-0 text-center
							transition-all
							group-hover:bg-gradient-to-br
							from-light-sapphire via-light-lavender to-light-mauve group-hover:bg-clip-text group-hover:text-transparent
							dark:from-dark-sapphire dark:via-dark-lavender dark:to-dark-mauve text-light-text dark:text-dark-text
							"
							data-atropos-offset="3"
						>
							{project.name}
						</h2>
						<p
							class="text-2xl text-center text-light-text dark:text-dark-text"
						>
							{project.description}
						</p>
						<div class="flex flex-col space-y-2 mb-2 w-full">
							<a
								href={project.url}
								class="
								text-2xl rounded-xl pa-2 text-center decoration-none transition-all
								bg-light-maroon dark:bg-dark-maroon
								text-light-mantle visited:text-light-mantle dark:text-dark-mantle visited:dark:text-dark-mantle
								"
							>
								Learn more ->
							</a>
						</div>
					</div>
				</div>
			</Atropos>
		</a>
	{/each}
</div>