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
		<article>
			<div>19:00</div>
			<h4>Welkom en registratie</h4>
		</article>
		<article>
			<div>20:00</div>
			<h4>Openingsavond van het missiecongres</h4>
			<p>Gebed, lectio divina en aanbidding in aanwezigheid van bisschop Kockerols</p>
		</article>
		<article>
			<div>22:30</div>
			<h4>Bar</h4>
		</article>
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

	.program-overview .schedule {
		margin: 0 var(--horizontal-safe-area);
		margin-top: 1.2em;
	}

	.program-overview .schedule article {
		margin-bottom: 1.2em;
	}

	.program-overview .schedule article p {
		margin-top: 0.2em;
	}
</style>