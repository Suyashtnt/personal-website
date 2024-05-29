<script>
    const { children } = $props();
</script>

<aside class={'border:primary by:1x mr:4rem grid-area:note'}>
    <hr />
    {@render children()}
    <hr />
</aside>
