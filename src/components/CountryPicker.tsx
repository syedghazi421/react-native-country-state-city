import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import { Country } from '../types';
import { getAllCountries, searchCountries } from '../utils/data';

interface CountryPickerProps {
  selectedCountry?: Country | null;
  onSelect: (country: Country) => void;
}

const CountryPicker: React.FC<CountryPickerProps> = ({
  selectedCountry,
  onSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    if (search.trim()) {
      setCountries(searchCountries(search));
    } else {
      setCountries(getAllCountries());
    }
  }, [search]);

  const handleSelect = (country: Country) => {
    onSelect(country);
    setModalVisible(false);
    setSearch('');
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selectedCountry
            ? `${selectedCountry.emoji} ${selectedCountry.name}`
            : 'Select Country'}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Select Country</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setSearch('');
                }}
              >
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Search country..."
              value={search}
              onChangeText={setSearch}
              autoFocus
            />

            <FlatList
              data={countries}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.item,
                    selectedCountry?.id === item.id && styles.selectedItem,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.itemText}>
                    {item.emoji} {item.name}
                  </Text>
                  <Text style={styles.phoneCode}>+{item.phonecode}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    backgroundColor: '#fff',
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 12,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    fontSize: 20,
    color: '#999',
    padding: 4,
  },
  searchInput: {
    margin: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: '#f5f5f5',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedItem: {
    backgroundColor: '#e8f4fd',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  phoneCode: {
    fontSize: 14,
    color: '#999',
  },
});

export default CountryPicker;
