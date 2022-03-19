<script lang="ts">
	import { locales } from "$lib/content/locale";

	import type { LOCALE_CODE } from "$lib/content/schema"
	export let language: LOCALE_CODE

	const title = language == locales.french ? 'Congres Mission' : 'Missiecongres'
	const website = language == locales.french ? 'https://www.congresmission.be' : 'https://www.missiecongres.be'
</script>

<nav>
	<h3><a href={website}>{title}</a></h3>
</nav>

<style>
	a:any-link {
		text-decoration: none;
	}

	nav {
		display: flex;
		align-items: center;
		justify-content:space-between;
		gap: 10px;

		padding: 0.7em var(--horizontal-safe-area);
		padding-left: max(var(--horizontal-safe-area), env(safe-area-inset-left));
		padding-right: max(var(--horizontal-safe-area), env(safe-area-inset-right));
	}
</style>