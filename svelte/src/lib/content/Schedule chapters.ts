import type { Entry } from "contentful";
import { client } from "./client";
import { contentTypes } from "./Endpoint description";
import type { ILocation, IScheduleChapterFields } from "./schema";

export type Chapter = {
    startTime: Date,
    title: string,
    location?: ILocation,
    eventID?: string
}

export async function getAllChapters(): Promise<Chapter[]> {
    const response = await client.getEntries<IScheduleChapterFields>({
        content_type: contentTypes.ScheduleChapter,
        limit: 1000,
        include: 2 // levels of linked data
    })

    return response.items
        .map(hydrate)
        .sort(orderByStartDate)
}

function hydrate(entry: Entry<IScheduleChapterFields>): Chapter {
    const isLinkToScheduleEntry = entry.fields.content.sys.contentType.sys.id == 'scheduleEntry'
    return {
        ...entry.fields.content.fields,
        startTime: new Date(entry.fields.content.fields.startTime),
        eventID: isLinkToScheduleEntry ? entry.fields.content.sys.id : null
    }
}

function orderByStartDate(left: Chapter, right: Chapter): number {
    return left.startTime.getTime() - right.startTime.getTime()
}