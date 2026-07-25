import { Country, State } from '../types';
/**
 * Get all countries
 */
export declare function getAllCountries(): Country[];
/**
 * Get country by ID
 */
export declare function getCountryById(id: number): Country | undefined;
/**
 * Get country by ISO2 code (e.g., "US", "IN", "PK")
 */
export declare function getCountryByCode(code: string): Country | undefined;
/**
 * Search countries by name (case-insensitive partial match)
 */
export declare function searchCountries(query: string): Country[];
/**
 * Get all states
 */
export declare function getAllStates(): State[];
/**
 * Get states by country ID
 */
export declare function getStatesByCountryId(countryId: number): State[];
/**
 * Get states by country ISO2 code (e.g., "US", "IN")
 */
export declare function getStatesByCountryCode(code: string): State[];
/**
 * Get state by ID
 */
export declare function getStateById(id: number): State | undefined;
/**
 * Search states by name (case-insensitive partial match)
 */
export declare function searchStates(query: string): State[];
/**
 * Get a country with all its states
 */
export declare function getCountryWithStates(countryId: number): {
    country?: Country;
    states: State[];
};
//# sourceMappingURL=data.d.ts.map