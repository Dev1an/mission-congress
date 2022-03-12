<script lang="ts">
	import type { SvelteComponent } from "svelte";
	import Text from "$lib/components/Text.svelte";

	type Element = $$Generic
	type ID = $$Generic

	export let elements: Element[]
	export let template: typeof SvelteComponent = Text
	export let content: (element: Element) => any = (content) => ({content})
	export let id: (Element) => ID = (element) => element
	export let selected: ID | null
	
	function className(element: Element, currentSelection: ID): string {
		return id(element) === currentSelection ? 'selected' : ''
	}

	function select(element: Element) {
		selected = id(element)
	}
</script>

<div class="horizontal-segmented-picker">
	{#each elements as element}
		<button class="{className(element, selected)}" on:click={event => select(element)}>
			<svelte:component this={template} {...content(element)} />
		</button>
	{/each}
</div>

<style>
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