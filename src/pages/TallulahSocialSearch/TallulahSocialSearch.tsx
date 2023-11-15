import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SocialsTabs from './components/SocialsTabs/SocialsTabs';


export interface ISocialSearch {
  sampleTextProp: string;
}

const searchItems = [
  { field: 'kidney cancer'},
  { field: 'leukemia'},
  { field: 'remission'},
  { field: 'chemotherapy'}
];

const SocialSearch: React.FC<ISocialSearch> = ({ sampleTextProp }) => {
  const [showResults, setShowResults] = useState(false);

  const handleChange = () => {
    setShowResults(true);
  }

  return (
    <Box>
      <Typography variant="h1" fontWeight={5} color="#1070a1">Social Search</Typography>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Autocomplete
          id="initial-search"
          disableClearable
          options={searchItems.map((option) => option.field)}
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
        <Button onClick={() => setTimeout(handleChange, 1000)} type="submit" variant="contained" sx={{ my: 2 }}>
          Social Search</Button>

        {showResults ?
          <Box>
            <SocialsTabs />
          </Box> : null}
      </Box>
    </Box>
  );
};

export default SocialSearch;
