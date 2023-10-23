import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Autocomplete, Chip, FormControlLabel, FormGroup, InputAdornment, Stack } from '@mui/material';
import { Controller, set, useForm } from 'react-hook-form';
import { useState } from 'react';
import useNotification from 'src/hooks/useNotification';
import StoryTags from './components/StoryTags';
import ProfilePictureUpload from './components/ProfilePhotoUpload';
import DocumentsUpload from './components/DocumentsUpload';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';


const tagOptions = [
  { title: 'Acute Lymphoblastic Leukaemia' },
  { title: 'Patient' },
  { title: 'Asia/Pacific Islander'},
  { title: 'Pediatric' },
  { title: 'Patient Registry'},
  { title: 'Transplant Recipient'}
];

const PatientIntake: React.FC = () => {
  const { handleSubmit, control, reset } = useForm();
  const [sendNotification] = useNotification();
  const [tags, setTags] = useState<string[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<File | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [patientConsentCheck, setPatientConsentCheck] = useState(false);
  const [parentConsentCheck, setParentConsentCheck] = useState(false);

  const onTagChange = (_: any, value: React.SetStateAction<string[]>) => {
    setTags(value);
  };  

  const onSubmit = (data: any) => {
    console.log('data', data);
    sendNotification({
      msg: 'Patient story has been saved',
      variant: 'success'
    });
    reset();
    setTags([]);
    setSelectedProfile(null);
    setSelectedDocuments(null);
    setPreviewURL(null);
    setPatientConsentCheck(false);
    setParentConsentCheck(false);
  };

  const handleProfileSelect = (file: File | null) => {
    setSelectedProfile(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setPreviewURL(event.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewURL(null);
    }
  };

  const handleDocumentSelect = (file: File | null) => {
    setSelectedDocuments(file);
  };

  const handlePatientConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPatientConsentCheck(event.target.checked);
  };

  const handleParentConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParentConsentCheck(event.target.checked);
  }

  return (
    <Box>
      <Typography variant="h1" fontWeight={5} color="#1070a1">Patient Intake Form</Typography>
      <Box
        sx={{
          mt: 4,
          //mx: 6,
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
          <Typography variant="h5">Name</Typography>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ mt: 1, mb: 2 }}
                size="small"
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
            rules={{ required: 'Patient name is required' }}
          />
          <Typography variant="h5">Age</Typography>
          <Controller
            name="age"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                type="number"
                sx={{ mt: 1, mb: 2 }}
                size="small"
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
          <Typography variant="h5">Location</Typography>
          <Controller
            name="location"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ mt: 1, mb: 2 }}
                size="small"
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
            rules={{ required: 'Location is required' }}
          />
          <Typography variant="h5">Life Story</Typography>
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
          <Typography variant="h5">Tags</Typography>
          <Controller
            name="tags"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                multiple
                id="tags-standard"
                clearText=''
                options={tagOptions.map((option) => option.title)}
                freeSolo
                value={tags}
                onChange={onTagChange}
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    sx={{ mt: 1, mb: 2 }}
                    autoFocus
                    {...params}
                    variant="standard"
                    placeholder="Press the Enter key to add tag"
                  />
                )}
              />
            )}
          />
          <Typography variant="h5">Story Outcome</Typography>
          <Controller
            name="outcome"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={{ mt: 1, mb: 2 }}
                size="small"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                id="outcome"
                autoFocus
              />
            )}
            rules={{ required: 'Story outcome is required' }}
          />
          <Typography variant="h5">Profile Photo</Typography>
          <Box sx={{ mt: 1, mb: 2 }}>
            <ProfilePictureUpload onFileSelect={handleProfileSelect} />
            {selectedProfile && (
              <Box sx={{ my: 1 }}>
                <Typography sx={{ mb: 1 }}>Selected file: {selectedProfile.name}</Typography>
                {previewURL && (
                  <img
                    src={previewURL}
                    alt="File Preview"
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                  />
                )}
              </Box>
            )}
          </Box>
          <Typography variant="h5">Additional Documents</Typography>
          <Box sx={{ mt: 1, mb: 2 }}>
            <DocumentsUpload onFileSelect={handleDocumentSelect} />
            {selectedDocuments && (
              <Box sx={{ my: 1 }}>
                <Typography sx={{ mb: 1 }}>Selected file: {selectedDocuments.name}</Typography>
              </Box>
            )}
          </Box>
          <Typography variant="h5">Social Media</Typography>
          <Typography variant="subtitle2">Please provide links to any social media accounts</Typography>
          <Stack sx={{ mb: 2 }} direction="row" justifyContent={"space-between"}>
            <Controller
              name="x"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  sx={{ mt: 1, mb: 2, paddingRight: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TwitterIcon />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                  id="x"
                  placeholder="X"
                  type='url'
                  autoFocus
                />
              )}
            />
            <Controller
              name="instagram"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  sx={{ mt: 1, mb: 2, paddingRight: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InstagramIcon />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                  id="instagram"
                  placeholder="Instagram"
                  autoFocus
                />
              )}
            />
            <Controller
              name="facebook"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  sx={{ mt: 1, mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FacebookIcon />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                  id="facebook"
                  placeholder="Facebook"
                  autoFocus
                />
              )}
            />
          </Stack>
          <FormGroup>
            <FormControlLabel checked={patientConsentCheck} control={<Checkbox onChange={handlePatientConsentChange} />} label="Patient consents to have their story used for future marketing" />
            <FormControlLabel checked={parentConsentCheck} control={<Checkbox onChange={handleParentConsentChange} />} label="If under the age of 18, use of this story has received parent/guardian approval" />
          </FormGroup>
          <Button onClick={handleSubmit(onSubmit)} type="submit" variant="contained" sx={{ my: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientIntake;
