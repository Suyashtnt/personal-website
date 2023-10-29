<script lang="ts">
    import { browser } from '$app/environment';
    import { enhance } from '$app/forms';
    import {page} from '$app/stores';
    import '$lib/fonts/Anicons_webfont_kit/anicons-regular.css';
    import { availableLanguageTags } from '@inlang/paraglide-js/website'
    import * as m from '@inlang/paraglide-js/website/messages'

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
                {m.header_landing()}
            </a>
            <a
                class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                data-selected={selected === 'about'}
                href="#about"
                on:click={onNavigate}
            >
                <span class="anicon">M</span>
                {m.header_about()}
            </a>
            <a
                class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                data-selected={selected === 'contact'}
                href="#contact"
                on:click={onNavigate}
            >
                <span class="anicon">M</span>
                {m.header_contact()}
            </a>
        {:else}
            <a
                class="text-light-text decoration-none dark:text-dark-text visited:text-light-text dark:visited:text-dark-text"
                data-selected={selected === 'landing'}
                href="/"
                on:click={onNavigate}
            >
                <span class="anicon">M</span>
                {m.header_home()}
            </a>
        {/if}
        <a
            class="text-light-text decoration-none transition-all dark:text-dark-text visited:text-light-text hover:casl dark:visited:text-dark-text"
            data-selected={selected === 'blog'}
            href="/posts"
            on:click={onNavigate}
        >
            <span class="anicon">M</span>
            {m.header_posts()}
        </a>
        <div class="flex-inline flex-row content-center rounded-lg bg-light-base/80 pa-2 text-light-text decoration-none dark:bg-dark-base/80 dark:text-dark-text visited:text-light-text dark:visited:text-dark-text">
            <div class="i-ic-language inline-block h-8 w-8" />
            <form
                action="/"
                method="POST"
                use:enhance
            >
                <select
                    class="border-none bg-transparent text-xl text-light-text dark:text-dark-text"
                    name="language"
                    on:change={() => {
                        document.getElementById(
                            'language-submit-button'
                        )?.click();
                    }}
                >
                    {#each availableLanguageTags as language}
                        <option
                            selected={language === $page.data.language}
                            value={language}
                        >
                            {language}
                        </option>
                    {/each}
                </select>
                <button
                    class="i-ic-arrow-forward h-4 w-4"
                    class:hidden={browser}
                    id="language-submit-button"
                    type="submit"
                >
            </form>
        </div>
    </div>
{/if}

<nav class="top-0 z-10 pa-2">
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
        <div class="hidden flex-row items-center gap-2 text-center text-2xl sm:flex">
            {#if isHomePage}
                <a
                    class="text-light-text decoration-none transition-all transition-ease-in-out dark:text-dark-text visited:text-light-text hover:casl dark:visited:text-dark-text"
                    data-selected={selected === 'landing'}
                    href="#landing"
                    on:click={onNavigate}
                >
                    <span class="anicon">M</span>
                    {m.header_landing()}
                </a>
                <a
                    class="text-light-text decoration-none transition-all transition-ease-in-out dark:text-dark-text visited:text-light-text hover:casl dark:visited:text-dark-text"
                    data-selected={selected === 'about'}
                    href="#about"
                    on:click={onNavigate}
                >
                    <span class="anicon">M</span>
                    {m.header_about()}
                </a>
                <a
                    class="text-light-text decoration-none transition-all dark:text-dark-text visited:text-light-text hover:casl dark:visited:text-dark-text"
                    data-selected={selected === 'contact'}
                    href="#contact"
                    on:click={onNavigate}
                >
                    <span class="anicon">M</span>
                    {m.header_contact()}
                </a>
            {:else}
                <a
                    class="text-light-text decoration-none transition-all dark:text-dark-text visited:text-light-text hover:casl dark:visited:text-dark-text"
                    data-selected={selected === 'landing'}
                    href="/"
                    on:click={onNavigate}
                >
                    <span class="anicon">M</span>
                    {m.header_home()}
                </a>
            {/if}
            <a
                class="text-light-text decoration-none transition-all dark:text-dark-text visited:text-light-text hover:casl dark:visited:text-dark-text"
                data-selected={selected === 'blog'}
                href="/posts"
                on:click={onNavigate}
            >
                <span class="anicon">M</span>
                {m.header_posts()}
            </a>
            <div class="flex-inline flex-row content-center rounded-lg bg-light-base/80 pa-2 text-light-text decoration-none dark:bg-dark-base/80 dark:text-dark-text visited:text-light-text dark:visited:text-dark-text">
                <div class="i-ic-language inline-block h-8 w-8" />
                <form
                    action="/"
                    method="POST"
                    use:enhance
                >
                    <select
                        class="border-none bg-transparent text-xl text-light-text dark:text-dark-text"
                        name="language"
                        on:change={() => {
                            document.getElementById(
                                'language-submit-button'
                            )?.click();
                        }}
                    >
                        {#each availableLanguageTags as language}
                            <option
                                selected={language === $page.data.language}
                                value={language}
                            >
                                {language}
                            </option>
                        {/each}
                    </select>
                    <button
                        class="i-ic-arrow-forward h-4 w-4"
                        class:hidden={browser}
                        id="language-submit-button"
                        type="submit"
                    >
                </form>
            </div>
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
