import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { ApiError, DefaultService, GetDatasetVersion_Out, GetDataset_Out } from 'src/client';
import { useParams } from 'react-router';
import styles from './DatasetVersionPage.module.css';
import ViewDatasetVersion from './components/ViewDatasetVersion';
import DatasetUpload from './components/DatasetUpload';

const DatasetVersion: React.FC = () => {
  const { version } = useParams() as { version: string };
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery<GetDatasetVersion_Out, ApiError>([version], () => DefaultService.getDatasetVersion(version), {
    refetchOnMount: 'always'
  });

  return (
    <Box sx={{ width: '100%' }}>
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
        <p>There was an error fetching information for this dataset version. Please try again later</p>
      )}
    </Box>
  );
};

export default DatasetVersion;
