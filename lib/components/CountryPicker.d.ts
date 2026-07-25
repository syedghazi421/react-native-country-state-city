import React from 'react';
import { Country } from '../types';
interface CountryPickerProps {
    selectedCountry?: Country | null;
    onSelect: (country: Country) => void;
}
declare const CountryPicker: React.FC<CountryPickerProps>;
export default CountryPicker;
//# sourceMappingURL=CountryPicker.d.ts.map