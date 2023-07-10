import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { ApiError, DefaultService, GetDataset_Out, GetMultipleDatasetVersion_Out } from 'src/client';
import DatasetVersionsTable from './components/DatasetVersionsTable';
import { useParams } from 'react-router';
import ViewDataset from './components/ViewDataset/ViewDataset';
import styles from './DatasetPage.module.css';
import NewDatasetVersionModal from './components/NewDatasetVersionModal';
import IconButton from 'src/components/extended/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

const Dataset: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { data, isLoading, refetch } = useQuery<GetDataset_Out, ApiError>([id], () => DefaultService.getDataset(id), {
    refetchOnMount: 'always'
  });

  const { data: dataset_versions, refetch: refetch_dataset_versions } = useQuery<GetMultipleDatasetVersion_Out, ApiError>(
    ['dataset_versions'],
    () => DefaultService.getAllDatasetVersions(id),
    {
      refetchOnMount: 'always'
    }
  );

  return (
    <Box sx={{ width: '100%' }}>
      {data ? (
        <Box>
          <Typography variant="h3">{data?.name}</Typography>
          {/* Dataset details */}
          <ViewDataset />

          {/* Dataset Version Section  */}
          <Box className={styles.stack}>
            <Typography variant="h3">Versions</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <NewDatasetVersionModal refetch={refetch_dataset_versions} />
              <IconButton
                aria-label="refresh"
                shape="rounded"
                variant="outlined"
                sx={{
                  mx: 2
                }}
                onClick={() => refetch_dataset_versions()}
              >
                <RefreshIcon />
              </IconButton>
            </Box>
          </Box>
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
          {dataset_versions !== undefined ? <DatasetVersionsTable data={dataset_versions} /> : null}
        </Box>
      ) : (
        null
      )}
    </Box>
  );
};

export default Dataset;
