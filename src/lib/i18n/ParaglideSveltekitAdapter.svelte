<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { onSetLanguageTag, setLanguageTag } from "@inlang/paraglide-js/website"
    import { getContext, setContext } from "svelte";

    // from root layout. The page will ALWAYS have this.
    $: language = $page.data.language as string
    $: setContext("languageTag", language)

    setLanguageTag(() => getContext("languageTag"))

    if (browser) {
        onSetLanguageTag((newLanguageTag) => {
            language = newLanguageTag
        })
    }
</script>

{#key language}
    <slot></slot>
{/key}
