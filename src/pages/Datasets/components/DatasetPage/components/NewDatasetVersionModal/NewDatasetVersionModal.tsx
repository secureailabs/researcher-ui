import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { UserInfo_Out, DefaultService, RegisterDataset_In, DatasetFormat, RegisterDatasetVersion_In } from 'src/client';
import useNotification from 'src/hooks/useNotification';
// import styles from "./NewDatasetModal.module.css";

export interface IDatasetModal {
  refetch: () => void;
}

const NewDatasetVersionModal: React.FC<IDatasetModal> = ({ refetch }) => {
  const { id } = useParams() as { id: string };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    refetch();
  };
  const [sendNotification] = useNotification();
  const { handleSubmit, control } = useForm({
    mode: 'onSubmit'
  });

  const queryClient = useQueryClient();
  const userData: UserInfo_Out | undefined =
    queryClient.getQueryData('userData');

  const onSubmit: SubmitHandler<any> = (data) => {
    const add_version_req: RegisterDatasetVersion_In = {
      name: data.name,
      dataset_id: id,
      description: data.description
    };
    DefaultService.registerDatasetVersion(add_version_req)
      .then(() => {
        console.log("Dataset version added");
        handleClose();
      })
      .catch((error) => {
        sendNotification({
          msg: error.message,
          variant: 'error'
        });      });
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderColor: 'lightgrey',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box>
      <Button
        sx={{ mb: 2 }}
        onClick={handleOpen}
        type="submit"
        variant="contained"
      >Add Version</Button>
      <Modal
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'lightgrey',
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal popup for new dataset version"
        aria-describedby="Enter new dataset version information"
      >
        <Box sx={style} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ pb: 1 }} variant="h4">Enter New Dataset Information</Typography>
          <Box sx={{ py: 2 }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  sx={{ mt: 1, mb: 4 }}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  required
                  fullWidth
                  id="name"
                  label="Enter name"
                  autoFocus
                />
              )}
              rules={{ required: 'Dataset name is required' }}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  sx={{ mt: 1, mb: 4 }}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                  multiline
                  id="description"
                  label="Enter description"
                  autoFocus
                />
              )}
            />
          </Box>
          <Button onClick={handleSubmit(onSubmit)} type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
            Register new version
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default NewDatasetVersionModal;
