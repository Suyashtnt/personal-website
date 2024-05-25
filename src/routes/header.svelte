<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { type AvailableLanguageTag, availableLanguageTags, languageTag } from '$i18n/runtime';
	import { i18n } from '$lib/i18n';
	import DropDown from '~icons/material-symbols/arrow-drop-down';
	import Language from '~icons/material-symbols/language';
	import Menu from '~icons/material-symbols/menu-rounded';
	import Link from '~icons/material-symbols/open-in-new';
	import Arrow from '~icons/material-symbols/play-arrow-rounded';

	const translateLanguage = (language: AvailableLanguageTag) => {
		switch (language) {
			case 'en':
				return m.lang_en();
			case 'af':
				return m.lang_af();
			default:
				return language;
		}
	};
</script>

{#snippet dropdownSection(title, Icon, content)}
	<span>
		<Icon class="vertical:middle" />
		{title}
	</span>

	{@render content()}
{/snippet}

{#snippet links()}
	<div class="flex rel bg:surface fg:surface flex:col@<2xs mb:2x@<2xs p:2x r:6x text:left">
		<ul
			class={'r:6x transition:all|300ms my:0 flex flex:col@<2xs pl:0 pr:2x text:5x'}
		>
			<li class="list-style:none">
				<a class="flex align-items:center fg:base fg:base:visited flex:row" href="/">
					<Arrow />
					{m.header_home()}
				</a>
			</li>
			<li class="list-style:none">
				<a class="flex align-items:center fg:base fg:base:visited flex:row" href="/posts">
					<Arrow />
					{m.header_posts()}
				</a>
			</li>
		</ul>
	</div>
{/snippet}

{#snippet langs()}
	<ul
		class={'abs@2xs r:6x bg:surface bg:overlay@2xs my:0 flex top:calc(100%+0.25rem) flex:col p:2x p:1x@2xs pr:3x@2xs  text:5x right:0'}
	>
		{#each availableLanguageTags.filter((lang) => lang !== languageTag()) as lang}
			<li class="list-style:none">
				<a
					aria-current={lang === languageTag() ? 'page' : undefined}
					class="flex align-items:center flex:row"
					href={i18n.route($page.url.pathname)}
					hreflang={lang}
				>
					<Arrow />
					{translateLanguage(lang)}
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

<nav
	class="flex rel sticky@sm align-items:center bd:blur(8x) border:2|subtle/.80 h:12x justify-content:space-between mb:4x mx:4x r:6x top:4x z:10"
>
	<section class="flex align-items:center gap:2x justify-content:space-between">
		<a class="flex place-items:center" href="/posts/the-wobbler">
			<enhanced:img
				alt="TNTMAN_1671"
				class={'aspect-square size:12x r:full align-items:center ~duration:300 ~transform ~shadow {scale(1.3);r:2x;shadow:4x}:hover block'}
				sizes="32px 48px 64px"
				src="$lib/pictures/wobbler.png"
			>
			</enhanced:img>
		</a>

		<h1 class="my:0 text:6x">
			<a class="fg:base fg:base:visited" href="/"> TNTMAN_1671 </a>
		</h1>
	</section>

	<details class="hidden@2xs">
		<summary class="bg:overlay h:8x list-style:none p:2x r:6x">
			<Menu aria-label="Dropdown menu" class="size:8x" />
		</summary>

		<div
			class={'w:80% abs left:50% top:calc(100%+1rem) flex:row transform:top rotate(90,0) r:6x bg:text-primary@2xs bg:overlay p:2x text:6x transition:all|300ms translate(-50%,0) gap:4x'}
		>
			{@render dropdownSection(m.header_links(), Link, links)}
			{@render dropdownSection(translateLanguage(languageTag()), Language, langs)}
		</div>
	</details>


	<div
		class={'flex:row r:6x bg:text-primary text:center text:6x hidden@<2xs flex gap:4x p:2x text:5x fg:black'}
	>
		{@render links()}
		<details class="flex rel bg:surface fg:surface flex:col@<2xs p:1x pl:2x place-items:center r:6x">
			<summary class="flex align-items:center bg:none border:none flex:row gap:1x h:full text:5x">
				<Language />
				{translateLanguage(languageTag())}
				<DropDown />
			</summary>
			{@render langs()}
		</details>
	</div>
</nav>
