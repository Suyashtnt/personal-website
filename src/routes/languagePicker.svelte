<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { availableLanguageTags, type AvailableLanguageTag } from '$i18n/runtime';
    import * as m from '$i18n/messages';

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
	class="flex-inline flex-row items-center rounded-lg bg-light-base/80 pa-2 text-light-text dark:bg-dark-surface_background/80 dark:text-dark-surface_foreground"
>
	<div class="i-ic-language inline-block h-8 w-8" />
	<form action="/" class="contents" method="POST" use:enhance>
		<select
			class="grow border-none bg-transparent text-xl font-inherit text-light-text dark:text-dark-surface_foreground"
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
			<button class="i-ic-arrow-forward h-4 w-4" type="submit" />
		</noscript>
	</form>
</div>
