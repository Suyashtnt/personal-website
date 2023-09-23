<script lang="ts">
    import {browser} from '$app/environment';
    import {goto} from '$app/navigation';

    if (browser) goto('/skills/Svelte', {noScroll: true});
</script>

<a data-sveltekit-noscroll href="/skills/Svelte">Goto</a>
