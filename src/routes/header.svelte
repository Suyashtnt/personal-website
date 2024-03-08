<script lang="ts">
	import * as m from '$i18n/messages';
  import Menu from '~icons/ic/menu'
  import Arrow from '~icons/ic/play-arrow'

	import LanguagePicker from './languagePicker.svelte';

  let dropdownOpen = false
</script>

<nav class="flex rel sticky@sm align-items:center bd:blur(8x) border:2|subtle/.80 justify-content:space-between mb:4x mx:4x r:4x top:4x z:10">
    <section class="flex align-items:center flex:grow gap:2x justify-content:space-between">
        <a
            class="flex place-items:center"
            href="/posts/the-wobbler"
        >
            <enhanced:img
                alt="TNTMAN_1671"
                class={"aspect-square size:8x r:full align-items:center ~duration:300 ~transform ~shadow {scale(1.15);r:2x;shadow:4x}:hover block"}
                sizes="32px 48px 64px"
                src="$lib/pictures/wobbler.png" />
        </a>

        <h1 class="text:4x my:0">
            <a
                class="text:base fg:base@visited fg:none"
                href="/"
            >
                TNTMAN_1671
            </a>
        </h1>
    </section>

    <button
        aria-controls="sweets-dropdown"
        aria-expanded={dropdownOpen}
        class="dropdown__title text:6x flex hidden@>2xs square align-items:center bg:surface border:none justify-items:center overflow:hidden r:4x"
        on:click={() => dropdownOpen = !dropdownOpen}
        type="button"
    >
        <Menu aria-label="Dropdown menu" class="inline-block" />
    </button>

    <div
        class={"links invisible abs left:50% top:calc(100%+0.25rem) flex:row transform:top rotate(90, 0) items-center items-center gap-8 r:4x bg:overlay bg:overlay/.3@2xs pa:2x text:center text:4x transition:all|300ms visible@2xs rel@2xs left:0@2xs top:0@2xs flex@2xs translate(-50%, 0) translate(0)@2xs rotate(0)@2xs gap:2x@2xs p:0@2xs pl:4x@2xs text:4x@2xs"}
    >
        <a class="flex align-items:center flex:row" href="/">
            <Arrow />
            {m.header_home()}
        </a>
        <a class="flex align-items:center flex:row" href="/posts">
            <Arrow />
            {m.header_posts()}
        </a>
        <LanguagePicker />
    </div>
</nav>

<style>
    nav {
        &:hover,
        &:focus-within {
            & .links {
                opacity: 1;
                transform: rotateX(0deg) translateX(-50%);
                visibility: visible;

                @media (min-width: 600px) {
                    transform: none;
                };
            }
        }
    }
</style>
