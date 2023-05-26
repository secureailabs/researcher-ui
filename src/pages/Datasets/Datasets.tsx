import { Box, Typography } from '@mui/material';
import React from 'react';
import DatasetsTable from './components/DatasetsTable';

const Datasets: React.FC = () => {

  return (
    <Box sx={{ width: '100%' }} >
      <Typography variant="h3"> Hello </Typography>
      <DatasetsTable></DatasetsTable>
    </Box>
  );
};

export default Datasets;
