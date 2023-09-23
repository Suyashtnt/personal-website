<script context="module" lang="ts">
    export interface IProject {
        description: string;
        name: string;
        url: string;
    }
</script>

<script lang="ts">
    export let project: IProject;
</script>

<a
    class="group text-light-text decoration-none dark:text-dark-text"
    href={project.url}
>
    <div
        class="box-border h-full rounded-2xl from-light-blue to-light-lavender bg-gradient-to-tl pa-2 transition-all dark:from-dark-blue group-hover:from-light-sapphire dark:to-light-lavender group-hover:to-light-mauve group-hover:bg-gradient-to-br group-hover:shadow-2xl dark:group-hover:from-dark-sapphire dark:group-hover:to-dark-mauve"
    >
        <div
            class="box-border h-full flex flex-col items-center justify-between rounded-xl bg-light-mantle pa-2 dark:bg-dark-mantle"
        >
            <h2
                class="mb-0 from-light-sapphire via-light-lavender to-light-mauve text-center text-5xl text-light-text transition-all dark:from-dark-sapphire dark:via-dark-lavender dark:to-dark-mauve group-hover:bg-gradient-to-br group-hover:bg-clip-text dark:text-dark-text group-hover:text-transparent"
            >
                {project.name}
            </h2>
            <p
                class="text-center text-xl text-light-text dark:text-dark-text"
            >
                {project.description}
            </p>
            <div class="mb-2 flex flex-col space-y-2">
                <a
                    class="rounded-xl bg-transparent pa-2 text-center text-xl text-light-text decoration-none outline-light-maroon outline transition-all group-hover:(bg-light-maroon text-2xl tracking-wider text-light-mantle outline-0 dark:bg-dark-maroon dark:text-dark-mantle visited:text-light-mantle visited:dark:text-dark-mantle) dark:text-dark-text visited:text-light-text dark:outline-dark-maroon visited:dark:text-dark-text"
                    href={project.url}
                >
                    Learn more →
                </a>
            </div>
        </div>
    </div>
</a>
