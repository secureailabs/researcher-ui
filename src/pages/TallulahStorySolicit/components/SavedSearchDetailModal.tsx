import { Autocomplete, Box, Button, Chip, FormControl, IconButton, MenuItem, Modal, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import styles from '../../TallulahSearch/components/PatientDetailViewModal/PatientDetailViewModal.module.css'
import PatientImage from 'src/assets/images/users/sample-face-image-1.png';
import useNotification from 'src/hooks/useNotification';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { Controller, set, useForm } from 'react-hook-form';


export interface ISearchDetailViewModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: any;
  options: any[];
}

const SavedSearchDetailModal: React.FC<ISearchDetailViewModal> = ({ openModal, handleCloseModal, data, options }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [sendNotification] = useNotification();
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>(data.tags);
  const [alertFrequency, setAlertFrequency] = useState(data.alert_frequency);

  const onTagChange = (_: any, value: React.SetStateAction<string[]>) => {
    setTags(value);
  };

  const handleAlertSelect = (event: SelectChangeEvent) => {
    setAlertFrequency(event.target.value as string);
  };

  const onSubmit = () => {
    sendNotification({
      msg: 'Patient story has been saved',
      variant: 'success'
    });
    setEditing((v) => !v);
    data.tags = tags;
    data.alert_frequency = alertFrequency;
    return;
  };

  const changeEditMode = () => {
    setEditing((v) => !v);
    setTags(data.tags);
    setAlertFrequency(data.alert_frequency);
    return;
  };


  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box>
        <Box>
          {!editing &&
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
                height: '300px'
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

                      <IconButton aria-label="delete" onClick={handleCloseModal}>
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
                <Box className={styles.cardHeaderLayout}>
                  <Box>
                    <Typography variant="h6" className={styles.name} sx={{ mt: -2, mb: 4 }}>
                      {data.name}</Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                        marginTop: '1rem',
                      }}
                      className={styles.section1}
                    >
                      {tags.map((tag: string) => (
                        <Box className={styles.tag}>{tag}</Box>
                      ))}
                    </Box>
                    <Typography variant="body1" className={styles.age} sx={{ mt: 6 }}>
                      Alert Frequency: {data.alert_frequency}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{mt: 4}} >
                  <Stack flexDirection={'row'}>
                    <Button sx={{ mb: 1, marginRight: 1, maxHeight: 30, borderColor: '#4c78af' }} variant='outlined' size='extraSmall' onClick={changeEditMode}>Edit</Button>
                    <Button sx={{ mb: 1, marginRight: 1, maxHeight: 30, borderColor: '#4c78af' }} variant='outlined' size='extraSmall' onClick={() => navigate(`/tallulah-find-stories/${data.name}`)}>Run Search</Button></Stack>
                </Box>
              </Box>
            </Box>
          }
        </Box>
        <Box>
          {editing &&
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
                height: '350px'
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

                      <IconButton aria-label="delete" onClick={handleCloseModal}>
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
                <Box className={styles.cardHeaderLayout}>
                  <Box>
                    <Controller
                      name="searchName"
                      control={control}
                      defaultValue={data.name}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          sx={{ mt: -2, mb: 4 }}
                          value={value}
                          onChange={onChange}
                          size='small'
                          error={!!error}
                          helperText={error ? error.message : null}
                          required
                          id="searchName"
                        />
                      )}
                      rules={{ required: 'Search name is required' }}
                    />
                  </Box>
                  </Box>

                  <Autocomplete
                    multiple
                    id="tags-standard"
                    clearText=''
                    options={options.map((option) => option.field)}
                    freeSolo
                    defaultValue={data.tags}
                    value={tags}
                    onChange={onTagChange}
                    renderTags={(value: readonly string[], getTagProps) =>
                      value.map((option: string, index: number) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        sx={{ mb: 2 }}
                        autoFocus
                        {...params}
                        variant="standard"
                      />
                    )}
                  />


                  <Stack flexDirection={'row'} sx={{ my: 2 }} alignItems={'baseline'}>
                    <Typography variant="body1" className={styles.age}>Alert Frequency:</Typography>
                    <FormControl sx={{ minWidth: 120, marginLeft: 2 }} size='small'>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={alertFrequency}
                        onChange={handleAlertSelect}
                        displayEmpty
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Daily'}>Daily</MenuItem>
                        <MenuItem value={'Weekly'}>Weekly</MenuItem>
                        <MenuItem value={'Monthly'}>Monthly</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
              </Box>

              <Box style={{ position: 'sticky' }} >
                <Stack flexDirection={'row'}>
                  <Button sx={{ marginRight: 1, maxHeight: 30 }} color='success' variant='contained' onClick={onSubmit}>Save</Button>
                  <Button sx={{ maxHeight: 30 }} color='error' variant='contained' onClick={() => setEditing((v) => !v)}>Cancel</Button></Stack>
              </Box>
            </Box>

          }
        </Box >
      </Box>
    </Modal >

  );
};

export default SavedSearchDetailModal;
