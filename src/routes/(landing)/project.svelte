<script context="module" lang="ts">
	export interface IProject {
		description: string;
		name: string;
		url: string;
	}
</script>

<script lang="ts">
	interface Props {
		project: IProject;
	}
	const { project }: Props = $props();
</script>

<a class="group box-border h-full rounded-2xl decoration-none" href={project.url}>
	<div
		class="dark:bg-dark-mantle box-border h-full flex-col items-center justify-between gap-2 rounded-xl bg-light-mantle pa-2 flex"
	>
		<h2
			class="dark:from-dark-sapphire dark:via-dark-lavender dark:text-dark-text ma-0 from-light-sapphire via-light-lavender to-light-mauve text-center text-3xl text-light-text transition-all dark:to-dark-mauve group-hover:bg-gradient-to-br group-hover:bg-clip-text group-hover:text-transparent group-hover:casl"
		>
			{project.name}
		</h2>
		<p class="dark:text-dark-text ma-0 text-center text-xl text-light-text">
			{project.description}
		</p>
		<div class="mb-2 flex-col space-y-2 flex">
			<span
				class="dark:text-dark-text dark:outline-dark-maroon visited:dark:text-dark-text group-hover:dark:bg-dark-maroon group-hover:dark:text-dark-mantle group-hover:visited:dark:text-dark-mantle rounded-xl bg-transparent pa-2 text-center text-xl text-light-text decoration-none outline-light-maroon outline transition-all group-hover:(bg-light-maroon text-2xl text-light-mantle tracking-wider outline-0 visited:text-light-mantle) visited:text-light-text"
			>
				Learn more →
			</span>
		</div>
	</div>
</a>
