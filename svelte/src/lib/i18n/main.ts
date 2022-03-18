import { browser } from "$app/env";
import { locales } from "$lib/content/locale";
import type { LOCALE_CODE } from "$lib/content/schema";

const defaultLanguage: LOCALE_CODE = 'nl-BE'

export function getLanguage(url: URL): LOCALE_CODE {
    const urlLanguage = getLanguageFromURL(url)
    if (urlLanguage) {
        if (browser) setLanguageInLocalStorage(urlLanguage)
        return urlLanguage
    } else if (browser) {
        const localStorageLanguage = getLanguageFromLocalStorage()
        if (localStorageLanguage) return localStorageLanguage

        const browserLanguage = getLanguageFromBrowser()
        if (browserLanguage) return browserLanguage
    }
    return defaultLanguage
}

export function getLanguageFromBrowser(): LOCALE_CODE | undefined {
    if (window.navigator?.language) {
        const browserLanguage = window.navigator.language.toLocaleLowerCase()
        if ( browserLanguage.includes('nl') ) {
            return 'nl-BE'
        } else if (browserLanguage.includes('fr')) {
            return 'fr'
        }
    }
}

const localStorageLanguageKey = 'lang'

export function getLanguageFromLocalStorage(): LOCALE_CODE | undefined {
    const store = window.localStorage
    if (store) {
        const storedLanguage = store.getItem(localStorageLanguageKey)
        if (storedLanguage == locales.dutch) {
            return 'nl-BE'
        } else if (storedLanguage == locales.french) {
            return 'fr'
        }
    }
}

export function setLanguageInLocalStorage(language: LOCALE_CODE) {
    window.localStorage?.setItem(localStorageLanguageKey, language)
}

const urlCodes = {
    dutch: 'nl',
    french: 'fr'
}

export function getLanguageFromURL(url: URL): LOCALE_CODE | undefined {
    const urlLanguage = url.searchParams.get(localStorageLanguageKey)?.toLowerCase()
    if (urlLanguage == urlCodes.dutch) return 'nl-BE'
    else if (urlLanguage == urlCodes.french) return 'fr'
}

export function setLanguageInURL(language: LOCALE_CODE, url: URL): URL {
    const newURL = new URL(url)
    if (language == locales.dutch) newURL.searchParams.set(localStorageLanguageKey, urlCodes.dutch)
    else if (language == locales.french) newURL.searchParams.set(localStorageLanguageKey, urlCodes.french)
    return newURL
}