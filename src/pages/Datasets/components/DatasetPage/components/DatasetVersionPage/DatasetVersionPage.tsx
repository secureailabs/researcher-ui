import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { ApiError, DefaultService, GetDatasetVersion_Out, GetDataset_Out } from 'src/client';
import { useParams } from 'react-router';
import styles from './DatasetVersionPage.module.css';
import ViewDatasetVersion from './components/ViewDatasetVersion';
import DatasetUpload from './components/DatasetUpload';
import useNotification from 'src/hooks/useNotification';

const DatasetVersion: React.FC = () => {
  const { version } = useParams() as { version: string };
  const queryClient = useQueryClient();
  const [sendNotification] = useNotification();

  const { data, isLoading, isError, refetch } = useQuery<GetDatasetVersion_Out, ApiError>([version], () => DefaultService.getDatasetVersion(version), {
    refetchOnMount: 'always'
  });

  return (
    <Box sx={{ width: '100%' }}>
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
        msg: 'There was an error fetching the version info for this dataset.',
        variant: 'error'
      })) : null}
      {data ? (
        <Box>
          <Typography variant="h3">
            <Typography variant="h5" component={'span'}>
              Dataset version name -{' '}
            </Typography>{' '}
            {data?.name}
          </Typography>
          <ViewDatasetVersion data={data} />
          <Box
            sx={{
              mt: 5
            }}
          >
            <Typography variant="h4">Add Data Files</Typography>
            <DatasetUpload refetch={refetch} />
          </Box>
        </Box>
      ) : (
        null
      )}
    </Box>
  );
};

export default DatasetVersion;
