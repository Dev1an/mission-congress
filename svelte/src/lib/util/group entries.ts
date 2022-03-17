import type { ScheduleEntry } from "$lib/content/Event";
import moment from "moment";

type Group = {
    date: Date,
    events: ScheduleEntry[],
    id: string
}

export function idFrom(date: Date): string {
    return moment.utc(date).format('DDHH')
}

export function group(events: ScheduleEntry[]): Group[] {
    const groups = new Array<Group>()
    if (events.length == 0) return groups

    var currentGroup = {
        date: events[0].fields.start,
        events: [],
        id: idFrom(events[0].fields.start)
    }

    for (const event of events) {
        const id = idFrom(event.fields.start)
        if (currentGroup.id == id) {
            currentGroup.events.push(event)
        } else {
            groups.push(currentGroup)
            currentGroup = {
                date: event.fields.start,
                events: [event],
                id: idFrom(event.fields.start)
            }
        }
    }

    return groups
}