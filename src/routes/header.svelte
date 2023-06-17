<script lang="ts">
    import {slide} from 'svelte/transition';
    import {page} from '$app/stores';
    import '$lib/fonts/Anicons_webfont_kit/anicons-regular.css';

    let selected: 'about' | 'blog' | 'contact' | 'landing' = 'landing';

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
    $: isHomePage = element && ['/', 'games', 'projects', 'skills'].includes(element);

    const onNavigate = () => {
        mobileHambugerMenuOpen = false;
    };

    let mobileHambugerMenuOpen = false;

    let navUp = false;

    let scrollY = 0;
    let lastScrollY = scrollY;

    // Me when I steal react code to svelte code (https://www.codemzy.com/blog/react-sticky-header-disappear-scroll):
    const updateScrollDirection = () => {
        const direction = scrollY > lastScrollY;
        if (direction !== navUp && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
            navUp = direction;
        }

        lastScrollY = scrollY > 0 ? scrollY : 0;
    };
</script>

<svelte:window on:scroll={updateScrollDirection} bind:scrollY />

{#if mobileHambugerMenuOpen}
    <div
        class="
			text-6xl text-left
			h-screen w-screen fixed z-2
			flex flex-col justify-center gap-16
			bg-hero-polka-dots-light-base/20 dark:bg-hero-polka-dots-dark-base/20
			bg-light-mantle/80 dark:bg-dark-mantle/80 backdrop-blur-lg"
    >
        {#if isHomePage}
            <a
                href="#landing"
                data-selected={selected === 'landing'}
                class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text"
                on:click={onNavigate}
            >
                <span class="anicon">M</span>
                Landing
            </a>
            <a
                href="#about"
                data-selected={selected === 'about'}
                class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text"
                on:click={onNavigate}
            >
                <span class="anicon">M</span>
                About
            </a>
            <a
                href="#contact"
                data-selected={selected === 'contact'}
                class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text"
                on:click={onNavigate}
            >
                <span class="anicon">M</span>
                Contact
            </a>
        {:else}
            <a
                href="/"
                data-selected={selected === 'landing'}
                class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text"
                on:click={onNavigate}
            >
                <span class="anicon">M</span>
                Home
            </a>
        {/if}
        <a
            href="/posts"
            data-selected={selected === 'blog'}
            class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text"
            on:click={onNavigate}
        >
            <span class="anicon">M</span>
            Posts
        </a>
    </div>
{/if}

{#if !navUp}
    <nav class="pa-2 sticky top-0 z-10" transition:slide>
        <div
            class="
		flex justify-between items-center
		px-4 sm:px-8 rounded-xl
		border-solid border-4 border-light-mantle/80 dark:border-dark-mantle/50
		bg-hero-diagonal-lines-light-base/40 dark:bg-hero-diagonal-lines-dark-overlay-0/40
		bg-light-mantle/20 dark:bg-dark-mantle/40 backdrop-blur-sm"
        >
            <h1>
                <a
                    href="/"
                    class="text-light-text dark:text-dark-text visited:text-light-text dark:visited:text-dark-text decoration-none"
                >
                    TNTMAN_1671
                </a>
            </h1>
            <div class="text-2xl text-center hidden sm:block">
                {#if isHomePage}
                    <a
                        href="#landing"
                        data-selected={selected === 'landing'}
                        class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text"
                        on:click={onNavigate}
                    >
                        <span class="anicon">M</span>
                        Landing
                    </a>
                    <a
                        href="#about"
                        data-selected={selected === 'about'}
                        class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text"
                        on:click={onNavigate}
                    >
                        <span class="anicon">M</span>
                        About
                    </a>
                    <a
                        href="#contact"
                        data-selected={selected === 'contact'}
                        class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text"
                        on:click={onNavigate}
                    >
                        <span class="anicon">M</span>
                        Contact
                    </a>
                {:else}
                    <a
                        href="/"
                        data-selected={selected === 'landing'}
                        class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text"
                        on:click={onNavigate}
                    >
                        <span class="anicon">M</span>
                        Home
                    </a>
                {/if}
                <a
                    href="/posts"
                    data-selected={selected === 'blog'}
                    class="decoration-none text-light-text visited:text-light-text dark:text-dark-text dark:visited:text-dark-text"
                    on:click={onNavigate}
                >
                    <span class="anicon">M</span>
                    Posts
                </a>
            </div>
            <button
                on:click={() => {
                    mobileHambugerMenuOpen = !mobileHambugerMenuOpen;
                }}
                class="dropdown-icon text-5xl bg-transparent border-none text-light-text dark:text-dark-text hover:cursor-pointer sm:hidden"
                id="dropdown-button"
                data-active={mobileHambugerMenuOpen}
            >
                A
            </button>
        </div>
    </nav>
{/if}

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
