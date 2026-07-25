import { Country, State, City } from '../types';
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

/**
 * Get all cities (from all states)
 */
export function getAllCities(): City[] {
  return states.flatMap((s) => s.cities);
}

/**
 * Get cities by state ID
 */
export function getCitiesByStateId(stateId: number): City[] {
  const state = states.find((s) => s.id === stateId);
  return state ? state.cities : [];
}

/**
 * Get cities by country ID
 */
export function getCitiesByCountryId(countryId: number): City[] {
  return states
    .filter((s) => s.country_id === countryId)
    .flatMap((s) => s.cities);
}

/**
 * Get cities by country code (ISO2)
 */
export function getCitiesByCountryCode(code: string): City[] {
  return states
    .filter((s) => s.country_code === code.toUpperCase())
    .flatMap((s) => s.cities);
}

/**
 * Get city by ID
 */
export function getCityById(id: number): City | undefined {
  for (const state of states) {
    const found = state.cities.find((c) => c.id === id);
    if (found) return found;
  }
  return undefined;
}

/**
 * Search cities by name (case-insensitive partial match)
 */
export function searchCities(query: string): City[] {
  const q = query.toLowerCase();
  return states.flatMap((s) =>
    s.cities.filter((c) => c.name.toLowerCase().includes(q))
  );
}

/**
 * Get a state with all its cities
 */
export function getStateWithCities(
  stateId: number
): { state?: State; cities: City[] } {
  const state = getStateById(stateId);
  return { state, cities: state ? state.cities : [] };
}

/**
 * Get a country with all its cities
 */
export function getCountryWithCities(
  countryId: number
): { country?: Country; cities: City[] } {
  const country = getCountryById(countryId);
  const countryCities = getCitiesByCountryId(countryId);
  return { country, cities: countryCities };
}
