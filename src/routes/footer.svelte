<script lang="ts">
    const { footerText }: { footerText: string } = $props();
</script>

<footer
    class="flex align-items:center bg:base fg:base flex:col flex:row@sm justify-content:space-between mx:2x@lg px:6x px:4x@lg rt:2x"
>
    <p class="font:semibold my:2x text:6x">
        TNTMan1671 | <a href="https://github.com/Suyashtnt/personal-website/blob/master/LICENSE"
            >©️ Suyash 2024</a
        >
    </p>
    <p>{footerText}</p>
</footer>
