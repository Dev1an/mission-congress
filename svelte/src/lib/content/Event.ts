import type { Entry, Sys } from "contentful";
import type { IScheduleEntryFields } from "./schema";
import { client } from "./client";

export async function getEvent(id: string): Promise<ScheduleEntry> {
    const response = await client.getEntry<IScheduleEntryFields>(id)
    return hydrateScheduleEntry(response)
}

export type ScheduleEntry = {
    content: Omit<IScheduleEntryFields, 'startTime'> & {
        startTime: Date,
    },
    meta: Sys
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