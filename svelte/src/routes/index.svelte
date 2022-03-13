<script lang="ts">
	import sloganNl from '$lib/assets/images/slogan/nl.jpg';
	import SegmentedPicker from '$lib/components/Segmented picker.svelte'
	import NavigationBar from '$lib/components/Navigation bar.svelte'

	let selectedDay = 'Vr'
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
		<a href="https://google.com">
			<div>19:00 <span class=location>- Basiliek van Koekelberg</span></div>
			<h4>Welkom en registratie</h4>
		</a>
		<a href="https://google.com">
			<div>20:00 <span class=location>- Basiliek van Koekelberg</span></div>
			<h4>Openingsavond van het missiecongres</h4>
		</a>
		<a href="https://google.com">
			<div>22:30 <span class=location>- School: Notre-Dame de la Sagesse</span></div>
			<h4>Bar</h4>
		</a>
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

	.program-overview .schedule a .location {
		color: rgba(0, 0, 0, 0.45);
	}
</style>