<script lang="ts" context="module">
	import type { Load } from './[eventID]'
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

	export async function load({ params, fetch, session, stuff }: Parameters<Load>[0]) {
        const event = await getEvent(params.eventID)
		return {
			props: {
				event,
                htmlDescription: documentToHtmlString(event.fields.description)
			}
		}
	}
</script>

<script lang="ts">
    import NavigationBar from "$lib/components/Navigation bar.svelte"
    import { getEvent, type ScheduleEntry } from '$lib/content/Event'
    import moment from 'moment'
    import '$lib/util/moment'
    import ProfilePicture from "./_profile picture.svelte"

    export let event: ScheduleEntry
    export let htmlDescription: string
    let formattedDay = moment(event.fields.startTime).format('dddd D MMMM')

    const isEven = num => num % 2 === 0;
</script>

<NavigationBar />

<h1>{event.fields.title}</h1>
<div class="time secondary">
    {formattedDay}{#if event.fields.location}, {event.fields.location.fields.name}{/if}<br>
    19:00 - 20:00
</div>
<p class=description>{@html htmlDescription}</p>

{#if event.fields.speakers}
    <h2>Sprekers</h2>
    {#each event.fields.speakers as speaker, number}
        {@const pic = speaker.fields.profilePicture}
        {@const side = isEven(number) ? 'left':'right'}
        <div class="speaker">
            {#if pic && side == 'left'}
                <ProfilePicture {speaker} {side}/>
            {/if}    
            <div class="text {side}">
                <p>{@html documentToHtmlString(speaker.fields.biography)}</p>        
            </div>
            {#if pic && side == 'right'}
                <ProfilePicture {speaker} {side}/>
            {/if}    
        </div>
    {/each}
{/if}

<style>
    h1 {
        line-height: 1;
        margin-top: 0.4em;
        margin-bottom: 0.2em;
        font-size: 30px;
    }

    h1, h2, .time, p {
        padding: 0 var(--horizontal-safe-area);
		padding-left: max(var(--horizontal-safe-area), env(safe-area-inset-left));
		padding-right: max(var(--horizontal-safe-area), env(safe-area-inset-right));
    }

    .time {
        padding-bottom: 0.7em;
    }

    p, div {
        font-size: 17px;
        line-height: 1.47059;
    }

    h2 {
        margin: 2em 0 0.5em;
    }

    .speaker {
        display: flex;
        margin-bottom: 2.5em;
    }

    .speaker .text {
        margin-top: 10px;
    }

    .speaker .text.left p {
        padding-left: var(--horizontal-safe-area);
    }
    .speaker .text.right p {
        padding-right: var(--horizontal-safe-area);
    }

    :global(b) {
        font-weight: bold;
    }
</style>