import React from 'react';
import { State } from '../types';
interface StatePickerProps {
    countryId?: number;
    selectedState?: State | null;
    onSelect: (state: State) => void;
}
declare const StatePicker: React.FC<StatePickerProps>;
export default StatePicker;
//# sourceMappingURL=StatePicker.d.ts.map