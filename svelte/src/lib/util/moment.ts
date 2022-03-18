import { locales } from '$lib/content/locale'
import moment from 'moment'
moment.locale(locales.dutch, {
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

moment.locale(locales.french, {
    relativeTime: {
        future: 'dans %s',
        past: 'il y a %s',
        s: 'quelques secondes',
        ss: '%d secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        w: 'une semaine',
        ww: '%d semaines',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans',
    },
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_')
})

export function formatMinutes(minutes: number): string {
    return moment(0).to(moment(0).minutes(minutes), true)
}