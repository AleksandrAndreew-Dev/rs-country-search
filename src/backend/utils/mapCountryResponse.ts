import type { ApiResponse, Card } from "../utils/types/types.js";
export function mapCountryResponse(response: ApiResponse): Card[] {
  const cards = response.map((country) => {
    return {
      name: country.name,
      flag: country.flag,
      capital: country.capital,
      region: country.region,
      population: country.population,
      languages: country.languages,
    };
  });
  return cards;
}
