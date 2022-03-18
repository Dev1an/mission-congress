<script lang="ts" context="module">
	import type { Load } from '.'
	import moment from 'moment'
	import '$lib/util/moment'
	import { getAllChapters, type Chapter } from '$lib/content/Schedule chapters'
	import { days } from '$lib/util/march2022congresDays';
	import { idFrom as chapterIdFrom } from '$lib/util/group entries';
	import { browser, prerendering } from '$app/env';

	type OutputProperties = {
		status: number,
		redirect: string | undefined,
		props: {
			selectedDay: TimeRange,
			chapters: HydratedChapter[]
		}
	}

	export async function load({ url, params, fetch, session, stuff }: Parameters<Load>[0]) {
		let response = {
			status: 200,
			redirect: undefined,
			props: {
				selectedDay: days[0],
				chapters: []
			}
		}

		const rawChapters = getAllChapters()

		// Look for preffered day in URL
		if (!prerendering && url.searchParams.has('day')) {
			const dayString = url.searchParams.get('day')
			const preferredDay = days.find(day => dayString == dayIdFrom(day.mid))
			// If specified correctly, select it, otherwise select current day if possible
			if ( preferredDay ) {
				setDayInOutput(preferredDay, response, url)
			} else {
				setCurrentDayInOutputIfPossible(response, url)
			}
		} else {
			setCurrentDayInOutputIfPossible(response, url)
		}

		response.props.chapters = (await rawChapters).map(hydrate)

		return response
	}

	function setCurrentDayInOutputIfPossible(outputProperties: OutputProperties, currentURL: URL) {
		const now = new Date()
		const potentialDay = days.find(day => day.contains(now))
		if (potentialDay) {
			setDayInOutput(potentialDay, outputProperties, currentURL)
		}
	}

	function setDayInOutput(day: TimeRange, output: OutputProperties, currentURL: URL) {
		if (!prerendering) {
			const targetID = dayIdFrom(day.mid)
			const shouldRedirect = currentURL.searchParams.get('day') != targetID

			if (shouldRedirect) {
				const newURL = new URL(currentURL)
				newURL.searchParams.set('day', targetID)
				output.status = 302
				output.redirect = newURL.href
			}
		}
		output.props.selectedDay = day
	}

	function dayIdFrom(date: Date): string {
		return moment(date).utcOffset(60).format('D')
	}

	type HydratedChapter = Chapter & {
		formattedTime: string,
		href: string
	}

	function hydrate(chapter: Chapter): HydratedChapter {
		return {
			...chapter,
			formattedTime: moment(chapter.fields.startTime).utcOffset(60).format('H:mm'),
			href: chapter.sys.contentType.sys.id == 'scheduleEntry' ?
				`/event/${chapter.sys.id}` :
				`/schedule#${chapterIdFrom(chapter.fields.start)}`
		}
	}
</script>

<script lang="ts">
	import { prefetch } from '$app/navigation';

	import sloganNl from '$lib/assets/images/slogan/nl.jpg';
	import SegmentedPicker from '$lib/components/Segmented picker.svelte'
	import NavigationBar from '$lib/components/Navigation bar.svelte'
	import type { TimeRange } from '$lib/util/date';

	export let selectedDay: TimeRange
	export let chapters: HydratedChapter[]

	let filteredChapters: HydratedChapter[]

	$: updateFilteredChapters(selectedDay)

	function updateFilteredChapters(...args: any[]) {
		filteredChapters = chapters.filter(isOnSelectedDay)
	}

	function isOnSelectedDay(chapter: HydratedChapter): boolean {
		return selectedDay.contains(chapter.fields.start)
	}

	if (browser) {
		setTimeout(prefetchSchedule, 200)
		window.addEventListener('popstate', selectDayFromCurrentURL)
	}

	function prefetchSchedule() {
		prefetch('/schedule').then(() => console.log('schedule prefetched'))
	}

	function selectDayFromCurrentURL() {
		const currentURL = new URL(window.location.toString())
		const id = currentURL.searchParams.get('day')
		const day = days.find(day => id == dayIdFrom(day.mid))
		if (day) {
			selectedDay = day
		}
	}

	function selectDay(event: CustomEvent) {
		const targetDay = event.detail.selectedElement
		const targetId = dayIdFrom(targetDay.mid)
		const currentURL = new URL(window.location.toString())
		if (currentURL.searchParams.get('day') != targetId) {
			const targetURL = new URL(currentURL)
			targetURL.searchParams.set('day', targetId)
			history.pushState(history.state, undefined, targetURL)
			selectedDay = targetDay
		}
	}
</script>

<NavigationBar />

<section class="slogan">
	<img src={sloganNl} alt="">
</section>

<section class="program-overview">
	<div class="day-picker">
		<SegmentedPicker
			elements={days}
			on:change={selectDay}
			selected={selectedDay}
			content={day => ({ content: moment(day.mid).format('dd') })}
		/>
	</div>

	<div class="schedule">
		{#each filteredChapters as chapter}
			<a href={chapter.href}>
				<div>
					{chapter.formattedTime}
					{#if chapter.fields.location}
						<span class=secondary>- {chapter.fields.location.fields.name}</span>
					{/if}
				</div>
				<h4>{chapter.fields.title}</h4>
			</a>			
		{/each}
	</div>
</section>

<style>
	section.slogan {
		text-align: center;
		padding: 3em var(--horizontal-safe-area);
		padding-left: max(var(--horizontal-safe-area), env(safe-area-inset-left));
		padding-right: max(var(--horizontal-safe-area), env(safe-area-inset-right));
		background-color: #f79f1b;
	}

	.day-picker {
		padding: 0 var(--horizontal-safe-area);
		padding-left:  max(var(--horizontal-safe-area), env(safe-area-inset-left));
		padding-right: max(var(--horizontal-safe-area), env(safe-area-inset-right));
	}

	.program-overview .schedule a {
		display: block;
		padding: 0.6em 0;
		margin-left:  var(--horizontal-safe-area);
		margin-left:  max(var(--horizontal-safe-area), env(safe-area-inset-left));
		padding-right: var(--horizontal-safe-area);
		padding-right: max(var(--horizontal-safe-area), env(safe-area-inset-right));
	}

	.program-overview .schedule a:not(:last-child) {
		border-bottom: 1px solid rgba(0, 0, 0, 0.233);
	}

	@media (-webkit-min-device-pixel-ratio: 2) {
		.program-overview .schedule a:not(:last-child) {
			border-bottom: 0.5px solid rgba(0, 0, 0, 0.233);
		}
	}
</style>