<script lang="ts">
    import Project, {type IProject} from './project.svelte';

    const projects: IProject[] = [
        {
            description: 'This very website!',
            name: 'Personal website',
            url: 'https://github.com/suyashtnt/personal-website'
        },
        {
            description: '[WIP] Next-generation minecraft launcher',
            name: 'Glowsquid',
            url: 'https://github.com/glowsquid-launcher/glowsquid-new'
        },
        {
            description: 'My NixOS configuration',
            name: 'Commafiles',
            url: 'https://github.com/suyashtnt/commafiles'
        },
        {
            description: '[WIP] Minecraft launching rust crate',
            name: 'Copper',
            url: 'https://github.com/glowsquid-launcher/copper'
        },
        {
            description: 'Small website I made for a bit of my grade 8 Afrikaans and LO projects',
            name: 'Afr School Website',
            url: 'https://afr-school-website.vercel.app'
        },
        {
            description: '🚀A blazingly fast fizzbuzz implementation in rust🚀',
            name: 'FizzBuzz',
            url: 'https://github.com/Suyashtnt/fizzbuzz'
        }
    ];
</script>

<ul class="rounded-xl projects list-none">
    {#each projects as project (project.name)}
        <li>
            <Project {project} />
        </li>
    {/each}
</ul>

<style>
    /* stolen from https://css-tricks.com/an-auto-filling-css-grid-with-max-columns/ */
    .projects {
        /**
    * User input values.
    */
        --grid-layout-gap: 1rem;
        --grid-column-count: 6;
        --grid-item--min-width: 400px;

        /**
    * Calculated values.
    */
        --gap-count: calc(var(--grid-column-count) - 1);
        --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
        --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

        display: grid;
        grid-template-columns: repeat(
            auto-fill,
            minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
        );
        grid-gap: var(--grid-layout-gap);
    }
</style>
