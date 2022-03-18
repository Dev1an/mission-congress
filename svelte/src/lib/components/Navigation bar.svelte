<script lang="ts">
import { locales } from "$lib/content/locale";

	import type { LOCALE_CODE } from "$lib/content/schema"
	export let language: LOCALE_CODE

	const title = language == locales.french ? 'Congres Mission' : 'Missiecongres'
</script>

<nav>
	<h3>{title}</h3>
</nav>

<style>
	nav {
		padding: 0.7em var(--horizontal-safe-area);
		padding-left: max(var(--horizontal-safe-area), env(safe-area-inset-left));
		padding-right: max(var(--horizontal-safe-area), env(safe-area-inset-right));
	}
</style>