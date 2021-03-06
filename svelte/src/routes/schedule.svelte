<script lang="ts" context="module">
	import type { Load } from '.'
	import { getAllScheduleEntries } from "$lib/content/Schedule entries";
	import { getLanguage, getLanguageFromURL, setLanguageInURL } from '$lib/i18n/main';
	import { browser, prerendering } from '$app/env';

	export async function load({ url, params, fetch, session, stuff }: Parameters<Load>[0]) {
		var targetURL = new URL(url)
		let response = {
			status: 200,
			redirect: undefined,
			props: {
				scheduleEntries: [],
				language: getLanguage(targetURL)
			}
		}

		const scheduleEntries = getAllScheduleEntries(response.props.language)

		// Look for preferred language
		if (!prerendering) {
			const currentLanguage = response.props.language
			if (getLanguageFromURL(targetURL) != currentLanguage) {
				targetURL = setLanguageInURL(currentLanguage, targetURL)
				response.redirect = targetURL.href
				response.status = 302
			}
		}

		response.props.scheduleEntries = await scheduleEntries
		return response;
	}
</script>

<script lang="ts">
	import NavigationBar from "$lib/components/Navigation bar.svelte";
	import { formatMinutes } from '$lib/util/moment';
	import type { ScheduleEntry } from '$lib/content/Event';
	import { group } from '$lib/util/group entries';
	import moment from 'moment';
	import '$lib/util/moment'
	import type { LOCALE_CODE } from '$lib/content/schema';
	import { locales } from '$lib/content/locale';
	import LanguagePicker from '$lib/components/Language picker.svelte';

	export let scheduleEntries: ScheduleEntry[]
	export let language: LOCALE_CODE

	moment.locale(language)

	const groups = group(scheduleEntries)
	const title = language == locales.french ? 'Programme' : 'Programma'

	function formatMetaData(entry: ScheduleEntry['fields']) {
		const data = []
		data.push(entry.type.fields.name)
		console.log(entry.theme)
		if (entry.theme) data.push(...entry.theme.map(theme => theme.fields.name))
		data.push(formatMinutes(entry.durationInMinutes))
		return data.join(' • ')
	}

	function formatDay(date: Date): string {
		return moment(date).format('dddd')
	}

	function formatTime(date: Date): string {
		return moment(date).utcOffset(60).format('H:mm')
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<NavigationBar {language} />

<div class="schedule">
	{#each groups as group}
	<div class="time-group" id={group.id}>
		<div class="time-indicator">{formatTime(group.date)} <span class=day>- {formatDay(group.date)}</span></div>
		{#each group.events as entry}
			<a href="event/{entry.sys.id}">
				<p class="title">{entry.fields.title}</p>
				<p class="secondary">{formatMetaData(entry.fields)}</p>
			</a>
		{/each}	
	</div>	
	{/each}
</div>

<LanguagePicker {language} />

<div class="bottom-padding"></div>

<style>
	.schedule {
		position: relative;
		font-size: 18px;
	}

	.time-indicator {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		padding: 0.3em var(--horizontal-safe-area);
		padding-left:  max(var(--horizontal-safe-area), env(safe-area-inset-left));
		padding-right: max(var(--horizontal-safe-area), env(safe-area-inset-right));

		font-weight: bold;
		font-size: 16px;

		color: rgba(0, 0, 0, 0.644);
		background-color: #FAFAFA;
	}

	@supports ( -webkit-backdrop-filter: blur(10px) ) or ( backdrop-filter: blur(10px) ) {
		.time-indicator {
			background-color: rgba(243, 243, 243, 0.5);
		}
	}
	@supports ( -webkit-backdrop-filter: blur(20px) ) {
		.time-indicator {
			-webkit-backdrop-filter: blur(20px);
		}
	}
	@supports ( backdrop-filter: blur(20px) ) {
		.time-indicator {
			backdrop-filter: blur(20px)
		}
	}

	.time-indicator .day {
		font-weight: normal;
	}

	.schedule a {
		display: block;
		padding: 0.6em 0;
		margin-left:  var(--horizontal-safe-area);
		margin-left:  max(var(--horizontal-safe-area), env(safe-area-inset-left));
		padding-right: var(--horizontal-safe-area);
		padding-right: max(var(--horizontal-safe-area), env(safe-area-inset-right));
	}

	.schedule a p.title {
		margin-bottom: 0.2em;
	}

	.schedule a .secondary {
		font-size: 16px;
	}

	.schedule a:not(:last-child) {
		border-bottom: 1px solid rgba(0, 0, 0, 0.233);
	}

	@media (-webkit-min-device-pixel-ratio: 2) {
		.schedule a:not(:last-child) {
			border-bottom: 0.5px solid rgba(0, 0, 0, 0.233);
		}
	}

	.bottom-padding {
		margin-bottom: calc(100vh - 100px);
	}
</style>