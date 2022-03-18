import { client } from "./client";
import { contentTypes } from "./Endpoint description";
import { hydrateStartTime, type ScheduleEntry } from "./Event";
import type { IScheduleEntryFields, LOCALE_CODE } from "./schema";

export async function getAllScheduleEntries(locale: LOCALE_CODE = 'fr'): Promise<ScheduleEntry[]> {
    const response = await client.getEntries<IScheduleEntryFields>({
        content_type: contentTypes.ScheduleEntry,
        order: 'fields.startTime',
        limit: 1000,
        locale
    })

    // @ts-ignore
    return response.items.map(hydrateStartTime)
}