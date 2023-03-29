import * as React from 'react';
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import styles from './CohortList.module.css';
import {
  type ICohortListData,
  type IFilter,
  type TOperatorString,
} from 'src/shared/interfaces/customTypes';

export interface ICohortList {
  // TODO: Add type for handleCohortSelection
  handleCohortSelection: (
    filter: IFilter[],
    operator: TOperatorString[],
    selectedIndex: number
  ) => void;
  cohortListData: ICohortListData[];
}

const CohortList: React.FC<ICohortList> = ({
  handleCohortSelection,
  cohortListData,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ): void => {
    setSelectedIndex(index);
    handleCohortSelection(
      cohortListData[index].filters,
      cohortListData[index].filterOperator,
      index
    );
  };

  const handleNewCohortClick = (): void => {
    setSelectedIndex(-1);
    handleCohortSelection([], [], -1);
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h6" component="h6" className={styles.title}>
        Saved Cohort
      </Typography>
      <List aria-label="saved-cohort-list">
        {cohortListData.map((cohort, index) => {
          return (
            <ListItemButton
              key={index}
              selected={selectedIndex === index}
              onClick={(event) => {
                handleListItemClick(event, index);
              }}
            >
              <ListItemText primary={cohort.cohortName} />
            </ListItemButton>
          );
        })}
      </List>
      <Button
        variant="outlined"
        className={styles.saveCohortButton}
        onClick={handleNewCohortClick}
      >
        Create New Cohort
      </Button>
    </Box>
  );
};

export default CohortList;
