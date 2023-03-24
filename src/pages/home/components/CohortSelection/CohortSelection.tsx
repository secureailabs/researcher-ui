import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import CohortConditionDropdown from 'src/pages/home/components/CohortConditionDropdown';
import styles from './CohortSelection.module.css';

export interface ICohortSelection {}

const CohortSelection: React.FC<ICohortSelection> = () => {
  const [conditionList, setConditionList] = useState<any>([]);

  return (
    <Box className={styles.container}>
      <Typography variant="h5">Cohort Selection</Typography>
      <Box
        sx={{
          marginTop: 2,
          width: '100%',
        }}
      >
        <CohortConditionDropdown />
      </Box>
      <Box>
        <Button variant="contained" sx={{ marginTop: 2 }}>
          Add Condition
        </Button>
      </Box>
    </Box>
  );
};

export default CohortSelection;
