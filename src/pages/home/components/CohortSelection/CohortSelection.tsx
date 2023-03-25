import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import CohortConditionDropdown from 'src/pages/home/components/CohortConditionDropdown';
import styles from './CohortSelection.module.css';
import {
  type TOperatorString,
  type IFilter,
} from 'src/shared/interfaces/customTypes';
import OperatorDropdown from '../OperatorDropdown';

export interface ICohortSelection {}

// IOperatorString is a type that is used to define the type of the operator string. It can be either 'AND' or 'OR'

const CohortSelection: React.FC<ICohortSelection> = () => {
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [filterOperator, setFilterOperator] = useState<TOperatorString[]>([]);

  const handleAddFilter = (): void => {
    const lastFilterId =
      filters.length > 0 ? filters[filters.length - 1].id : 0;
    const newFilterId = lastFilterId + 1;
    const newFilterState = [
      ...filters,
      {
        id: newFilterId,
        variable: '',
        operator: '',
        value: '',
      },
    ];
    setFilters(newFilterState);

    // Add operator for the new filter
    if (filters.length > 0) {
      const newOperatorState = [...filterOperator, 'and' as TOperatorString];
      setFilterOperator(newOperatorState);
    }
  };

  const handleDeleteFilter = (id: number): void => {
    const newFilterState = filters.filter((f) => f.id !== id);
    setFilters(newFilterState);
  };

  const handleFilterChange = (data: IFilter): void => {
    const newFilterState = filters.map((f: IFilter) => {
      if (f.id === data.id) {
        return data;
      }
      return f;
    });
    setFilters(newFilterState);
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h5">Cohort Selection</Typography>
      <Box className={styles.filterDropdownContainer}>
        <Grid container spacing={'40px'} className={styles.filterDropdown}>
          {filters.map((filter: IFilter, index: number) => (
            <>
              {index > 0 && (
                <Box className={styles.operatorDropdownContainer}>
                  <OperatorDropdown operator={filterOperator[index - 1]} />
                </Box>
              )}
              <Grid item xs={12} key={filter.id}>
                <CohortConditionDropdown
                  filter={filter}
                  handleDeleteFilter={handleDeleteFilter}
                  handleFilterChange={handleFilterChange}
                />
              </Grid>
            </>
          ))}
        </Grid>
        <div className={styles.verticalLine}></div>
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={handleAddFilter}
          className={styles.addFilterButton}
        >
          Add Condition
        </Button>
      </Box>
    </Box>
  );
};

export default CohortSelection;
