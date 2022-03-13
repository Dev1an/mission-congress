export type RawScheduleEntry = {
    title: string,
    startTime: string,
    durationInMinutes: number,
    dutch: boolean,
    french: boolean,
}

export type ScheduleEntry = {
    title: string,
    startTime: Date,
    durationInMinutes: number,
    dutch: boolean,
    french: boolean,
}

export function hydrateScheduleEntry(entry: RawScheduleEntry): ScheduleEntry {
    return {
        ...entry,
        startTime: new Date(entry.startTime)
    }
}