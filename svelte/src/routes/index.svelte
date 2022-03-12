<script>
	import sloganNl from '$lib/assets/images/slogan/nl.jpg';
</script>

<nav>
	<h3>Missie congres</h3>
</nav>

<section class="slogan">
	<img src={sloganNl} alt="">
</section>

<section class="program-overview">
	<div class="day-picker">
		<div class="horizontal-segmented-picker">
			<button>Vr</button>
			<button class="selected">Zat</button>
			<button>Zon</button>	
		</div>
	</div>
</section>

<style>
	nav {
		padding: 0.7em 1em;
	}

	section.slogan {
		text-align: center;
		padding: 3em 1em;
		background-color: #f79f1b;
	}

	.day-picker {
		padding: 0 1em;
	}

	.horizontal-segmented-picker {
		display: flex;
		margin: 0.7em 0;
		background-color: rgba(0, 0, 0, 0.07);
		border-radius: 8px;
		font-size: 13px;
		overflow: hidden;
		font-weight: 600;
	}

	.horizontal-segmented-picker button {
		flex-grow: 1;
		text-align: center;
		margin: 2px;
		padding: 0.45em 0.2em;
	}

	.horizontal-segmented-picker button.selected {
		background-color: white;
		border-radius: 6px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.11);
	}
</style>