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
    const downloadPDF = language == locales.french ? 'Télécharger en PDF' : 'Download PDF'
    const dailySchedule = language == locales.french ? 'Horaire quotidien & Plan' : 'Dagindeling & Grondplan'
    const panelsAndWorkshops = language == locales.french ? 'Tables rondes & Ateliers' : 'Panels & Workshops'

    import program from '$lib/assets/program.pdf'
</script>

<div class="secondary">
    {descriptor}: 
    <SegmentedPicker elements={languages} selected={selectedCode} content={element => element} id={element => element.code} on:change={selectLanguage} />
</div>

<div class="secondary downloads">
    <a href={program}>{downloadPDF}</a>
</div>

<style>
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;

        padding: 0 var(--horizontal-safe-area);
		padding-left: max(var(--horizontal-safe-area), env(safe-area-inset-left));
		padding-right: max(var(--horizontal-safe-area), env(safe-area-inset-right));
    }

    .downloads {
        font-size: 13px;
        margin-top: 1em;
        margin-bottom: 2em;
        gap: 1em;
        text-align: center;
    }

    a {
        text-decoration: underline;
    }
</style>