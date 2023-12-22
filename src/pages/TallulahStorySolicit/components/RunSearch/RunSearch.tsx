import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SocialsTabs from '../../../TallulahSocialSearch/components/SocialsTabs/SocialsTabs';


export interface ISocialSearch {
  sampleTextProp: string;
}

const SocialSearchResults: React.FC = () => {
  const [showResults, setShowResults] = useState(false);

  return (
    <Box>
      <Typography variant="h1" fontWeight={5} color="#1070a1">Social Search</Typography>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Box>
          <SocialsTabs />
        </Box>
      </Box>
    </Box>
  );
};

export default SocialSearchResults;
