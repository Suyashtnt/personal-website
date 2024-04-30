<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { i18n } from '$lib/i18n';
	import { type AvailableLanguageTag, availableLanguageTags, languageTag } from '$i18n/runtime';
	import Language from '~icons/ic/language';
    import Arrow from '~icons/ic/play-arrow'

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

<div class="flex flex:col@<2xs r:6x bg:surface p:2x fg:surface rel text:left">
	<button class="bg:none border:none text:5x flex align-items:center flex:row gap:1x">
		<Language />
		{translateLanguage(languageTag())}
	</button>
	<ul 
      class={"links hidden@2xs r:6x bg:overlay@2xs transition:all|300ms my:0 abs@2xs flex top:calc(100%+0.25rem) transform:top flex:col px:4x text:5x right:0"}
	>
		{#each availableLanguageTags.filter(lang => lang !== languageTag()) as lang}
			<li class="list-style:none">
				<a
					href={i18n.route($page.url.pathname)}
					hreflang={lang}
					aria-current={lang === languageTag() ? 'page' : undefined}

                    class="flex align-items:center flex:row"
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
        &:hover,
        &:focus-within {
            & .links {
				display: flex;
                visibility: visible;
            }
        }
    }
</style>

