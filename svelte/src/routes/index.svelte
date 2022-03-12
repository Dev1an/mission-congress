<script lang="ts">
	import sloganNl from '$lib/assets/images/slogan/nl.jpg';
	import SegmentedPicker from '$lib/components/segmented picker/main.svelte'

	let selectedDay = 'Zat'
</script>

<nav>
	<h3>Missie congres</h3>
</nav>

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
		<h4>{selectedDay} @ 18:00</h4>
	</div>
</section>

<style>
	nav {
		padding: 0.7em var(--horizontal-safe-area);
	}

	section.slogan {
		text-align: center;
		padding: 3em var(--horizontal-safe-area);
		background-color: #f79f1b;
	}

	.day-picker {
		padding: 0 var(--horizontal-safe-area);
	}

	.program-overview .schedule h4 {
		padding: 0 var(--horizontal-safe-area);
	}
</style>