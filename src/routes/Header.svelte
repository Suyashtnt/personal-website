<script lang="ts">
    import { page } from "$app/stores";
	import { observers } from "$lib/autohash";
    let selected: 'landing' | 'about' | 'contact' = 'landing';

    $: if($page) {
        switch($page.url.hash) {
            case '#landing': selected = 'landing'; break;
            case '#about': selected = 'about'; break;
            default: selected = 'landing';
        }
    }

    const onNavigate = () => {
        $observers.forEach(observer => observer.observer.disconnect());

        setTimeout(() => {
            $observers.forEach(observer => observer.observer.observe(observer.target));
        }, 1000);
    }
</script>

<svelte:head>
    <link href="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1581441981/Anicons/anicons-regular.css" rel="stylesheet">
</svelte:head>

<nav class="pa-2 sticky top-0 z-10">
    <div class="
        flex justify-between items-center
        px-8 rounded-xl
        border-solid border-4 border-light-mantle/80 dark:border-dark-mantle/50
        bg-light-mantle/20 dark:bg-dark-mantle/40 backdrop-blur-sm"
    >
        <h1>TNTMAN_1671</h1>
        <div class="text-2xl text-center">
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
        </div>
    </div>
</nav>

<style>
    .anicon {
        font-family: "Anicons Regular", sans-serif;
        font-variation-settings: "TIME" 100;
        transition: all 0.1s cubic-bezier(0.64, 0.57, 0.67, 1.53);
    }

    a:hover .anicon {
        font-variation-settings: "TIME" 1;
    }

    a[data-selected="true"] .anicon {
        font-variation-settings: "TIME" 1;
    }
</style>