import type { Entry } from "contentful";
import { client } from "../client";
import { contentTypes } from "../Endpoint description";

import type { RawScheduleEntry, ScheduleEntry } from './descriptor';

export async function getAllScheduleEntries(): Promise<ScheduleEntry[]> {
    const response = await client.getEntries<RawScheduleEntry>({
        content_type: contentTypes.ScheduleEntry,
        order: 'fields.startTime',
        limit: 1000
    })

    return response.items.map(hydrateScheduleEntry)
}

export function hydrateScheduleEntry(description: Entry<RawScheduleEntry>): ScheduleEntry {
    return {
        content: {
            ...description.fields,
            startTime: new Date(description.fields.startTime)
        },
        meta: description.sys,
    }
}