import { client } from "./client";
import { contentTypes } from "./Endpoint description";
import { hydrateScheduleEntry, type ScheduleEntry } from "./Event";
import type { IScheduleEntryFields } from "./schema";

export async function getAllScheduleEntries(): Promise<ScheduleEntry[]> {
    const response = await client.getEntries<IScheduleEntryFields>({
        content_type: contentTypes.ScheduleEntry,
        order: 'fields.startTime',
        limit: 1000
    })

    return response.items.map(hydrateScheduleEntry)
}