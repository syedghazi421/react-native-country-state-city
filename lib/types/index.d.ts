export interface Country {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phonecode: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    region_id: number;
    subregion: string;
    subregion_id: number;
    nationality: string;
    timezones: Timezone[];
    translations: Record<string, string>;
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
}
export interface Timezone {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
}
export interface State {
    id: number;
    name: string;
    country_id: number;
    country_code: string;
    country_name: string;
    state_code: string;
    type: string | null;
    latitude: string;
    longitude: string;
}
export interface CountryWithStates {
    country: Country;
    states: State[];
}
//# sourceMappingURL=index.d.ts.map