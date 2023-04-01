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
  value: string;
}

export interface ICategoricalSelect {
  seriesName: string;
  listValues: string[];
  onChange: (value: string) => void;
  value: string;
}

export interface IInputValueRenderer {
  item: IAutocompleteOptionData | null;
  value: string;
  onChange: (value: string) => void;
}

const IntervalInput: React.FC<IIntervalInput> = ({ onChange, value }) => {
  return (
    <TextField
      className={styles.textfield}
      id="standard-number"
      label="Value"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );
};

const CategoricalSelect: React.FC<ICategoricalSelect> = ({
  seriesName,
  listValues,
  value,
  onChange,
}) => {
  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }): void => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={seriesName}>Value</InputLabel>
      <Select
        id={seriesName}
        onChange={handleChange}
        placeholder="Select"
        label="Value"
        value={value}
      >
        <MenuItem value="">Select</MenuItem>
        {listValues.map((v) => (
          <MenuItem key={v} value={v}>
            {v}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const InputValueRenderer: React.FC<IInputValueRenderer> = ({
  item,
  value,
  onChange,
}) => {
  const handleValueChange = (updatedValue: string): void => {
    onChange(updatedValue);
  };

  if (item === null) {
    return (
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
        <IntervalInput
          key={item.series_name}
          onChange={handleValueChange}
          value={value}
        />
      );
    case 'SeriesDataModelCategorical':
      return (
        <CategoricalSelect
          key={item.series_name}
          seriesName={item.series_name}
          listValues={item.list_value as string[]}
          onChange={handleValueChange}
          value={value}
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
          value={value}
        />
      );
  }
};

export default InputValueRenderer;
