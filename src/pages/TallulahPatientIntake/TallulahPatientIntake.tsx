import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Autocomplete, Chip, FormControlLabel, FormGroup, InputAdornment, Radio, RadioGroup, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import useNotification from 'src/hooks/useNotification';
import ProfilePictureUpload from './components/ProfilePhotoUpload';
import DocumentsUpload from './components/DocumentsUpload';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const tagOptions = [
  { title: 'Acute Lymphoblastic Leukaemia' },
  { title: 'Patient' },
  { title: 'Asia/Pacific Islander' },
  { title: 'Pediatric' },
  { title: 'Patient Registry' },
  { title: 'Transplant Recipient' }
];

const locationOptions = [
  { title: 'Scranton, Pennsylvania' },
  { title: 'New York, New York' },
  { title: 'Los Angeles, California' },
  { title: 'Chicago, Illinois' },
  { title: 'Houston, Texas' },
  { title: 'Phoenix, Arizona' },
  { title: 'Philadelphia, Pennsylvania' }
];

const outcomeOptions = [
  { title: 'Cured' },
  { title: 'In Remission' },
  { title: 'Relapsed' },
  { title: 'Deceased' },
  { title: 'Still Fighting' },
  { title: 'N/A' }
];

const diseaseTypeOptions = [
  { title: 'Chronic lymphocytic leukemia' },
  { title: 'Acute lymphoblastic leukemia' },
  { title: 'Acute myeloid leukemia' },
  { title: 'Chronic myeloid leukemia' },
  { title: 'Acute lymphocytic leukemia' },
  { title: 'Hairy cell leukemia' },
  { title: 'Chronic lymphocytic leukemia' },
  { title: 'Myelodysplastic syndrome (MDS)' },
  { title: 'Myeloproliferative neoplasms' },
  { title: 'Aplastic anemia' },
  { title: 'Blastic plasmacytoid dendritic cell neoplasm (BPDCN)' },
  { title: 'Chronic Myelomonocytic Leukemia (CMML)' }
];

const treatmentOptions = [
  { title: 'Drug Therapy' },
  { title: 'Stem Cell Transplant' },
  { title: 'Radiation' },
  { title: 'Chemotherapy' },
  { title: 'Immunotherapy' },
  { title: 'Other' }
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
  const [clearDiagnosisDate, setClearDiagnosisDate] = useState<boolean>(false);



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
    setClearDiagnosisDate(true);
    setTags([]);
    setSelectedProfile(null);
    setSelectedDocuments(null);
    setPreviewURL(null);
    setPatientConsentCheck(false);
    setParentConsentCheck(false);
    setTimeout(function(){
      window.location.reload();
  }, 3000);
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
          mx: 6,
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
          <Typography variant="h5" sx={{ mb: 3 }}>Personal Information</Typography>
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
                fullWidth
                id="name"
                label="Full name of patient"
                autoComplete="name"
                autoFocus
              />
            )}
            rules={{ required: 'Patient name is required' }}
          />
          <Stack direction="row" spacing={4} justifyContent={"flex-start"} alignItems={"center"} sx={{ mt: 1, mb: 2 }}>
            <Controller
              name="age"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  type="number"
                  sx={{ width: 100 }}
                  size="small"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  required
                  fullWidth
                  label="Age"
                  id="age"
                />
              )}
              rules={{ required: 'Patient age is required' }}
            />
            <Controller
              name="location"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  sx={{ width: 600 }}
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
          </Stack>
          <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>Story Details</Typography>
          <Stack sx={{ my: 2 }} direction="row" spacing={4} justifyContent={"flex-start"}>
            <Controller
              name="diagnosisDate"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Date of Diagnosis (MM-DD-YYYY)" slotProps={{
                    field: { clearable: true, onClear: () => setClearDiagnosisDate(true) },
                    textField: { size: 'small' }
                  }} sx={{ width: 350 }} />
                </LocalizationProvider>
              )}
            />
            <Controller
              name="firstSymptomsDate"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Date of First Symptoms (MM-DD-YYYY)" slotProps={{
                    field: { clearable: true, onClear: () => setClearDiagnosisDate(true) },
                    textField: { size: 'small' }
                  }} sx={{ width: 350 }} />
                </LocalizationProvider>
              )}
            />
          </Stack>
          <Controller
            name="diseaseType"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                id="disease-type"
                disableClearable
                options={diseaseTypeOptions.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    error={!!error}
                    helperText={error ? error.message : null}
                    id="diseaseType"
                    label="Disease Type"
                    autoFocus
                    sx={{ mt: 1, mb: 2 }}
                    value={value}
                    onChange={onChange}
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
              />
            )}
          />
          <Controller
            name="treatmentType"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                id="treatment-type"
                disableClearable
                options={treatmentOptions.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    error={!!error}
                    helperText={error ? error.message : null}
                    id="treatmentType"
                    label="Treatment Type"
                    autoFocus
                    sx={{ mt: 1, mb: 2 }}
                    value={value}
                    onChange={onChange}
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
              />
            )}
          />
          <Typography>Has the disease metastasized?</Typography>
          <Controller
            name="metastasized"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="metastasized-radio-buttons"
                value={value}
                onChange={onChange}
                sx={{ mt: 1, mb: 2 }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          <Controller
            name="diseaseState"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                id="disease-state"
                disableClearable
                options={outcomeOptions.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    error={!!error}
                    helperText={error ? error.message : null}
                    id="diseaseState"
                    label="Current Disease State"
                    autoFocus
                    sx={{ mt: 1, mb: 2 }}
                    value={value}
                    onChange={onChange}
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
              />
            )}
          />
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
                label="Please type or copy and paste the patient story here"
                multiline
                rows={6}
              />
            )}
            rules={{ required: 'Story content is required' }}
          />
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
                    sx={{ mb: 2 }}
                    autoFocus
                    label="Story Tags (press the Enter key to add tag)"
                    {...params}
                    variant="standard"
                  />
                )}
              />
            )}
          />          
          <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>Media</Typography>
          <Box sx={{ mt: 1, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Upload profile picture:</Typography>
            <ProfilePictureUpload spacing={3}  />
          </Box>
          <Box sx={{ mt: 1, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Upload additional documents:</Typography>
            <DocumentsUpload spacing={3} editPatient={false}/>
          </Box>
          <Typography variant="h5" sx={{mb:3, mt:4 }}>Social Media</Typography>
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
            Save Patient Story
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientIntake;
