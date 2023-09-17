import { Box, Typography } from '@mui/material';
import styles from './TallulahSearch.module.css';
import React, { useEffect, useState } from 'react';
import SAMPLE_DATA from '../TallulahSearch/sample_search';
import PatientMap from '../TallulahDashboard/components/PatientMap/PatientMap';


export interface ITallulahDb {
  sampleTextProp: string;
}

export interface Coordinates {
  key: React.Key,
  lat: number, 
  lng: number
}

const TallulahDashboard: React.FC<ITallulahDb> = ({ sampleTextProp }) => {
  const [locations, setLocations] = useState<Coordinates[]>([]);

  const coordinates: Coordinates[] = [];
  SAMPLE_DATA.forEach((patient: any) => {
    coordinates.push({key: patient._id, lat: patient._source.Location[0], lng: patient._source.Location[1]});
  });
  console.log(coordinates, 'coordinates');

  return (
    <Box>
      <Typography variant="h1">Patient Dashboard</Typography>
      <PatientMap locations={coordinates} />
    </Box>
  );
};

export default TallulahDashboard;