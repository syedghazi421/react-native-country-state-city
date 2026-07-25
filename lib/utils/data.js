"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountries = getAllCountries;
exports.getCountryById = getCountryById;
exports.getCountryByCode = getCountryByCode;
exports.searchCountries = searchCountries;
exports.getAllStates = getAllStates;
exports.getStatesByCountryId = getStatesByCountryId;
exports.getStatesByCountryCode = getStatesByCountryCode;
exports.getStateById = getStateById;
exports.searchStates = searchStates;
exports.getCountryWithStates = getCountryWithStates;
const countries_json_1 = __importDefault(require("../data/countries.json"));
const states_json_1 = __importDefault(require("../data/states.json"));
const countries = countries_json_1.default;
const states = states_json_1.default;
// ========================
// COUNTRY FUNCTIONS
// ========================
/**
 * Get all countries
 */
function getAllCountries() {
    return countries;
}
/**
 * Get country by ID
 */
function getCountryById(id) {
    return countries.find((c) => c.id === id);
}
/**
 * Get country by ISO2 code (e.g., "US", "IN", "PK")
 */
function getCountryByCode(code) {
    return countries.find((c) => c.iso2 === code.toUpperCase() || c.iso3 === code.toUpperCase());
}
/**
 * Search countries by name (case-insensitive partial match)
 */
function searchCountries(query) {
    const q = query.toLowerCase();
    return countries.filter((c) => c.name.toLowerCase().includes(q) ||
        (c.native && c.native.toLowerCase().includes(q)));
}
// ========================
// STATE FUNCTIONS
// ========================
/**
 * Get all states
 */
function getAllStates() {
    return states;
}
/**
 * Get states by country ID
 */
function getStatesByCountryId(countryId) {
    return states.filter((s) => s.country_id === countryId);
}
/**
 * Get states by country ISO2 code (e.g., "US", "IN")
 */
function getStatesByCountryCode(code) {
    return states.filter((s) => s.country_code === code.toUpperCase());
}
/**
 * Get state by ID
 */
function getStateById(id) {
    return states.find((s) => s.id === id);
}
/**
 * Search states by name (case-insensitive partial match)
 */
function searchStates(query) {
    const q = query.toLowerCase();
    return states.filter((s) => s.name.toLowerCase().includes(q));
}
// ========================
// COMBINED FUNCTIONS
// ========================
/**
 * Get a country with all its states
 */
function getCountryWithStates(countryId) {
    const country = getCountryById(countryId);
    const countryStates = getStatesByCountryId(countryId);
    return { country, states: countryStates };
}
//# sourceMappingURL=data.js.map