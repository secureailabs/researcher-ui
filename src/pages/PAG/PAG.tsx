import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import Plot from 'react-plotly.js';
import { columnData, pieChartData, BarGraph1Data, BarGraph2Data, BarGraph3Data } from '../../constants/PADdummyData';
import styles from './PAG.module.css';
import Metrics from './components/Metrics/Metrics';
import PieChartSection from './components/PieChartSection/PieChartSection';
import BarGraph1 from './components/BarGraph1/BarGraph1';
import BarGraph2 from './components/BarGraph2/BarGraph2';
import BarGraph3 from './components/BarGraph3/BarGraph3';

const Dashboard = () => {
  return (
    <Box>
      <Typography style={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'left', marginBottom: '2%' }}>
        PAG Administrative Dashboard
      </Typography>
      <Grid container spacing={3} className={styles.metrics}>
        {columnData.map((column, index) => (
          <Metrics index={index} column={column} />
        ))}
      </Grid>
      <Typography style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'left', marginBottom: '2%' }}>Data Summary</Typography>
      <Grid container spacing={3} className={styles.piechartsection}>
        {pieChartData.map((chart, index) => (
          <PieChartSection index={index} chart={chart} />
        ))}
      </Grid>
      <Grid container spacing={3} className={styles.bargraphs}>
        <BarGraph1 BarGraph1Data={BarGraph1Data} />

        <BarGraph2 BarGraph2Data={BarGraph2Data} />

        <BarGraph3 BarGraph3Data={BarGraph3Data} />
      </Grid>
    </Box>
  );
};

export default Dashboard;
