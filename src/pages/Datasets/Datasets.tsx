import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import DatasetsListTable from './components/DatasetsListTable';
import styles from './Datasets.module.css';
import { useQuery } from 'react-query';
import { GetMultipleDataset_Out, ApiError, DefaultService } from 'src/client';
import NewDatasetModal from './components/NewDatasetModal';
import IconButton from 'src/components/extended/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import useNotification from 'src/hooks/useNotification';

const Datasets: React.FC = () => {
  const [sendNotification] = useNotification();
  const { data, isLoading, isError, refetch } = useQuery<GetMultipleDataset_Out, ApiError>(['datasets'], DefaultService.getAllDatasets, {
    refetchOnMount: 'always'
  });

  return (
    <Box sx={{ width: '100%', p: '1rem' }}>
      <Box className={styles.stack}>
        <Typography variant="h3"> Datasets </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <NewDatasetModal refetch={refetch} />
          <IconButton
            aria-label="refresh"
            shape="rounded"
            variant="outlined"
            sx={{
              mx: 2
            }}
            onClick={() => refetch()}
          >
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }} className={styles.bodyContainerTable}>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        ) : null}
        {isError ? (sendNotification({
          msg: 'There was an error fetching the datasets for your organization.',
          variant: 'error'
        })) : null}
        {data ? <DatasetsListTable data={data?.datasets} /> : null}
      </Box>
    </Box>
  );
};

export default Datasets;
