import { Autocomplete, Box, Button, Chip, FormControl, IconButton, MenuItem, Modal, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import styles from '../../TallulahSearch/components/PatientDetailViewModal/PatientDetailViewModal.module.css'
import useNotification from 'src/hooks/useNotification';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { Controller, set, useForm } from 'react-hook-form';


const AddStatusModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [sendNotification] = useNotification();
  const { handleSubmit, control } = useForm();
  const [accountType, setAccountType] = useState<string>('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleAccountTypeSelect = (event: SelectChangeEvent) => {
    setAccountType(event.target.value as string);
  };

  const onSubmit = () => {
    sendNotification({
      msg: 'Patient story has been saved',
      variant: 'success'
    });
    setTimeout(handleClose, 1000)
    return;
  };

  return (
    <Box>
      <Button onClick={handleOpen} sx={{ maxHeight: 30 }}  startIcon={<AddIcon />} type='submit' variant='contained'>
        Add to Queue
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            padding: '10px',
            outline: 'none',
            width: '600px',
            height: '250px'
          }}
        >
          <Box className={styles.container}>
            <Box
              sx={{
                position: 'absolute',
                display: 'flex',
                justifyContent: 'flex-end',
                backgroundColor: '#fff',
                top: '5px',
                right: '0px'
              }}
            >
              <Box style={{ position: 'sticky' }} width='100%'>
                <Stack sx={{ mt: 0.5 }} flexDirection={'row'} alignItems={'self-end'} justifyContent={'flex-start'}>

                  <IconButton aria-label="delete" onClick={handleClose}>
                    <CloseIcon
                      sx={{
                        color: '#000',
                        fontSize: '2rem'
                      }}
                    />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
            <Typography variant="h6" className={styles.name} sx={{ mb: 4 }}>
              Add Account</Typography>
            <Box sx={{ mt: 4 }}>
              <Stack flexDirection={'row'} sx={{ my: 2 }} alignItems={'baseline'}>
                <Typography sx={{ marginRight: 1 }}>Account Name:</Typography>
                <Controller
                  name="accountName"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      sx={{ mt: -2 }}
                      value={value}
                      onChange={onChange}
                      size='small'
                      error={!!error}
                      helperText={error ? error.message : null}
                      required
                      autoFocus
                      id="accountName"
                    />
                  )}
                  rules={{ required: 'Account name is required' }}
                />
              </Stack>
              <Stack flexDirection={'row'} sx={{ my: 2 }} alignItems={'baseline'}>
                <Typography sx={{ marginRight: 1 }}>Account Type:</Typography>
                <FormControl sx={{ minWidth: 120, marginLeft: 1 }} size='small'>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={accountType}
                    onChange={handleAccountTypeSelect}
                    displayEmpty
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Caregiver'}>Caregiver</MenuItem>
                    <MenuItem value={'Organization'}>Organization</MenuItem>
                    <MenuItem value={'Parent'}>Parent</MenuItem>
                    <MenuItem value={'Patient'}>Patient</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Box>
          </Box>
          <Box sx={{mt:2}} >
            <Stack flexDirection={'row'}>
              <Button sx={{ marginRight: 1, maxHeight: 30 }} color='success' variant='contained' onClick={onSubmit}>Save</Button>
              <Button sx={{ maxHeight: 30 }} color='error' variant='contained' onClick={handleClose}>Cancel</Button></Stack>
          </Box>
        </Box>
      </Modal >
    </Box>
  );
};

export default AddStatusModal;
