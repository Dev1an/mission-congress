<script lang="ts" context="module">
	import type { Load } from '.'
	import moment from 'moment'
	import '$lib/util/moment'
	import { getAllChapters, type Chapter } from '$lib/content/Schedule chapters'
	import { days } from '$lib/util/march2022congresDays';

	export async function load({ params, fetch, session, stuff }: Parameters<Load>[0]) {
		const now = new Date()

		return {
			props: {
				chapters: (await getAllChapters()).map(hydrate),
				selectedDay: days.find(day => day.contains(now)) || days[0]
			}
		}
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
				`/schedule#${idFrom(chapter.fields.start)}`
		}
	}
</script>

<script lang="ts">
	import { prefetch } from '$app/navigation';
	import { browser } from '$app/env';

	import sloganNl from '$lib/assets/images/slogan/nl.jpg';
	import SegmentedPicker from '$lib/components/Segmented picker.svelte'
	import NavigationBar from '$lib/components/Navigation bar.svelte'
	import type { TimeRange } from '$lib/util/date';
import { idFrom } from '$lib/util/group entries';

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

	if (browser)
		setTimeout(prefetchSchedule, 200)

	function prefetchSchedule() {
		prefetch('/schedule').then(() => console.log('schedule prefetched'))
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
			bind:selected={selectedDay}
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