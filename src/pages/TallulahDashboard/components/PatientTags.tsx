import { Box } from '@mui/material';
import * as React from 'react';
import tagCloud from 'src/assets/images/elongatedpatienttags.png';


interface IPatientTags {
  data: any[];
}

const PatientTags: React.FC = () => {
  return (
    <Box sx={{px: 7}}>
      <img src={tagCloud} alt="Patient-Tags" width={550} height={110} />
    </Box>
  );
};

export default PatientTags;