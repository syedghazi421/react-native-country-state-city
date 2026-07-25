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
import { State } from '../types';
import { getStatesByCountryId, searchStates } from '../utils/data';

interface StatePickerProps {
  countryId?: number;
  selectedState?: State | null;
  onSelect: (state: State) => void;
}

const StatePicker: React.FC<StatePickerProps> = ({
  countryId,
  selectedState,
  onSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [states, setStates] = useState<State[]>([]);
  const [allStates, setAllStates] = useState<State[]>([]);

  useEffect(() => {
    if (countryId) {
      const loaded = getStatesByCountryId(countryId);
      setAllStates(loaded);
      setStates(loaded);
    } else {
      setAllStates([]);
      setStates([]);
    }
  }, [countryId]);

  useEffect(() => {
    if (search.trim()) {
      const filtered = searchStates(search).filter((s) =>
        countryId ? s.country_id === countryId : true
      );
      setStates(filtered);
    } else {
      setStates(allStates);
    }
  }, [search, allStates, countryId]);

  return (
    <View>
      <TouchableOpacity
        style={[styles.selector, !countryId && styles.disabled]}
        onPress={() => countryId && setModalVisible(true)}
      >
        <Text style={[styles.selectorText, !countryId && styles.placeholder]}>
          {selectedState
            ? selectedState.name
            : !countryId
            ? 'Select a country first'
            : 'Select State'}
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
              <Text style={styles.title}>Select State</Text>
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
              placeholder="Search state..."
              value={search}
              onChangeText={setSearch}
              autoFocus
            />

            <FlatList
              data={states}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.item,
                    selectedState?.id === item.id && styles.selectedItem,
                  ]}
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                    setSearch('');
                  }}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.code}>{item.state_code}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No states found</Text>
              }
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
  disabled: {
    opacity: 0.5,
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
    fontStyle: 'italic',
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
  code: {
    fontSize: 13,
    color: '#999',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 20,
    fontSize: 15,
  },
});

export default StatePicker;
