<script lang="ts" context="module">	
	import type { Load } from '.'
	import { getAllChapters } from '$lib/content/Schedule chapter/queries';

	export async function load({ params, fetch, session, stuff }: Parameters<Load>[0]) {
		return {
			props: {
				chapters: await getAllChapters()
			}
		}
	}
</script>

<script lang="ts">
	import { prefetch } from '$app/navigation';
	import { browser } from '$app/env';
	import moment from 'moment'
	import type { Chapter } from '$lib/content/Schedule chapter/queries';

	import sloganNl from '$lib/assets/images/slogan/nl.jpg';
	import SegmentedPicker from '$lib/components/Segmented picker.svelte'
	import NavigationBar from '$lib/components/Navigation bar.svelte'

	let selectedDay = 'Vr'
	export let chapters: Chapter[]


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
			elements={['Vr', 'Zat', 'Zon']}
			bind:selected={selectedDay}
		/>
	</div>

	<div class="schedule">
		{#each chapters as chapter}
			<a href="/schedule">
				<div>
					{moment(chapter.startTime).format('H:mm')}
					{#if chapter.location}
						<span class=secondary>- {chapter.location.fields.name}</span>
					{/if}
				</div>
				<h4>{chapter.title}</h4>
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