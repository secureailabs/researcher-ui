import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Divider, IconButton, InputAdornment, Stack } from '@mui/material';
import styles from './TallulahPatientIntake.module.css';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginSuccess_Out, OpenAPI } from 'src/client';
import { DefaultService, Body_login } from 'src/client';
import useNotification from 'src/hooks/useNotification';
import { activeAccessToken, activeRefreshToken, tokenType, updateAuthState } from 'src/store/reducers/Auth';
import { dispatch } from 'src/store';
import { REACT_APP_SAIL_API_SERVICE_URL } from 'src/config';
import { useNavigate } from 'react-router-dom';
import StoryTags from './components/StoryTags';


const PatientIntake: React.FC = () => {
  const { handleSubmit, control } = useForm();
  const [sendNotification] = useNotification();

  const onSubmit = (data: any) => {
    console.log('data', data);
    sendNotification({
      msg: 'Patient story has been saved',
      variant: 'success'
    });

  };

  return (
    <Box>
      <Typography variant="h1" fontWeight={5} color="#1070a1">Patient Intake Form</Typography>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          px: 4,
          backgroundColor: '#fff',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box component="form" noValidate sx={{ mt: 4, width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6">Name</Typography>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ mt: 1, mb: 2 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                required
                fullWidth
                id="name"
                label="Enter patient name"
                autoComplete="name"
                autoFocus
              />
            )}
            rules={{ required: 'Email address is required' }}
          />
          <Typography variant="h6">Age</Typography>
          <Controller
            name="age"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type="number"
                sx={{ mt: 1, mb: 2 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                required
                fullWidth
                id="age"
              />
            )}
            rules={{ required: 'Patient age is required' }}
          />
          <Typography variant="h6">Location</Typography>
          <Controller
            name="location"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ mt: 1, mb: 2 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                id="location"
                label="City, State"
                autoFocus
              />
            )}
            rules={{ required: 'Email address is required' }}
          />
          <Typography variant="h6">Life Story</Typography>
          <Controller
            name="story"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type="story"
                sx={{ mt: 1, mb: 2 }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                required
                fullWidth
                id="story"
                multiline
                rows={6}
              />
            )}
            rules={{ required: 'Story content is required' }}
          />
          <Typography variant="h6">Tags</Typography>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <StoryTags/>
            )}
            rules={{ required: 'Email address is required' }}
          />
          <Button onClick={handleSubmit(onSubmit)} type="submit" variant="contained" sx={{ my: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientIntake;
