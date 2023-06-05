import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import DatasetsTable from './components/DatasetsTable';
import styles from './Datasets.module.css';

const Datasets: React.FC = () => {
  const onSubmit = () => {
    console.log("click");
  };

  return (
    <Box sx={{ width: '100%', py: '1rem', px: '3rem' }} >
      <Box className={styles.stack}>
      <Typography variant="h3"> Datasets </Typography>
      <Button
            onClick={onSubmit}
            type="submit"
            variant="contained"
            sx={{ mb: 2 }}
          >
            New Dataset
          </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <DatasetsTable/>
      </Box>
    </Box>
  );
};

export default Datasets;
