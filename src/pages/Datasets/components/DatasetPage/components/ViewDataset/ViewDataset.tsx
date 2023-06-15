import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { ApiError, DefaultService, GetDataset_Out } from 'src/client';
// import FormField from 'src/components/forms/FormField';
import styles from './ViewDataset.module.css';

const ViewDataset: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { data, refetch } = useQuery<
    GetDataset_Out,
    ApiError
  >([id], () => DefaultService.getDataset(id), {
    refetchOnMount: 'always'
  });
  
  const { control } = useForm({
    mode: 'onSubmit',
  });

  return (
    <Box sx={{ width: '100%', p: '1rem' }}>
      <Box className={styles.row} sx={{ borderColor: 'lightgrey', boxShadow: 4}}>
        <Box className={styles.column}>
          <Typography variant="h6">Publish Date</Typography>
          <Controller
            name="publish_date"
            control={control}
            defaultValue={data?.creation_time}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ mt: 1, mb: 2 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                required
                id="publish_date"
              />
            )}
            rules={{ required: 'Dataset publish date required' }}
          />
          <Typography variant="h6">Data Owner</Typography>
          <Controller
            name="DataOwner"
            control={control}
            defaultValue={data?.organization.name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ mt: 1, mb: 2 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                required
                id="DataOwner"
              />
            )}
            rules={{ required: 'Dataset owner required' }}
          />
        </Box>
        <Box className={styles.column}>
          <Typography variant="h6">Keywords</Typography>
          <Controller
            name="keywords"
            control={control}
            defaultValue={data?.tags}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ mt: 1, mb: 2 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                id="keywords"
              />
            )}
          />
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
        </Box>
      </Box>
    </Box>
  );
};

export default ViewDataset;
