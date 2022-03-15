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
    },
    weekdays: 'Zondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrijdag_Zaterdag'.split('_'),
    weekdaysMin: 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
    months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_')
})

export function formatMinutes(minutes: number): string {
    return moment(0).to(moment(0).minutes(minutes), true)
}