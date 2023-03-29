import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import CohortConditionDropdown from 'src/pages/home/components/CohortConditionDropdown';
import styles from './CohortSelection.module.css';
import {
  type TOperatorString,
  type IFilter,
  type ICohortListData,
} from 'src/shared/interfaces/customTypes';
import OperatorDropdown from '../OperatorDropdown';
import CohortList from '../CohortList';
import COHORT_LIST_DATA from 'src/constants/cohortList';

export interface ICohortSelection {}

const CohortSelection: React.FC<ICohortSelection> = () => {
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [filterOperator, setFilterOperator] = useState<TOperatorString[]>([]);
  const [cohortListData, setCohortListData] = useState<any[]>(COHORT_LIST_DATA);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

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
    const index = filters.findIndex((f) => f.id === id);
    const newFilterState = [...filters];
    newFilterState.splice(index, 1);
    setFilters(newFilterState);

    // Delete operator for the deleted filter
    if (filters.length > 1) {
      const newOperatorState = [...filterOperator];
      newOperatorState.splice(index - 1, 1);
      setFilterOperator(newOperatorState);
    }
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
    selectedFilterOperator: TOperatorString[],
    sIndex: number
  ): void => {
    setFilters(selectedFilter);
    setFilterOperator(selectedFilterOperator);
    setSelectedIndex(sIndex);
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

  const handleSaveCohort = (): void => {
    if (selectedIndex === -1) {
      console.log('Save new cohort');
    } else {
      const newCohortListData = cohortListData.map((c, i) => {
        if (i === selectedIndex) {
          return {
            ...c,
            filters,
            filterOperator,
          };
        }
        return c;
      });
      setCohortListData(newCohortListData);
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.titleContainer}>
        <Typography variant="h5">Cohort Selection</Typography>
      </Box>
      <Box className={styles.container2}>
        <Box className={styles.cohortListContainer}>
          <CohortList
            handleCohortSelection={handleCohortSelection}
            cohortListData={cohortListData}
          />
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
        <Button
          variant="outlined"
          className={styles.saveCohortButton}
          onClick={handleSaveCohort}
        >
          Save Cohort
        </Button>
      </Box>
    </Box>
  );
};

export default CohortSelection;
