<script lang="ts">
	import * as m from '$i18n/messages';
	import Menu from '~icons/material-symbols/menu-rounded';
	import Link from '~icons/material-symbols/open-in-new';
	import Arrow from '~icons/material-symbols/play-arrow';

	import LanguagePicker from './languagePicker.svelte';

	let dropdownOpen = false;
</script>

<nav
	class="flex rel sticky@sm align-items:center bd:blur(8x) border:2|subtle/.80 h:12x justify-content:space-between mb:4x mx:4x r:6x top:4x z:10"
>
	<section class="flex align-items:center flex:grow gap:2x justify-content:space-between">
		<a class="flex place-items:center" href="/posts/the-wobbler">
			<enhanced:img
				alt="TNTMAN_1671"
				class={'aspect-square size:12x r:full align-items:center ~duration:300 ~transform ~shadow {scale(1.3);r:2x;shadow:4x}:hover block'}
				sizes="32px 48px 64px"
				src="$lib/pictures/wobbler.png"
			>
			</enhanced:img>
		</a>

		<h1 class="text:6x my:0">
			<a class="fg:none fg:base@visited text:base" href="/"> TNTMAN_1671 </a>
		</h1>
	</section>

	<button
		aria-controls="sweets-dropdown"
		aria-expanded={dropdownOpen}
		class="dropdown__title text:6x flex hidden@2xs square align-items:center bg:surface border:none justify-content:center overflow:hidden r:6x size:12x"
		on:click={() => (dropdownOpen = !dropdownOpen)}
		type="button"
	>
		<Menu aria-label="Dropdown menu" class="inline-block" />
	</button>

	<div
		class={'w:80%@<2xs links invisible abs left:50% top:calc(100%+1rem) flex:row transform:top rotate(90,0) r:6x bg:text-primary@2xs bg:overlay p:2x text:center text:6x transition:all|300ms visible@2xs rel@2xs left:0@2xs top:0@2xs flex@2xs translate(-50%,0) translate(0)@2xs rotate(0)@2xs gap:4x p:1x@2xs text:5x@2xs fg:black@2xs'}
	>
		<div class="flex rel bg:surface fg:surface flex:col@<2xs mb:2x@<2xs p:2x r:6x text:left">
			<span class="hidden@2xs">
				<Link class="vertical:middle" />
				{m.header_links()}
			</span>
			<ul
				class={'r:6x transition:all|300ms my:0 flex flex:col@<2xs pl:4x@<2xs px:1x pl:0 text:5x'}
			>
				<li class="list-style:none">
					<a class="flex align-items:center flex:row" href="/">
						<Arrow />
						{m.header_home()}
					</a>
				</li>
				<li class="list-style:none">
					<a class="flex align-items:center flex:row" href="/posts">
						<Arrow />
						{m.header_posts()}
					</a>
				</li>
			</ul>
		</div>
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
				}
			}
		}
	}
</style>
