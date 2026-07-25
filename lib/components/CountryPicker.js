"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const data_1 = require("../utils/data");
const CountryPicker = ({ selectedCountry, onSelect, }) => {
    const [modalVisible, setModalVisible] = (0, react_1.useState)(false);
    const [search, setSearch] = (0, react_1.useState)('');
    const [countries, setCountries] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        if (search.trim()) {
            setCountries((0, data_1.searchCountries)(search));
        }
        else {
            setCountries((0, data_1.getAllCountries)());
        }
    }, [search]);
    const handleSelect = (country) => {
        onSelect(country);
        setModalVisible(false);
        setSearch('');
    };
    return (<react_native_1.View>
      <react_native_1.TouchableOpacity style={styles.selector} onPress={() => setModalVisible(true)}>
        <react_native_1.Text style={styles.selectorText}>
          {selectedCountry
            ? `${selectedCountry.emoji} ${selectedCountry.name}`
            : 'Select Country'}
        </react_native_1.Text>
        <react_native_1.Text style={styles.arrow}>▼</react_native_1.Text>
      </react_native_1.TouchableOpacity>

      <react_native_1.Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <react_native_1.View style={styles.modalOverlay}>
          <react_native_1.View style={styles.modalContent}>
            <react_native_1.View style={styles.header}>
              <react_native_1.Text style={styles.title}>Select Country</react_native_1.Text>
              <react_native_1.TouchableOpacity onPress={() => {
            setModalVisible(false);
            setSearch('');
        }}>
                <react_native_1.Text style={styles.closeButton}>✕</react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>

            <react_native_1.TextInput style={styles.searchInput} placeholder="Search country..." value={search} onChangeText={setSearch} autoFocus/>

            <react_native_1.FlatList data={countries} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (<react_native_1.TouchableOpacity style={[
                styles.item,
                (selectedCountry === null || selectedCountry === void 0 ? void 0 : selectedCountry.id) === item.id && styles.selectedItem,
            ]} onPress={() => handleSelect(item)}>
                  <react_native_1.Text style={styles.itemText}>
                    {item.emoji} {item.name}
                  </react_native_1.Text>
                  <react_native_1.Text style={styles.phoneCode}>+{item.phonecode}</react_native_1.Text>
                </react_native_1.TouchableOpacity>)}/>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.Modal>
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
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
        paddingBottom: react_native_1.Platform.OS === 'ios' ? 40 : 20,
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
exports.default = CountryPicker;
//# sourceMappingURL=CountryPicker.js.map