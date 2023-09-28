import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import AgeChart from './AgeChart';
import PatientTags from './PatientTags';
import SAMPLE_DATA from 'src/pages/TallulahSearch/sample_search';
import StoryCountGraph from './StoryCountGraph';
import PatientMap from './PatientMap/PatientMap';

export interface PatientMetrics {
  title: string;
  description: string;
  metric: any;
}

export interface Coordinates {
  key: React.Key,
  address: string,
  lat: number,
  lng: number
}

const PatientMetricCard: React.FC<PatientMetrics> = ({title, description, metric}) => {
  const coordinates: Coordinates[] = [];
  SAMPLE_DATA.forEach((patient: any) => {
    coordinates.push({ key: patient._id, address: patient._source.location, lat: patient._source.Location[0], lng: patient._source.Location[1] });
  });

  return (
    <Box>
    <Card>
      <CardContent>
        <Typography variant='h3' fontWeight={10}  gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
        <Box sx={{display:"flex", justifyContent:"center"}}>
          {metric == 'Count' ? <Typography variant="h1" color="#1070a1" sx={{py: 3}}>177</Typography> 
          : metric == 'Age' ? <AgeChart/> 
          : metric == 'Tags' ? <PatientTags/> 
          : metric == 'Growth' ? <StoryCountGraph/> 
          : metric == 'Location' ?  <PatientMap locations={coordinates}/>: null }
        </Box>
      </CardContent>
    </Card>
    </Box>
  );
};

export default PatientMetricCard;
