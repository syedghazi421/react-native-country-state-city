# react-native-country-state-city

A lightweight, zero-dependency React Native library for selecting countries, states, and cities with rich metadata like flags, phone codes, currencies, and timezones.

## Features

* Complete country data (ISO codes, flags, phone codes, currencies, timezones)
* State/region support mapped to countries
* Cities nested inside each state — no extra large data files to load
* Built-in search (countries, states & cities)
* Ready-to-use UI components (CountryPicker, StatePicker)
* Utility functions (no UI required) for all data types
* Zero external dependencies
* Full TypeScript support

## Installation

```bash
npm install react-native-country-state-city
```

or

```bash
yarn add react-native-country-state-city
```

## Requirements

* React >= 16.8.0
* React Native >= 0.60.0

## Usage

### UI Components

#### Country Picker

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { CountryPicker } from 'react-native-country-state-city';

export default function App() {
  const [country, setCountry] = useState(null);

  return (
    <View>
      <CountryPicker
        selectedCountry={country}
        onSelect={setCountry}
      />
    </View>
  );
}
```

#### State Picker

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { CountryPicker, StatePicker } from 'react-native-country-state-city';

export default function App() {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);

  return (
    <View>
      <CountryPicker
        selectedCountry={country}
        onSelect={(c) => {
          setCountry(c);
          setState(null);
        }}
      />

      <StatePicker
        countryId={country?.id}
        selectedState={state}
        onSelect={setState}
      />
    </View>
  );
}
```

### Utility Functions

All functions are importable directly from the package:

```ts
import {
  getAllCountries,
  getCountryById,
  getCountryByCode,
  searchCountries,
  getAllStates,
  getStatesByCountryId,
  getStatesByCountryCode,
  getStateById,
  searchStates,
  getCountryWithStates,
  getAllCities,
  getCitiesByStateId,
  getCitiesByCountryId,
  getCitiesByCountryCode,
  getCityById,
  searchCities,
  getStateWithCities,
  getCountryWithCities,
} from 'react-native-country-state-city';
```

#### Countries

```ts
// Get all countries
const allCountries = getAllCountries();

// Get country by ID
const country = getCountryById(1); // Afghanistan

// Get country by ISO2 or ISO3 code
const us = getCountryByCode('US'); // United States

// Search countries by name (case-insensitive)
const matches = searchCountries('india');
```

#### States

```ts
// Get all states
const allStates = getAllStates();

// Get states by country ID
const states = getStatesByCountryId(1); // States of Afghanistan

// Get states by country ISO2 code
const states = getStatesByCountryCode('US');

// Get state by ID
const state = getStateById(3901); // Badakhshan

// Search states by name
const matches = searchStates('texas');

// Get a country with all its states
const { country, states } = getCountryWithStates(1);
```

#### Cities

Cities are embedded inside each state object — just access `state.cities`:

```ts
// Get all states (cities are included)
const states = getAllStates();

// Access cities directly from a state
const badakhshan = getStateById(3901);
console.log(badakhshan.cities); // City[]

// Or use dedicated city functions
const allCities = getAllCities();
const cities = getCitiesByStateId(3901);
const citiesByCountry = getCitiesByCountryId(1);
const citiesByCode = getCitiesByCountryCode('US');
const city = getCityById(52); // Ashkāsham
const searched = searchCities('fayzabad');

// Get a state with all its cities
const { state, cities } = getStateWithCities(3901);

// Get a country with all its cities
const { country, cities } = getCountryWithCities(1);
```

### TypeScript Types

```ts
import type { Country, State, City, CountryWithStates } from 'react-native-country-state-city';
```

## API Reference

### Country

| Property | Type | Description |
|---|---|---|
| `id` | `number` | Unique identifier |
| `name` | `string` | Country name |
| `iso2` | `string` | ISO 3166-1 alpha-2 code |
| `iso3` | `string` | ISO 3166-1 alpha-3 code |
| `phonecode` | `string` | International dialing code |
| `capital` | `string` | Capital city |
| `currency` | `string` | Currency code |
| `currency_name` | `string` | Currency name |
| `currency_symbol` | `string` | Currency symbol |
| `emoji` | `string` | Country flag emoji |
| `native` | `string` | Native name |
| `region` | `string` | Geographic region |
| `subregion` | `string` | Geographic subregion |
| `nationality` | `string` | Nationality demonym |
| `timezones` | `Timezone[]` | Timezone data |
| `latitude` | `string` | Latitude |
| `longitude` | `string` | Longitude |

### State

| Property | Type | Description |
|---|---|---|
| `id` | `number` | Unique identifier |
| `name` | `string` | State/region name |
| `country_id` | `number` | Parent country ID |
| `country_code` | `string` | Parent country ISO2 code |
| `country_name` | `string` | Parent country name |
| `state_code` | `string` | State code/abbreviation |
| `type` | `string \| null` | State type (state, province, etc.) |
| `latitude` | `string` | Latitude |
| `longitude` | `string` | Longitude |
| `cities` | `City[]` | Cities belonging to this state |

### City

| Property | Type | Description |
|---|---|---|
| `id` | `number` | Unique identifier |
| `name` | `string` | City name |
| `state_id` | `number` | Parent state ID |
| `state_code` | `string` | Parent state code |
| `state_name` | `string` | Parent state name |
| `country_id` | `number` | Parent country ID |
| `country_code` | `string` | Parent country ISO2 code |
| `country_name` | `string` | Parent country name |
| `latitude` | `string` | Latitude |
| `longitude` | `string` | Longitude |
| `wikiDataId` | `string` | Wikidata ID |

## License

ISC
