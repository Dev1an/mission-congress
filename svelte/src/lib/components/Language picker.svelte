<script lang="ts">
    import { goto, invalidate } from "$app/navigation";
    import { locales } from "$lib/content/locale";
    import type { LOCALE_CODE } from "$lib/content/schema";
    import { urlCodes } from "$lib/i18n/main";
    import SegmentedPicker from "./Segmented picker.svelte";

    export let language: LOCALE_CODE

    const languages = [
        { code: urlCodes.dutch, content: 'Nl' },
        { code: urlCodes.french, content: 'Fr'}
    ]

    const selectedCode = language == locales.french ? urlCodes.french : urlCodes.dutch

    function selectLanguage(event: CustomEvent) {
		const targetLanguage: LOCALE_CODE = event.detail.selectedId
		const currentURL = new URL(window.location.toString())
		if (currentURL.searchParams.get('lang') != targetLanguage) {
			const targetURL = new URL(currentURL)
            targetURL.searchParams.set('lang', targetLanguage)
            window.location.href = targetURL.href
		}
	}

    const descriptor = language == locales.french ? 'Langue du site' : 'Websitetaal'
</script>

<div class="secondary">
    {descriptor}: 
    <SegmentedPicker elements={languages} selected={selectedCode} content={element => element} id={element => element.code} on:change={selectLanguage} />
</div>

<style>
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }
</style>