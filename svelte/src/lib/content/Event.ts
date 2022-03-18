import type { IScheduleEntry, IScheduleEntryFields, LOCALE_CODE } from "./schema";
import { client } from "./client";

export async function getEvent(id: string, locale: LOCALE_CODE = 'fr'): Promise<ScheduleEntry> {
    // @ts-ignore
    const response: IScheduleEntry = await client.getEntry<IScheduleEntryFields>(id, {locale})
    
    return hydrateStartTime(response)
}

export type ScheduleEntry = HydratedStartTime<IScheduleEntry>

export type HydratedStartTime<T extends {fields: {startTime: string}}> = T & {
    fields: {
        start: Date
    }
}

export function hydrateStartTime<T extends {fields: {startTime: string}}>(description: T): HydratedStartTime<T> {
    return {
        ...description,
        fields: {
            ...description.fields,
            start: new Date(description.fields.startTime)
        }
    }
}