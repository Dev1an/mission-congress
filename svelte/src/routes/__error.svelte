<script lang="ts">
    import NavigationBar from "$lib/components/Navigation bar.svelte";
</script>

<NavigationBar />

<h3 class="secondary">Page not found</h3>

<style>
    h3 {
        margin-left:  max(var(--horizontal-safe-area), env(safe-area-inset-left));
		margin-right: max(var(--horizontal-safe-area), env(safe-area-inset-right));
    }
</style>