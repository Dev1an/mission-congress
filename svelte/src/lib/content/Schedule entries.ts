import type { Entry, Sys } from "contentful";
import { client } from "./client";
import { contentTypes } from "./Endpoint description";
import type { IScheduleEntryFields } from "./schema";

export type ScheduleEntry = {
    content: Omit<IScheduleEntryFields, 'startTime'> & {
        startTime: Date,
    },
    meta: Sys
}

export async function getAllScheduleEntries(): Promise<ScheduleEntry[]> {
    const response = await client.getEntries<IScheduleEntryFields>({
        content_type: contentTypes.ScheduleEntry,
        order: 'fields.startTime',
        limit: 1000
    })

    return response.items.map(hydrateScheduleEntry)
}

export function hydrateScheduleEntry(description: Entry<IScheduleEntryFields>): ScheduleEntry {
    return {
        content: {
            ...description.fields,
            startTime: new Date(description.fields.startTime)
        },
        meta: description.sys,
    }
}