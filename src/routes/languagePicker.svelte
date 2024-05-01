<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { type AvailableLanguageTag, availableLanguageTags, languageTag } from '$i18n/runtime';
	import { i18n } from '$lib/i18n';
	import DropDown from '~icons/material-symbols/arrow-drop-down';
	import Language from '~icons/material-symbols/language';
	import Arrow from '~icons/material-symbols/play-arrow';

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

<div class="flex rel bg:surface fg:surface flex:col@<2xs p:2x r:6x text:left">
	<button class="flex align-items:center bg:none border:none flex:row gap:1x text:5x">
		<Language />
		{translateLanguage(languageTag())}
		<DropDown class="hidden@<2xs" />
	</button>
	<ul
		class={'links hidden@2xs r:6x bg:overlay@2xs transition:all|300ms my:0 abs@2xs flex top:calc(100%+0.25rem) transform:top flex:col px:4x text:5x right:0'}
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
</div>

<style>
	div {
		button:hover {
			cursor: pointer;
		}
		&:focus-within {
			& .links {
				display: flex;
				visibility: visible;
			}
		}
	}
</style>
