<script lang="ts">
    const { footerText } = $props<{ footerText: string }>();
</script>

<footer
	class="flex flex:col align-items:center justify-content:space-between rt:2x bg:base px:6x fg:base mx:2x@lg flex:row@sm px:4x@lg"
>
    <p class="my:2x text:6x font:semibold">TNTMan1671 | <a href="https://github.com/Suyashtnt/personal-website/blob/master/LICENSE">©️ Suyash 2024</a></p>
    <p>{footerText}</p>
</footer>
