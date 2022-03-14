import moment from 'moment'
moment.locale('my-nl', {
    relativeTime: {
        future: 'over %s',
        past: '%s geleden',
        s: 'een paar seconden',
        ss: '%d seconden',
        m: 'één minuut',
        mm: '%d minuten',
        h: '1 uur',
        hh: '%d uur',
        d: 'één dag',
        dd: '%d dagen',
    }
})

export function formatMinutes(minutes: number): string {
    return moment(0).to(moment(0).minutes(minutes), true)
}