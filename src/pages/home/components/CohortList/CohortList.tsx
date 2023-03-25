import * as React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import COHORT_LIST from 'src/constants/cohortList';
import styles from './CohortList.module.css';

export interface ICohortList {
  // TODO: Add type for handleCohortSelection
  handleCohortSelection: (filter: any, operator: any) => void;
}

const CohortList: React.FC<ICohortList> = ({ handleCohortSelection }) => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ): void => {
    setSelectedIndex(index);
    handleCohortSelection(
      COHORT_LIST[index].filters,
      COHORT_LIST[index].filterOperator
    );
  };
  return (
    <Box className={styles.container}>
      <Typography variant="h6" component="h6" className={styles.title}>
        Saved Cohort
      </Typography>
      <List aria-label="saved-cohort-list">
        {COHORT_LIST.map((cohort, index) => {
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
    </Box>
  );
};

export default CohortList;
