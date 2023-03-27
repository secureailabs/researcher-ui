import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import CohortConditionDropdown from 'src/pages/home/components/CohortConditionDropdown';
import styles from './CohortSelection.module.css';
import {
  type TOperatorString,
  type IFilter,
} from 'src/shared/interfaces/customTypes';
import OperatorDropdown from '../OperatorDropdown';
import CohortList from '../CohortList';

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

  const handleCohortSelection = (
    selectedFilter: IFilter[],
    selectedFilterOperator: TOperatorString[]
  ): void => {
    setFilters(selectedFilter);
    setFilterOperator(selectedFilterOperator);
  };

  const handleOperatorChange = (
    index: number,
    operator: TOperatorString
  ): void => {
    const newOperatorState = filterOperator.map((f, i) => {
      if (i === index) {
        return operator;
      }
      return f;
    });
    setFilterOperator(newOperatorState);
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h5">Cohort Selection</Typography>
      <Box className={styles.container2}>
        <Box className={styles.cohortListContainer}>
          <CohortList handleCohortSelection={handleCohortSelection} />
        </Box>
        <Box className={styles.filterDropdownContainer}>
          {/* The section below renders combination of features conditions eg. a and b or c */}
          <Grid container spacing={'40px'} className={styles.filterDropdown}>
            {filters.map((filter: IFilter, index: number) => (
              <React.Fragment key={`fragment-${filter.id}`}>
                {index > 0 ? (
                  <Box className={styles.operatorDropdownContainer}>
                    <OperatorDropdown
                      operator={filterOperator[index - 1]}
                      index={index - 1}
                      handleOperatorChange={handleOperatorChange}
                    />
                  </Box>
                ) : null}
                <Grid item xs={12}>
                  <CohortConditionDropdown
                    filter={filter}
                    handleDeleteFilter={handleDeleteFilter}
                    handleFilterChange={handleFilterChange}
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <div className={styles.verticalLine}></div>
        </Box>
      </Box>
      <Box className={styles.buttonContainer}>
        <Button
          variant="contained"
          onClick={handleAddFilter}
          className={styles.addFilterButton}
        >
          Add Condition
        </Button>
        <Button variant="outlined" className={styles.saveCohortButton}>
          Save Cohort
        </Button>
      </Box>
    </Box>
  );
};

export default CohortSelection;
