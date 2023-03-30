import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { type SetStateAction, useState } from 'react';
import { type IAutocompleteOptionData } from 'src/shared/interfaces/customTypes';
import styles from './CohortConditionDropdown.module.css';

export interface IIntervalInput {
  onChange: (value: string) => void;
}

export interface ICategoricalSelect {
  seriesName: string;
  listValues: string[];
  onChange: (value: string) => void;
}

export interface IInputValueRenderer {
  item: IAutocompleteOptionData | null;
}

const IntervalInput: React.FC<IIntervalInput> = ({ onChange }) => {
  return (
    // MUI Textfield component with input type as number
    <TextField
      className={styles.textfield}
      id="standard-number"
      label="Value"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );
};

const CategoricalSelect: React.FC<ICategoricalSelect> = ({
  seriesName,
  listValues,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }): void => {
    setSelectedValue(event.target.value);
    onChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={seriesName}>Value</InputLabel>
      <Select
        id={seriesName}
        value={selectedValue}
        onChange={handleChange}
        placeholder="Select"
        label="Value"
      >
        <MenuItem value="">Select</MenuItem>
        {listValues.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const InputValueRenderer: React.FC<IInputValueRenderer> = ({ item }) => {
  const [value, setValue] = useState('');

  const handleValueChange = (updatedValue: string): void => {
    setValue(updatedValue);
  };

  if (item === null) {
    return (
      // MUI Textfield component with input but disabled
      <TextField
        className={styles.textfield}
        id="standard-number"
        label="Value"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        disabled
      />
    );
  }

  switch (item.__type__) {
    case 'SeriesDataModelInterval':
      return (
        <IntervalInput key={item.series_name} onChange={handleValueChange} />
      );
    case 'SeriesDataModelCategorical':
      return (
        <CategoricalSelect
          key={item.series_name}
          seriesName={item.series_name}
          listValues={item.list_value as string[]}
          onChange={handleValueChange}
        />
      );
    default:
      return (
        <TextField
          className={styles.textfield}
          id="standard-number"
          label="Value"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
      );
  }
};

export default InputValueRenderer;
