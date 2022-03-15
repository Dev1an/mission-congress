<script lang="ts">
    import type { ISpeaker } from "$lib/content/schema";

    export let speaker: ISpeaker
    export let side: 'left'|'right'
    
    const url = speaker.fields.profilePicture.fields.file.url
    const name = speaker.fields.name
    const size = speaker.fields.profilePicture.fields.file.details.image
</script>

<div class={side}>
    <img src="{url}" {...size} alt="{name} (profile picture)">
    <h3>{name}</h3>
</div>

<style>
    h3 {
        font-size: 19px;
    }

    img {
        max-width: 40vw;
        max-width: min(200px, 40vw);
        height: auto;
    }

    .left img {
        border-radius: 0 30px 30px 0;
    }
    .right img {
        border-radius: 30px 0 0 30px;
    }

    h3 {
        padding: 0 var(--horizontal-safe-area);
    }

    .right h3 {
		padding-right: max(var(--horizontal-safe-area), env(safe-area-inset-right));
    }

    .left h3 {
		padding-left: max(var(--horizontal-safe-area), env(safe-area-inset-left));
        text-align: right;
    }

</style>