import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import DatasetsTable from './components/DatasetsTable';
import styles from './Datasets.module.css';
import { useQuery } from 'react-query';
import { GetMultipleDataset_Out, ApiError, DefaultService } from 'src/client';


const Datasets: React.FC = () => {
  const onSubmit = () => {
    console.log("click");
  };

  const { data } = useQuery<
    GetMultipleDataset_Out,
    ApiError
  >(['datasets'], DefaultService.getAllDatasets, { refetchOnMount: 'always' });
  console.log(data, "data");

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
        {data ?
          <DatasetsTable data={data.datasets} /> : null}
      </Box>
    </Box>
  );
};

export default Datasets;
