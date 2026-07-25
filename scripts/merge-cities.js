/**
 * This script merges cities into the states.json file.
 * Each state object will have a "cities" array containing its cities.
 * This eliminates the need for the large standalone cities.json file.
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');

console.log('Loading states.json...');
const states = JSON.parse(fs.readFileSync(path.join(dataDir, 'states.json'), 'utf-8'));

console.log('Loading cities.json...');
const cities = JSON.parse(fs.readFileSync(path.join(dataDir, 'cities.json'), 'utf-8'));

console.log(`States: ${states.length}, Cities: ${cities.length}`);

// Create a map of state_id -> cities
console.log('Grouping cities by state_id...');
const citiesByStateId = {};
for (const city of cities) {
  const stateId = city.state_id;
  if (!citiesByStateId[stateId]) {
    citiesByStateId[stateId] = [];
  }
  citiesByStateId[stateId].push(city);
}

// Attach cities to each state
console.log('Attaching cities to states...');
let totalCitiesAttached = 0;
for (const state of states) {
  const stateCities = citiesByStateId[state.id] || [];
  state.cities = stateCities;
  totalCitiesAttached += stateCities.length;
}

console.log(`Total cities attached: ${totalCitiesAttached}`);

// Write the updated states.json
console.log('Writing updated states.json...');
const outputPath = path.join(dataDir, 'states.json');
fs.writeFileSync(outputPath, JSON.stringify(states, null, 2), 'utf-8');

console.log('Done! states.json has been updated with cities embedded.');
