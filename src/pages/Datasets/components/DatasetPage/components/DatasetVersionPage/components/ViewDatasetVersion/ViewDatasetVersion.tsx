import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GetDatasetVersion_Out } from 'src/client';
import styles from './ViewDatasetVersion.module.css';

export interface IDatasetVersion {
  data: GetDatasetVersion_Out | undefined;
  refetch?: () => void;
}

const ViewDatasetVersion: React.FC<IDatasetVersion> = ({data, refetch}) => {
  const { control } = useForm({
    mode: 'onSubmit',
  });

  return (
    <Box sx={{ width: '100%', p: '1rem' }}>
      <Box className={styles.row} sx={{ borderColor: 'lightgrey', boxShadow: 2}}>
        <Box className={styles.column}>
          <Typography variant="h6">Name</Typography>
          <Controller
            name="name"
            control={control}
            defaultValue={data?.name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ mt: 1, mb: 2 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                required
                id="name"
              />
            )}
            rules={{ required: 'Version name required' }}
          />
          <Typography variant="h6">Publish Date</Typography>
          <Controller
            name="dataset_version_created_time"
            control={control}
            defaultValue={data?.dataset_version_created_time}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ mt: 1, mb: 2 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                required
                id="dataset_version_created_time"
              />
            )}
            rules={{ required: 'Version publish date required' }}
          />
        </Box>
        <Box className={styles.column}>
          <Typography variant="h6">Description</Typography>
          <Controller
            name="description"
            control={control}
            defaultValue={data?.description}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ mt: 1, mb: 2 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                id="description"
              />
            )}
          />
          <Typography variant="h6">State</Typography>
          <Controller
            name="state"
            control={control}
            defaultValue={data?.state}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ mt: 1, mb: 2 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                id="state"
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ViewDatasetVersion;
