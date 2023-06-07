import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import DatasetsTable from './components/DatasetsTable';
import styles from './Datasets.module.css';
import { useQuery } from 'react-query';
import { GetMultipleDataset_Out, ApiError, DefaultService } from 'src/client';
//import NewDatasetModal from './components/NewDatasetModal';

const Datasets: React.FC = () => {
  const { data } = useQuery<
    GetMultipleDataset_Out,
    ApiError
  >(['datasets'], DefaultService.getAllDatasets, { refetchOnMount: 'always' });

  return (
    <Box sx={{ width: '100%', p: '1rem' }} >
      <Box className={styles.stack}>
        <Typography variant="h3"> Datasets </Typography>
        <Button
            type="submit"
            variant="contained"
            sx={{ mb: 2 }}
          >
            New Dataset
          </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        {data ?
          <DatasetsTable data={data.datasets} /> : <p>There was an error fetching datasets. Please try again later</p>}
      </Box>
    </Box>
  );
};

export default Datasets;
