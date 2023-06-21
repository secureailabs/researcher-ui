import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { ApiError, DefaultService, GetDataset_Out } from 'src/client';
import { useParams } from 'react-router';
import styles from './DatasetVersionPage.module.css';


const DatasetVersion: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { data, refetch } = useQuery<
    GetDataset_Out,
    ApiError
  >([id], () => DefaultService.getDataset(id), {
    refetchOnMount: 'always'
  });

  return (
    <Box sx={{ width: '100%', p: '1rem' }} >
      {data ?
        <Box>
          <Typography variant='h3' sx={{ pb: 2 }}>{data?.name}</Typography>
          <Box className={styles.stack}>
          <Typography variant='h3' sx={{ py: 2 }}>Data</Typography>
          </Box>
        </Box>
        : <p>There was an error fetching information for this dataset. Please try again later</p>}
    </Box>
  );
};

export default DatasetVersion;
