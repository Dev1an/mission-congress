import type { Entry, Sys } from "contentful"

type ScheduleEntryBase = {
    title: string,
    durationInMinutes: number,
    dutch: boolean,
    french: boolean,
    type: Entry<{name: string}>,
    theme?: Entry<{name: string}>
}

export type RawScheduleEntry = ScheduleEntryBase & {
    startTime: string,
}

export type ScheduleEntry = {
    content: ScheduleEntryBase & {
        startTime: Date,
    },
    meta: Sys
}