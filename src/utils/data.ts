import { Country, State } from '../types';
import countriesData from '../data/countries.json';
import statesData from '../data/states.json';

const countries: Country[] = countriesData as Country[];
const states: State[] = statesData as State[];

// ========================
// COUNTRY FUNCTIONS
// ========================

/**
 * Get all countries
 */
export function getAllCountries(): Country[] {
  return countries;
}

/**
 * Get country by ID
 */
export function getCountryById(id: number): Country | undefined {
  return countries.find((c) => c.id === id);
}

/**
 * Get country by ISO2 code (e.g., "US", "IN", "PK")
 */
export function getCountryByCode(code: string): Country | undefined {
  return countries.find(
    (c) => c.iso2 === code.toUpperCase() || c.iso3 === code.toUpperCase()
  );
}

/**
 * Search countries by name (case-insensitive partial match)
 */
export function searchCountries(query: string): Country[] {
  const q = query.toLowerCase();
  return countries.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      (c.native && c.native.toLowerCase().includes(q))
  );
}

// ========================
// STATE FUNCTIONS
// ========================

/**
 * Get all states
 */
export function getAllStates(): State[] {
  return states;
}

/**
 * Get states by country ID
 */
export function getStatesByCountryId(countryId: number): State[] {
  return states.filter((s) => s.country_id === countryId);
}

/**
 * Get states by country ISO2 code (e.g., "US", "IN")
 */
export function getStatesByCountryCode(code: string): State[] {
  return states.filter((s) => s.country_code === code.toUpperCase());
}

/**
 * Get state by ID
 */
export function getStateById(id: number): State | undefined {
  return states.find((s) => s.id === id);
}

/**
 * Search states by name (case-insensitive partial match)
 */
export function searchStates(query: string): State[] {
  const q = query.toLowerCase();
  return states.filter((s) => s.name.toLowerCase().includes(q));
}

// ========================
// COMBINED FUNCTIONS
// ========================

/**
 * Get a country with all its states
 */
export function getCountryWithStates(
  countryId: number
): { country?: Country; states: State[] } {
  const country = getCountryById(countryId);
  const countryStates = getStatesByCountryId(countryId);
  return { country, states: countryStates };
}
