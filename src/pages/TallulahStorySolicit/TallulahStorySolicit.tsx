import { Autocomplete, Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import SocialsTabs from '../TallulahSocialSearch/components/SocialsTabs/SocialsTabs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SavedSearchCard from './components/SavedSearchCard';
import SAVED_SEARCH_DATA from './demoSearchResults/saved_searches';
import SavedSearchDetailModal from './components/SavedSearchDetailModal';
import { useNavigate } from 'react-router-dom';
import useNotification from 'src/hooks/useNotification';
import { time } from 'console';


export interface ITallulahStorySolicit {
  sampleTextProp: string;
}

const searchItems = [
  { field: 'Chronic lymphocytic leukemia (CCL)', searchType: 'Disease type' },
  { field: 'Acute myeloid leukemia (AML)', searchType: 'Disease type' },
  { field: 'Chronic myeloid leukemia (CML)', searchType: 'Disease type' },
  { field: 'Acute lymphocytic leukemia (ALL)', searchType: 'Disease type' },
  { field: 'Hairy cell leukemia (HCL)', searchType: 'Disease type' },
  { field: 'Myelodysplastic syndrome (MDS)', searchType: 'Disease type' },
  { field: 'Myeloproliferative neoplasms', searchType: 'Disease type' },
  { field: 'Aplastic anemia', searchType: 'Disease type' },
  { field: 'Blastic plasmacytoid dendritic cell neoplasm (BPDCN)', searchType: 'Disease type' },
  { field: 'Chronic Myelomonocytic Leukemia (CMML)', searchType: 'Disease type' },
  { field: 'Bone marrow transplant', searchType: 'Treatments' },
  { field: 'Arranon (Nelarabine)', searchType: 'Treatments' },
  { field: 'leukemia', searchType: 'General' },
];


const TallulahStorySolicit: React.FC<ITallulahStorySolicit> = ({ sampleTextProp }) => {
  const [showResults, setShowResults] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [alertFrequency, setAlertFrequency] = useState('');
  const [sendNotification] = useNotification();
  const [selectedSearchData, setSelectedSearchData] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const { handleSubmit } = useForm({
    mode: 'onSubmit'
  });

  const onTagChange = (_: any, value: React.SetStateAction<string[]>) => {
    setTags(value);
  };

  const handleAlertSelect = (event: SelectChangeEvent) => {
    setAlertFrequency(event.target.value as string);
  };

  const onSubmit = () => {
    sendNotification({
      msg: 'Search saved successfully',
      variant: 'success'
    });
    setTimeout(() => {
      setTags([]);
      setAlertFrequency('');
    }, 1000);


    return;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const options = searchItems.map((option) => {
    const searchGroup = option.searchType;
    return {
      searchGroup: /[0-9]/.test(searchGroup) ? '0-9' : searchGroup,
      ...option,
    };
  });

  return (
    <Box>
      <Typography variant="h1" fontWeight={5} color="#1070a1">Create a New Story Search</Typography>
      <Box sx={{
        mt: 4,
        mb: 12,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        px: 4,
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
      }}
        component="form" noValidate onSubmit={handleSubmit(onSubmit)}
      >
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" fontStyle={'italic'}>What would you like to search or monitor for?</Typography>
        <Autocomplete
          multiple
          id="tags-standard"
          clearText=''
          options={options.map((option) => option.field)}
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
              label="Search Tags (press the Enter key to add tag)"
              {...params}
              variant="standard"
            />
          )}
        />
        <Stack flexDirection={'row'} sx={{ my: 2 }} alignItems={'baseline'}>
          <Typography>Set frequency of alerts:</Typography>
          <FormControl sx={{ minWidth: 120, marginLeft: 2 }} size='small'>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={alertFrequency}
              onChange={handleAlertSelect}
              displayEmpty
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Daily</MenuItem>
              <MenuItem value={7}>Weekly</MenuItem>
              <MenuItem value={30}>Monthly</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack flexDirection={'row'} sx={{ mt: 6, mb: 4 }}>
          <Button onClick={handleSubmit(onSubmit)} type='submit' color='success' variant="outlined" sx={{ marginRight: 2, color: 'green', borderColor: 'green' }}>
            Save</Button>
          <Button onClick={() => navigate(`/tallulah-find-stories/search`)} variant="outlined" sx={{
            borderColor: '#4c78af'
          }}>
            Search</Button>
        </Stack>
      </Box>
      <Typography variant="h1" fontWeight={5} color="#1070a1">Saved Searches</Typography>
      <Box>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {SAVED_SEARCH_DATA.map((searchData: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                onClick={() => {
                  setOpenModal(true);
                  setSelectedSearchData(searchData);
                }}
              >
                <SavedSearchCard data={searchData} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {selectedSearchData ? (
          <SavedSearchDetailModal openModal={openModal} handleCloseModal={handleCloseModal} data={selectedSearchData} options={options} />
        ) : null}
      </Box>

    </Box>
  );
};

export default TallulahStorySolicit;


/*
<Autocomplete
          id="initial-search"
          disableClearable
          options={options}
          groupBy={(option) => option.searchGroup}
          getOptionLabel={(option) => option.field}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter your search terms"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
*/