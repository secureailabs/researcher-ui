/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, type HTMLAttributes } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CONDITION_LIST from 'src/constants/comparisionList';
import FEATURE_LIST from 'src/constants/featureVariable';
import styles from './CohortConditionDropdown.module.css';
import { type IAutocompleteOptionData } from 'src/shared/interfaces/customTypes';
import InputValueRenderer from './ConditionalCohortValue';

export interface ICohortConditionDropdown {
  filter: any;
  handleFilterChange: (data: any) => void;
  handleDeleteFilter: (id: number) => void;
}

interface StyledOptionProps extends HTMLAttributes<HTMLDivElement> {
  option: IAutocompleteOptionData;
}

const StyledOption = styled('div')<StyledOptionProps>(({ option }) => ({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
}));

const CohortConditionDropdown: React.FC<ICohortConditionDropdown> = ({
  filter,
  handleFilterChange,
  handleDeleteFilter,
}) => {
  const [value, setValue] = React.useState<IAutocompleteOptionData | null>(
    null
  );
  const [inputValue, setInputValue] = React.useState('');

  // custom render option : Implemented to handle long text wrapping in dropdown
  const renderOption = (props: any, option: any): JSX.Element => (
    <li {...props} key={option.series_name}>
      <StyledOption option={option}>{option.series_name}</StyledOption>
    </li>
  );

  const handleFilterDataChange = (data: any): void => {
    const newFilter = {
      ...filter,
      ...data,
    };
    handleFilterChange(newFilter);
  };

  useEffect(() => {
    // filter = {id: newFilterId,variable: '', operator: '',value: ''}
    // IAutocompleteOptionData = {series_name: string, dataType: string, choices: string}
    const filterVariable = FEATURE_LIST.find(
      (feature) => feature.series_name === filter.variable
    );
    if (filterVariable === undefined) {
      setValue(null);
    } else {
      setValue(filterVariable);
    }
  }, []);

  return (
    <Box className={styles.container}>
      <Box className={styles.featureContainer}>
        <Autocomplete
          disablePortal
          id="feature-dropdown"
          options={FEATURE_LIST}
          getOptionLabel={(option) => option.series_name}
          renderInput={(params) => <TextField {...params} label="Feature" />}
          renderOption={renderOption}
          onChange={(event, newValue) => {
            if (newValue != null) {
              handleFilterDataChange({ variable: newValue?.series_name });
            } else {
              handleFilterDataChange({ variable: '' });
            }
            setValue(newValue);
          }}
          value={value}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
        />
      </Box>
      <Box className={styles.conditionContainer}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Condition</InputLabel>
          <Select
            labelId="operator"
            id="operator"
            label="operator"
            defaultValue=""
            value={filter.operator}
            onChange={(event) => {
              handleFilterDataChange({ operator: event.target.value });
            }}
          >
            {CONDITION_LIST.map((condition) => (
              <MenuItem key={condition.value} value={condition.value}>
                {condition.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className={styles.valueContainer}>
        {/* <TextField
          id="outlined-basic"
          label="Value"
          variant="outlined"
          value={filter.value}
          onChange={(event) => {
            handleFilterDataChange({ value: event.target.value });
          }}
        /> */}
        <InputValueRenderer item={value} />
      </Box>
      <Box className={styles.deleteButton}>
        <Button
          variant="text"
          color="error"
          onClick={() => {
            handleDeleteFilter(filter.id);
          }}
        >
          <HighlightOffIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default CohortConditionDropdown;
