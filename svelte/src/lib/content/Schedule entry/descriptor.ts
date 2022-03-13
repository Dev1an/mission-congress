type ScheduleEntryBase = {
    title: string,
    durationInMinutes: number,
    dutch: boolean,
    french: boolean,
}

export type RawScheduleEntry = ScheduleEntryBase & {
    startTime: string,
}

export type ScheduleEntry = ScheduleEntryBase & {
    startTime: Date,
}

export function hydrateScheduleEntry(description: {fields: RawScheduleEntry}): ScheduleEntry {
    return {
        ...description.fields,
        startTime: new Date(description.fields.startTime)
    }
}