/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { type HTMLAttributes } from 'react';
import CONDITION_LIST from 'src/constants/comparisionList';
import FEATURE_LIST from 'src/constants/featureVariable';
import styles from './CohortConditionDropdown.module.css';

export interface ICohortConditionDropdown {}

interface AutocompleteOptionData {
  variableName: string;
  dataType: string;
  choices: string;
}

interface StyledOptionProps extends HTMLAttributes<HTMLDivElement> {
  option: AutocompleteOptionData;
}

const StyledOption = styled('div')<StyledOptionProps>(({ option }) => ({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
}));

const CohortConditionDropdown: React.FC<ICohortConditionDropdown> = () => {
  // custom render option : Implemented to handle long text wrapping in dropdown
  const renderOption = (props: any, option: any): JSX.Element => (
    <li {...props} key={option.variableName}>
      <StyledOption option={option}>{option.variableName}</StyledOption>
    </li>
  );

  return (
    <Box className={styles.container}>
      <Box className={styles.featureContainer}>
        <Autocomplete
          disablePortal
          id="feature-dropdown"
          options={FEATURE_LIST}
          getOptionLabel={(option) =>
            (option as AutocompleteOptionData).variableName
          }
          renderInput={(params) => <TextField {...params} label="Feature" />}
          renderOption={renderOption}
        />
      </Box>
      <Box className={styles.conditionContainer}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Condition</InputLabel>
          <Select
            labelId="comparison-condition"
            id="comparison-condition"
            label="comparison"
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
        <TextField id="outlined-basic" label="Value" variant="outlined" />
      </Box>
    </Box>
  );
};

export default CohortConditionDropdown;
