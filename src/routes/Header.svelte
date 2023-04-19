<script lang="ts">
    import { page } from "$app/stores";
	import { observers } from "$lib/autohash";
	import { slide } from "svelte/transition";

    let selected: 'landing' | 'about' | 'contact' | 'blog' = 'landing';

    $: if($page) {
        // if home page, set selected to landing
        selected = 'landing';

        if ($page.url.pathname === '/posts') {
            selected = 'blog';
        } else {
            switch($page.url.hash) {
                case '#landing': selected = 'landing'; break;
                case '#about': selected = 'about'; break;
                case '#contact': selected = 'contact'; break;
                default: selected = 'landing';
            }
        }
    }

    $: isHomePage = $page && $page.url.pathname === '/';

    const onNavigate = () => {
        mobileHambugerMenuOpen = false;
        $observers.forEach(observer => observer.observer.disconnect());

        setTimeout(() => {
            $observers.forEach(observer => observer.observer.observe(observer.target));
        }, 1000);
    }

    let mobileHambugerMenuOpen = false;
</script>

<svelte:head>
    <link href="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1581441981/Anicons/anicons-regular.css" rel="stylesheet">
</svelte:head>

{#if mobileHambugerMenuOpen}
    <div
        class="
            text-6xl text-left
            h-screen w-screen fixed z-2
            flex flex-col justify-center gap-16
            bg-light-mantle/80 dark:bg-dark-mantle/80 backdrop-blur-lg"
        transition:slide={{duration: 400, axis: 'y'}}
    >
        {#if isHomePage}
            <a href="#landing" data-selected={selected === 'landing'} class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text" on:click={onNavigate}>
                <span class="anicon">M</span>
                Landing
            </a>
            <a href="#about" data-selected={selected === 'about'} class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text" on:click={onNavigate}>
                <span class="anicon">M</span>
                About
            </a>
            <a href="#contact" data-selected={selected === 'contact'} class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text" on:click={onNavigate}>
                <span class="anicon">M</span>
                Contact
            </a>
        {/if}
        <a href="/posts" data-selected={selected === 'blog'} class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text" on:click={onNavigate}>
            <span class="anicon">M</span>
            Posts
        </a>
    </div>
{/if}

<nav class="pa-2 sticky top-0 z-10">
    <div class="
        flex justify-between items-center
        px-4 sm:px-8 rounded-xl
        border-solid border-4 border-light-mantle/80 dark:border-dark-mantle/50
        bg-light-mantle/20 dark:bg-dark-mantle/40 backdrop-blur-sm"
    >
        <h1>TNTMAN_1671</h1>
        <div class="text-2xl text-center hidden sm:block">
            {#if isHomePage}
                <a href="#landing" data-selected={selected === 'landing'} class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text" on:click={onNavigate}>
                    <span class="anicon">M</span>
                    Landing
                </a>
                <a href="#about" data-selected={selected === 'about'} class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text" on:click={onNavigate}>
                    <span class="anicon">M</span>
                    About
                </a>
                <a href="#contact" data-selected={selected === 'contact'} class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text" on:click={onNavigate}>
                    <span class="anicon">M</span>
                    Contact
                </a>
            {:else}
                <a href="/" data-selected={selected === 'landing'} class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text" on:click={onNavigate}>
                    <span class="anicon">M</span>
                    Home
                </a>
            {/if}
            <a href="/posts" data-selected={selected === 'blog'} class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text" on:click={onNavigate}>
                <span class="anicon">M</span>
                Posts
            </a>
        </div>
        <button
            on:click={() => mobileHambugerMenuOpen = !mobileHambugerMenuOpen}
            class="dropdown-icon text-5xl bg-transparent border-none text-light-text dark:text-dark-text hover:cursor-pointer sm:hidden"
            id="dropdown-button"
            data-active={mobileHambugerMenuOpen}
        >
            A
        </button>
    </div>
</nav>

<style>
    .anicon {
        font-family: "Anicons Regular", sans-serif;
        font-variation-settings: "TIME" 100;
        transition: all 0.2s cubic-bezier(0.64, 0.57, 0.67, 1.53);
    }

    .dropdown-icon {
        font-family: "Anicons Regular", sans-serif;
        font-variation-settings: "TIME" 1;
        transition: all 0.4s ease;
    }

    .dropdown-icon[data-active="true"] {
        font-variation-settings: "TIME" 100;
    }

    a:hover .anicon {
        font-variation-settings: "TIME" 1;
    }

    a[data-selected="true"] .anicon {
        font-variation-settings: "TIME" 1;
    }
</style>