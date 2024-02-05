import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import CohortConditionDropdown from 'src/pages/DataFederationHome/components/CohortConditionDropdown';
import styles from './CohortSelection.module.css';
import { type TOperatorString, type IFilter, type ICohortListData, IAutocompleteOptionData } from 'src/shared/types/customTypes';
import OperatorDropdown from '../OperatorDropdown';
import CohortList from '../CohortList';
import COHORT_LIST_DATA from 'src/constants/cohortList';
import NewCohortDialog from '../NewCohortDialog';
import useNotification from 'src/hooks/useNotification';
import AnimateButton from 'src/components/extended/AnimateButton';

export interface ICohortSelection {
  handleChildFilterChange: (data: IFilter[]) => void;
  handleChildFilterOperatorChange: (data: TOperatorString[]) => void;
  featureList: IAutocompleteOptionData[];
}

const CohortSelection: React.FC<ICohortSelection> = ({ handleChildFilterChange, handleChildFilterOperatorChange, featureList }) => {
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [filterOperator, setFilterOperator] = useState<TOperatorString[]>([]);
  const [cohortListData, setCohortListData] = useState<ICohortListData[]>(COHORT_LIST_DATA as ICohortListData[]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [openNewCohortDialog, setOpenNewCohortDialog] = useState<boolean>(false);

  const [sendNotification] = useNotification();

  const handleAddFilter = (): void => {
    const lastFilterId = filters.length > 0 ? filters[filters.length - 1].id : 0;
    const newFilterId = lastFilterId + 1;
    const newFilterState = [
      ...filters,
      {
        id: newFilterId,
        series_name: '',
        operator: '',
        value: ''
      }
    ];
    setFilters(newFilterState);
    handleChildFilterChange(newFilterState);

    // Add operator for the new filter
    if (filters.length > 0) {
      const newOperatorState = [...filterOperator, 'and' as TOperatorString];
      setFilterOperator(newOperatorState);
      handleChildFilterOperatorChange(newOperatorState);
    }
  };

  const handleDeleteFilter = (id: number): void => {
    const index = filters.findIndex((f) => f.id === id);
    const newFilterState = [...filters];
    newFilterState.splice(index, 1);
    setFilters(newFilterState);
    handleChildFilterChange(newFilterState);

    // Delete operator for the deleted filter
    if (filters.length > 1) {
      const newOperatorState = [...filterOperator];
      newOperatorState.splice(index - 1, 1);
      setFilterOperator(newOperatorState);
      handleChildFilterOperatorChange(newOperatorState);
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
    handleChildFilterChange(newFilterState);
  };

  const handleCohortSelection = (selectedFilter: IFilter[], selectedFilterOperator: TOperatorString[], sIndex: number): void => {
    setFilters(selectedFilter);
    setFilterOperator(selectedFilterOperator);
    setSelectedIndex(sIndex);

    handleChildFilterChange(selectedFilter);
    handleChildFilterOperatorChange(selectedFilterOperator);
  };

  const handleOperatorChange = (index: number, operator: TOperatorString): void => {
    const newOperatorState = filterOperator.map((f, i) => {
      if (i === index) {
        return operator;
      }
      return f;
    });
    setFilterOperator(newOperatorState);
    handleChildFilterOperatorChange(newOperatorState);
  };

  const handleSaveCohort = (): void => {
    if (selectedIndex === -1) {
      if (filters.length === 0) {
        sendNotification({
          msg: 'Please add at least one condition',
          variant: 'error'
        });
        return;
      }
      setOpenNewCohortDialog(true);
    } else {
      const newCohortListData = cohortListData.map((c, i) => {
        if (i === selectedIndex) {
          return {
            ...c,
            filters,
            filterOperator
          };
        }
        return c;
      });
      setCohortListData(newCohortListData);
      sendNotification({
        msg: 'Cohort saved successfully',
        variant: 'success'
      });
    }
  };

  const handleNewCohortDialogSave = (cohortLabel: string): void => {
    if (cohortLabel === '') {
      sendNotification({
        msg: 'Please enter cohort label',
        variant: 'error'
      });
      return;
    }

    const newCohortListData = [
      ...cohortListData,
      {
        cohortId: cohortLabel,
        cohortName: cohortLabel,
        cohortDescription: 'Sample cohort description',
        filters,
        filterOperator
      }
    ];
    setCohortListData(newCohortListData);
    setOpenNewCohortDialog(false);
    setSelectedIndex(cohortListData.length);
    sendNotification({
      msg: 'Cohort saved successfully',
      variant: 'success'
    });
  };

  const handleNewCohortDialogClose = (): void => {
    setOpenNewCohortDialog(false);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.titleContainer}>
        <Typography variant="h5">Cohort Selection</Typography>
      </Box>
      <Box className={styles.container2}>
        {/* saved cohort list component */}
        <Box className={styles.cohortListContainer}>
          <CohortList handleCohortSelection={handleCohortSelection} cohortListData={cohortListData} selectedIndex={selectedIndex} />
        </Box>
        {/* cohort condition selection component */}
        <Box className={styles.filterDropdownContainer}>
          <Grid container spacing={'40px'} className={styles.filterDropdown}>
            {filters.map((filter: IFilter, index: number) => (
              <React.Fragment key={`fragment-${filter.id}`}>
                {index > 0 ? (
                  <Box className={styles.operatorDropdownContainer}>
                    <OperatorDropdown operator={filterOperator[index - 1]} index={index - 1} handleOperatorChange={handleOperatorChange} />
                  </Box>
                ) : null}
                <Grid item xs={12}>
                  <CohortConditionDropdown
                    filter={filter}
                    handleDeleteFilter={handleDeleteFilter}
                    handleFilterChange={handleFilterChange}
                    featureList={featureList}
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <div className={styles.verticalLine}></div>
        </Box>
      </Box>
      {/* add condition and save cohort button */}
      <Box className={styles.buttonContainer}>
        <AnimateButton>
          <Button variant="contained" onClick={handleAddFilter} className={styles.addFilterButton}>
            Add Condition
          </Button>
        </AnimateButton>
        <AnimateButton>
          <Button variant="outlined" className={styles.saveCohortButton} onClick={handleSaveCohort}>
            Save Cohort
          </Button>
        </AnimateButton>
      </Box>
      <NewCohortDialog
        sampleTextProp={''}
        openNewCohortDialog={openNewCohortDialog}
        handleNewCohortDialogClose={handleNewCohortDialogClose}
        handleNewCohortDialogSave={handleNewCohortDialogSave}
      />
    </Box>
  );
};

export default CohortSelection;
