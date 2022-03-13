import { client } from "../client";
import { contentTypes } from "../Endpoint description";

import { hydrateScheduleEntry, type RawScheduleEntry, type ScheduleEntry } from './descriptor';

export async function getAllScheduleEntries(): Promise<ScheduleEntry[]> {
    const response = await client.getEntries<RawScheduleEntry>({
        content_type: contentTypes.ScheduleEntry,
        limit: 1000
    })

    return response.items.map(hydrateScheduleEntry)
}