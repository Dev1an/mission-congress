<script lang="ts">
	import NavigationBar from "$lib/components/Navigation bar.svelte";
</script>

<NavigationBar />

<div class="search-row">
	<input type="text" placeholder="Search">
</div>

<div class="schedule">
	<div class="time-indicator">19:00 <span class=day>- Vrijdag</span></div>
	<a href="https://google.com">
		<p class="title">Comment mettre sa créativité artistique au service de l'Annonce de l'Evangile ?</p>
		<p class="secondary">Culture • Workshop • 50 min</p>
	</a>
	<a href="https://google.com">
		<p class="title">De Kerk in een geseculariseerde samenleving</p>
		<p class="secondary">Panelgesprek • 50 min • Basiliek van Koekelberg</p>
	</a>
	<a href="https://google.com">
		<p>Hello schedule!</p>
	</a>
	<a href="https://google.com">
		<p>Hello schedule!</p>
	</a>
</div>

<style>
	.search-row {
		padding: 0 var(--horizontal-safe-area) 0.7em;
		padding-left:  max(var(--horizontal-safe-area), env(safe-area-inset-left));
		padding-right: max(var(--horizontal-safe-area), env(safe-area-inset-right));

		display: flex;
	}

	input {
		flex-grow: 1;
		padding: 0.4em 0.6em;

		background-color: rgba(0, 0, 0, 0.08);
		border-radius: 8px;
	}

	input::placeholder {
		color:rgba(0, 0, 0, 0.4);
	}

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
</style>