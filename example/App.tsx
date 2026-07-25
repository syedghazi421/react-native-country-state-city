import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import {
  CountryPicker,
  StatePicker,
  Country,
  State,
} from 'react-native-country-state-city';

const App: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Country & State</Text>
        <Text style={styles.subtitle}>React Native Package Example</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Country</Text>
          <CountryPicker
            selectedCountry={selectedCountry}
            onSelect={(country) => {
              setSelectedCountry(country);
              setSelectedState(null);
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>State</Text>
          <StatePicker
            countryId={selectedCountry?.id}
            selectedState={selectedState}
            onSelect={setSelectedState}
          />
        </View>

        <View style={styles.result}>
          <Text style={styles.resultTitle}>Selected Values</Text>
          <Text style={styles.resultText}>
            Country: {selectedCountry?.emoji} {selectedCountry?.name || '-'}
          </Text>
          <Text style={styles.resultText}>
            State: {selectedState?.name || '-'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  result: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
  },
});

export default App;
