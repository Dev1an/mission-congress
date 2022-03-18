import { client } from "./client";
import { contentTypes } from "./Endpoint description";
import { hydrateStartTime, type HydratedStartTime, type ScheduleEntry } from "./Event";
import type { ICustomScheduleChapterContent, ICustomScheduleChapterContentFields, IScheduleEntryFields, LOCALE_CODE } from "./schema";

type DedicatedChapter = HydratedStartTime<ICustomScheduleChapterContent>

export type Chapter = DedicatedChapter | ScheduleEntry

export async function getAllChapters(locale: LOCALE_CODE = 'fr'): Promise<Chapter[]> {
    const eventResponsePromise = client.getEntries<IScheduleEntryFields>({
        content_type: contentTypes.ScheduleEntry,
        'fields.includeInChapterList': true,
        order: 'fields.startTime',
        limit: 100,
        locale
    })

    const chapterResponsePromise = client.getEntries<ICustomScheduleChapterContentFields>({
        content_type: contentTypes.ScheduleChapter,
        limit: 1000,
        locale
    })

    const [eventResponse, chapterResponse] = await Promise.all([eventResponsePromise, chapterResponsePromise])

    const [events, chapters] = [eventResponse.items.map(hydrateStartTime), chapterResponse.items.map(hydrateStartTime)]

    // @ts-ignore
    return [...events, ...chapters]
        .sort(orderByStartDate)
}

function orderByStartDate(left: Chapter, right: Chapter): number {
    return left.fields.start.getTime() - right.fields.start.getTime()
}