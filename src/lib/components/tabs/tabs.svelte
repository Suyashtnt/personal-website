<script lang="ts">
    let className = '';
    export {className as class};
</script>

<div
    class="flex flex-col md:flex-row items-center justify-around gap-4 {className}"
>
    <slot />
</div>
