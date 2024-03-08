<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
  import { type AvailableLanguageTag, availableLanguageTags } from '$i18n/runtime';
  import Language from '~icons/ic/language'
  import Arrow from '~icons/ic/arrow-forward'

  const translateLanguage = (language: AvailableLanguageTag) => {
      switch (language) {
          case 'en':
              return m.lang_en();
          case 'af':
              return m.lang_af();
          default:
              return language;
      }
    }
</script>

<div
	class="flex flex:row align-items:center r:4x bg:surface/.80 p:2 pr:0 text:surface"
>
	<form action="/" class="flex flex:row align-items:center gap:1x" method="POST" use:enhance>
	  <Language class="inline-block text:4x ml:1x" />
		<select
			class="flex:grow border:none bg:transparent text:4x font:inherit text-light-text dark:text-dark-surface_foreground"
			id="lang-picker"
      name="language"
			on:change={(e) => {
				e.currentTarget.form?.requestSubmit();
			}}
		>
			{#each availableLanguageTags as language}
				<option selected={language === $page.data.language} value={language}>
					{translateLanguage(language)}
				</option>
			{/each}
		</select>
		<noscript>
			<button class="r:2x bg:transparent border:none" type="submit">
				<Arrow />
			</button>
		</noscript>
	</form>
</div>
