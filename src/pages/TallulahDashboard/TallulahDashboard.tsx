import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import PatientMetricCard from './components/PatientMetricCard';


export interface ITallulahDb {
  sampleTextProp: string;
}

const cards = [
  {
    title: 'Patient Count',
    description: 'Patients currently documented in Tallulah',
    metric: 'Count',
    size: 3
  },
  {
    title: 'Age Distribution',
    description: 'Breakdown of patient age',
    metric: 'Age',
    size: 3
  },
  {
    title: 'Key Features',
    description: 'Notable features from patients',
    metric: 'Tags',
    size: 6
  },
  {
    title: 'Patient Story Growth',
    description: 'Patient story growth over time',
    metric: 'Growth',
    size: 6
  },
  {
    title: 'Location Map',
    description: 'Hover over each icon to learn more about the patient',
    metric: 'Location',
    size: 6
  }
];

const TallulahDashboard: React.FC<ITallulahDb> = ({ sampleTextProp }) => {

  return (
    <Box>
      <Typography variant="h1" fontWeight={5} color="#1070a1">Patient Story Dashboard</Typography>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Grid container spacing={2}>
          {cards.map((item, index) => {
            return (
              <Grid key={item.title + index} item xs={item.size}>
                <PatientMetricCard title={item.title} description={item.description} metric={item.metric} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default TallulahDashboard;


/*
 <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <PatientMetricCard title={"Current Patient Count"} description="how many patients are currently documented in Tallulah" metric={<Typography variant="h1" color="#1070a1" sx={{py:2, px:10}}>177</Typography>} />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <PatientMetricCard title={"Age Distribution"} description="Breakdown of patient age" metric={<AgeChart data={ageDistribution}/>} />
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <PatientMetricCard title={"Key Features"} description="Notable features from patients" metric={<PatientTags></PatientTags>} />
          </Grid>
        </Grid>

*/