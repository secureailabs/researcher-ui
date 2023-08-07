import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, Autocomplete, TextField } from '@mui/material';
import Plot from 'react-plotly.js';
import styles from './Compare.module.css';
import { styled } from '@mui/material/styles';
import { cp } from 'fs';

const Compare = () => {
  const urlGraphs = 'http://127.0.0.1:8000/compare';
  const [pieData, setPieData] = useState<any[]>([]);
  const [barData, setBarData] = useState<any[]>([]);

  (async () => {
    let response = await fetch('http://127.0.0.1:8000/compare/', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chosen_hospitals: ['string'],
        attributes_to_be_compared: ['string']
      })
    });
    const data = await response.json();
    setPieData(data.pie_charts);
    setBarData(data.histograms);
  })();
  return (
    <Box className={styles.container}>
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center'
        }}
      >
        Comparative Analysis
      </Typography>
    </Box>
  );
};

export default Compare;
