<script lang="ts">
    import * as m from '$i18n/messages';

	const potentialFooterTexts = [
		m.footer_txt_1(),
        m.footer_txt_2(),
        m.footer_txt_3(),
        m.footer_txt_4()
	] as const;

	const footerText =
		potentialFooterTexts[Math.floor(Math.random() * potentialFooterTexts.length)];
</script>

<footer
	class="flex flex-col items-center justify-between rounded-t-2xl bg-light-mantle px-4 text-light-text lg:mx-8 md:flex-row dark:bg-dark-surface_background lg:px-16 dark:text-dark-surface_foreground"
>
    <p class="my-4 text-2xl font-semibold">TNTMan1671 | <a href="https://github.com/Suyashtnt/personal-website/blob/master/LICENSE">{m.footer_copyright()} ©️ Suyash 2023</a></p>
    <p>{footerText}</p>
</footer>
