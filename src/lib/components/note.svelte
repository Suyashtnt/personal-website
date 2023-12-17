<script>
    const { children } = $props();
</script>

<aside
	class="dark:border-dark-lavender border-x-0 border-y-2 border-light-lavender border-solid 2xl:(absolute ml-[calc(65ch+2rem)] mr-[4rem] max-w-[calc(35ch)])"
>
    {@render children()}
</aside>
