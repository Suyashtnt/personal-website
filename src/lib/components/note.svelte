<script>
    const { children } = $props();
</script>

<aside
	class={"border:primary by:1x {absolute;ml:calc(65ch+2rem)}@xl mr:4rem max-w:calc(35ch)"}
>
    {@render children()}
</aside>
