export type Currencies = { code: string; name: string; symbol: string };
export type Language = {
  iso639_1: string;
  name: string;
};
export interface RawCountry {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  currencies: Currencies[];
  languages: Language[];
  callingCodes: string[];
  topLevelDomain: string[];
  borders: string[];
  flag: string;
}

export interface Card {
  name: string;
  flag: string;
  capital: string;
  region: string;
  population: number;
  languages: Language[];
}

export type ApiResponse = RawCountry[];
