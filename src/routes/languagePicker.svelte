<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { availableLanguageTags } from '$i18n/runtime';
</script>

<div
	class="flex-inline flex-row items-center rounded-lg bg-light-base/80 pa-2 text-light-text dark:bg-dark-base/80 dark:text-dark-text"
>
	<div class="i-ic-language inline-block h-8 w-8" />
	<form action="/" class="contents" method="POST" use:enhance>
		<select
			class="border-none bg-transparent text-xl text-light-text dark:text-dark-text font-inherit grow"
			name="language"
			on:change={(e) => {
				e.currentTarget.form?.requestSubmit();
			}}
		>
			{#each availableLanguageTags as language}
				<option selected={language === $page.data.language} value={language}>
					{language}
				</option>
			{/each}
		</select>
		<noscript>
			<button class="i-ic-arrow-forward h-4 w-4" type="submit" />
		</noscript>
	</form>
</div>
