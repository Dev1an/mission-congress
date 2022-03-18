<script lang="ts" context="module">
	import type { Load } from './[eventID]'
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
    import { getLanguage, getLanguageFromURL, setLanguageInURL } from '$lib/i18n/main';
    import { prerendering } from '$app/env';

	export async function load({ url, params, fetch, session, stuff }: Parameters<Load>[0]) {
        var targetURL = new URL(url)
		let response = {
			status: 200,
			redirect: undefined,
			props: {
				event: undefined,
				language: getLanguage(targetURL)
			}
		}

        const event = getEvent(params.eventID, response.props.language)

		// Look for preferred language
		if (!prerendering) {
			const currentLanguage = response.props.language
			if (getLanguageFromURL(targetURL) != currentLanguage) {
				targetURL = setLanguageInURL(currentLanguage, targetURL)
				response.redirect = targetURL.href
				response.status = 302
			}
		}

        response.props.event = await event

		return response
	}
</script>

<script lang="ts">
    import NavigationBar from "$lib/components/Navigation bar.svelte"
    import { getEvent, type ScheduleEntry } from '$lib/content/Event'
    import moment from 'moment'
    import '$lib/util/moment'
    import ProfilePicture from "./_profile picture.svelte"
    import type { LOCALE_CODE } from '$lib/content/schema';

    export let event: ScheduleEntry
    export let language: LOCALE_CODE

    moment.locale(language)
    const htmlDescription = documentToHtmlString(event.fields.description)
    const formattedDay = moment(event.fields.startTime).format('dddd D MMMM')
    const formattedStartTime = moment(event.fields.start).format('H:mm')
    const formattedEndTime = moment(event.fields.start).add(event.fields.durationInMinutes, 'minutes').format('H:mm')

    const isEven = num => num % 2 === 0;
</script>

<NavigationBar />

<h1>{event.fields.title}</h1>
<div class="time secondary">
    {formattedDay}{#if event.fields.location}, {event.fields.location.fields.name}{/if}<br>
    {formattedStartTime} - {formattedEndTime}
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
                {#if pic == undefined}
                <h3>{speaker.fields.name}</h3>
                {/if}
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

    h1, h2, h3, .time, p {
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

    h3 {
        font-size: 19px;
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