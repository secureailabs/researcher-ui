import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import OPERATOR_LIST from 'src/constants/operatorList';
import { type TOperatorString } from 'src/shared/interfaces/customTypes';
import styles from './OperatorDropdown.module.css';

export interface IOperatorDropdown {
  operator: TOperatorString;
  index: number;
  handleOperatorChange: (index: number, data: TOperatorString) => void;
}

const OperatorDropdown: React.FC<IOperatorDropdown> = ({
  operator,
  index,
  handleOperatorChange,
}) => {
  return (
    <Box className={styles.container}>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-label">Operator</InputLabel>
        <Select
          labelId="operator"
          id="operator"
          label="operator"
          defaultValue=""
          value={operator}
          onChange={(event) => {
            handleOperatorChange(index, event.target.value as TOperatorString);
          }}
        >
          {OPERATOR_LIST.map((condition) => (
            <MenuItem key={condition.value} value={condition.value}>
              {condition.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default OperatorDropdown;
