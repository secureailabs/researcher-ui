import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { UserInfo_Out, DefaultService, RegisterDataset_In, DatasetFormat } from 'src/client';
import useNotification from 'src/hooks/useNotification';
// import styles from "./NewDatasetModal.module.css";

export interface IDatasetModal {
  refetch: () => void;
}

const NewDatasetModal: React.FC<IDatasetModal> = ({ refetch }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    refetch();
    setOpen(false);
  };
  const [sendNotification] = useNotification();
  const { handleSubmit, control } = useForm({
    mode: 'onSubmit'
  });

  const queryClient = useQueryClient();
  const userData: UserInfo_Out | undefined = queryClient.getQueryData('userData');

  const onSubmit: SubmitHandler<any> = (data) => {
    if (!userData) {
      sendNotification({
        msg: 'User not found. Please login again',
        variant: 'error'
      });
      return;
    }
    DefaultService.getAllDataFederations(userData.organization.id)
      .then((response) => {
        if (response.data_federations?.length === 0) {
          sendNotification({
            msg: 'No data federation found. Cannot register dataset at this time',
            variant: 'error'
          });
          return;
        }
        const federation_id = response.data_federations?.[0].id;
        if (!federation_id) {
          sendNotification({
            msg: 'No data federation found. Cannot register dataset at this time',
            variant: 'error'
          });
          return;
        }
        const data_format = response.data_federations?.[0].data_format;
        const register_dataset_data: RegisterDataset_In = {
          name: data.name,
          format: data_format as unknown as DatasetFormat,
          tags: data.tags,
          description: data.description
        };
        DefaultService.registerDataset(register_dataset_data)
          .then((response) => {
            const dataset_id = response.id;
            DefaultService.addDataset(federation_id, dataset_id)
              .then(() => {
                handleClose();
              })
              .catch((error) => {
                sendNotification({
                  msg: error.message,
                  variant: 'error'
                });
              });
          })
          .catch((error) => {
            sendNotification({
              msg: error.message,
              variant: 'error'
            });
          });
      })
      .catch((error) => {
        sendNotification({
          msg: error.message,
          variant: 'error'
        });
      });
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
    p: 4
  };

  return (
    <Box>
      <Button sx={{ mb: 2 }} onClick={handleOpen} type="submit" variant="contained">
        New Dataset
      </Button>
      <Modal
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'lightgrey'
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal popup for new dataset"
        aria-describedby="Enter new dataset information"
      >
        <Box sx={style} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ pb: 1 }} variant="h4">
            New Dataset
          </Typography>
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
              name="tags"
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
                  id="tags"
                  label="Enter tags"
                  autoFocus
                />
              )}
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
            Register new dataset
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default NewDatasetModal;
