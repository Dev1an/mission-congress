export class TimeRange {
    public start: Date
    public end: Date

    constructor(start: Date, end: Date) {
        this.start = start
        this.end = end
    }

    get mid(): Date {
        return new Date(
            this.start.getTime()/2 + this.end.getTime()/2
        )
    }

    contains(date: Date): boolean {
        return date >= this.start && date < this.end
    }

    static fromBounds(bounds: Date[]): TimeRange[] {
        if (bounds.length < 2) { return [] }
        const ranges = new Array<TimeRange>()
        for (let [startIndex, endIndex] = [0,1]; endIndex < bounds.length; startIndex = endIndex++) {
            ranges.push(
                new TimeRange(
                    bounds[startIndex],
                    bounds[endIndex]
                )
            )
        }
        return ranges
    }
}