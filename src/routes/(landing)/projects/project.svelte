<script context="module" lang="ts">
    export interface IProject {
        description: string;
        name: string;
        url: string;
    }
</script>

<script lang="ts">
    import Atropos from 'atropos/svelte';

    export let project: IProject;
</script>

<a
    href={project.url}
    class="decoration-none text-light-text dark:text-dark-text"
>
    <Atropos class="rounded-xl group h-full">
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
