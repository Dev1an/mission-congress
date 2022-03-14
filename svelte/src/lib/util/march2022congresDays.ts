import { TimeRange } from "./date"

const CETextension = 'T00:00:00.000+0100'

const dayBounds = [
    new Date('2022-03-18' + CETextension),
    new Date('2022-03-19' + CETextension),
    new Date('2022-03-20' + CETextension),
    new Date('2022-03-21' + CETextension),
]

export const days = TimeRange.fromBounds(dayBounds)