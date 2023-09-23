<script lang="ts">
    import {page} from '$app/stores';
    import '$lib/fonts/Anicons_webfont_kit/anicons-regular.css';
    import {slide} from 'svelte/transition';

    let selected: 'about' | 'blog' | 'contact' | 'landing' =
        'landing';

    $: if ($page) {
        selected = 'landing';

        if ($page.url.pathname.split('/')[1] === 'posts') {
            selected = 'blog';
        } else {
            switch ($page.url.hash) {
                case '#landing': {
                    selected = 'landing';
                    break;
                }

                case '#about': {
                    selected = 'about';
                    break;
                }

                case '#contact': {
                    selected = 'contact';
                    break;
                }

                default: {
                    selected = 'landing';
                }
            }
        }
    }

    $: element = $page.url.pathname.split('/')[1];
    $: isHomePage =
        element &&
        ['/', 'games', 'projects', 'skills'].includes(element);

    const onNavigate = () => {
        mobileHambugerMenuOpen = false;
    };

    let mobileHambugerMenuOpen = false;
</script>

{#if mobileHambugerMenuOpen}
    <div
        class="fixed z-2 h-screen w-screen flex flex-col justify-center gap-16 bg-light-mantle/80 text-left text-6xl backdrop-blur-lg bg-hero-polka-dots-light-base/20 dark:bg-dark-mantle/80 dark:bg-hero-polka-dots-dark-base/20"
    >
        {#if isHomePage}
            <a
                class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                data-selected={selected === 'landing'}
                href="#landing"
                on:click={onNavigate}
            >
                <span class="anicon">M</span>
                Landing
            </a>
            <a
                class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                data-selected={selected === 'about'}
                href="#about"
                on:click={onNavigate}
            >
                <span class="anicon">M</span>
                About
            </a>
            <a
                class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                data-selected={selected === 'contact'}
                href="#contact"
                on:click={onNavigate}
            >
                <span class="anicon">M</span>
                Contact
            </a>
        {:else}
            <a
                class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                data-selected={selected === 'landing'}
                href="/"
                on:click={onNavigate}
            >
                <span class="anicon">M</span>
                Home
            </a>
        {/if}
        <a
            class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
            data-selected={selected === 'blog'}
            href="/posts"
            on:click={onNavigate}
        >
            <span class="anicon">M</span>
            Posts
        </a>
    </div>
{/if}

<nav class="top-0 z-10 pa-2" transition:slide>
    <div
        class="flex items-center justify-between border-4 border-light-mantle/80 rounded-xl border-solid bg-light-mantle/20 px-4 backdrop-blur-sm bg-hero-diagonal-lines-light-base/40 dark:border-dark-mantle/50 dark:bg-dark-mantle/40 sm:px-8 dark:bg-hero-diagonal-lines-dark-overlay-0/40"
    >
        <h1>
            <a
                class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                href="/"
            >
                TNTMAN_1671
            </a>
        </h1>
        <div class="hidden text-center text-2xl sm:block">
            {#if isHomePage}
                <a
                    class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                    data-selected={selected === 'landing'}
                    href="#landing"
                    on:click={onNavigate}
                >
                    <span class="anicon">M</span>
                    Landing
                </a>
                <a
                    class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                    data-selected={selected === 'about'}
                    href="#about"
                    on:click={onNavigate}
                >
                    <span class="anicon">M</span>
                    About
                </a>
                <a
                    class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                    data-selected={selected === 'contact'}
                    href="#contact"
                    on:click={onNavigate}
                >
                    <span class="anicon">M</span>
                    Contact
                </a>
            {:else}
                <a
                    class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                    data-selected={selected === 'landing'}
                    href="/"
                    on:click={onNavigate}
                >
                    <span class="anicon">M</span>
                    Home
                </a>
            {/if}
            <a
                class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                data-selected={selected === 'blog'}
                href="/posts"
                on:click={onNavigate}
            >
                <span class="anicon">M</span>
                Posts
            </a>
        </div>
        <button
            class="dropdown-icon border-none bg-transparent text-5xl text-light-text sm:hidden hover:cursor-pointer dark:text-dark-text"
            data-active={mobileHambugerMenuOpen}
            id="dropdown-button"
            on:click={() => {
                mobileHambugerMenuOpen = !mobileHambugerMenuOpen;
            }}
        >
            A
        </button>
    </div>
</nav>

<style>
    .anicon {
        font-family: 'Anicons Regular', sans-serif;
        font-variation-settings: 'TIME' 100;
        transition: all 0.2s cubic-bezier(0.64, 0.57, 0.67, 1.53);
    }

    .dropdown-icon {
        font-family: 'Anicons Regular', sans-serif;
        font-variation-settings: 'TIME' 1;
        transition: all 0.4s ease;
    }

    .dropdown-icon[data-active='true'] {
        font-variation-settings: 'TIME' 100;
    }

    a:hover .anicon {
        font-variation-settings: 'TIME' 1;
    }

    a[data-selected='true'] .anicon {
        font-variation-settings: 'TIME' 1;
    }
</style>
