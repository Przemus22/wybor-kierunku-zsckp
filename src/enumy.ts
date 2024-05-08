export enum Zainteresowania {
    INFORMATYKA = 'informatyka',
    GRY = 'gry',
    PROGRAMOWANIE = 'programowanie',
    SAMOCHODY = 'samochody',
    MOTORY = 'motory',
    NAPRAWIANIE = 'naprawianie',
    ELEKTRYKA = 'elektryka',
    ZARZĄDZANIE = 'zarządzanie',
    SPORT = 'sport',
    SPOTKANIAZEZNAJOMYMI = 'spotkania ze znajomymi',
    PRACAMAGAZYNÓW = 'praca magazynów',
    BUDOWANIE = 'budowanie',
    ARCHITEKTURA = 'architektura',
    RYSOWANIE = 'rysowanie',
}
export enum Profil {
    INFORMATYK = 'informatyk',
    MECHANIK = 'mechanik',
    BUDOWLANKA = 'budowlanka',
    SPEDYTOR = 'spedytor',
    LOGISTYK = 'logistyk',
    ELEKTRYK = 'elektryk',
    ZAWODOWKA = 'zawodowka',
}

export enum Poziomy {
    MALY = 1,
    SREDNI = 2,
    DUZY = 3,
}

export interface Kierunek {
    nazwa: string
    tagi: string[]
    opinia: number
    poziom: number
    url: string
    informacje: string
}

export interface Dane {
    tagi: string[]
    opinia: number
    poziom: number
}
