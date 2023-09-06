import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import Plot from 'react-plotly.js';
import styles from './PAG.module.css';
import MetricsCard from './components/Metrics/MetricsCard';
import PieChartSection from './components/PieChartSection/PieChartSection';
import BarGraph1 from './components/BarGraph1/BarGraph1';
import BarGraph2 from './components/BarGraph2/BarGraph2';
import BarGraph3 from './components/BarGraph3/BarGraph3';
import { cp } from 'fs';
import { connect } from 'react-redux';

interface IDashboardProps {
  scnDetails: any;
}

const Dashboard: React.FC<IDashboardProps> = ({ scnDetails }) => {
  const urlStats = `https://${scnDetails.baseUrl}/pag/stats`;
  const [columnData, setColumnData] = useState<any[]>([]);

  const urlGraphs = `https://${scnDetails.baseUrl}/pag/graphs`;
  const [pieData, setPieData] = useState<any[]>([]);
  const [barData, setBarData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      let response = await fetch(urlGraphs, {
        headers: {
          accept: 'application/json'
        }
      });
      const data = await response.json();
      setPieData(data.pie_charts);
      setBarData(data.histograms);
    })();
    (async () => {
      let response = await fetch(urlStats, {
        headers: {
          accept: 'application/json'
        }
      });
      const data = await response.json();
      setColumnData(data.data);
    })();
  }, []);

  return (
    <Box className={styles.container}>
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center'
        }}
      >
        PAG Administrative Dashboard
      </Typography>
      <Grid container spacing={3} className={styles.metricsContainer}>
        {columnData.map((column: { label: string; value: number }, index: number) => (
          <MetricsCard index={index} column={column} />
        ))}
      </Grid>
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center'
        }}
      >
        Data Summary
      </Typography>
      <Grid container spacing={3} className={styles.piechartsection}>
        {pieData.map((chart, index) => (
          <PieChartSection index={index} chart={chart} />
        ))}
      </Grid>
      {barData.length > 0 ? (
        <Grid container spacing={3} className={styles.bargraphs}>
          <BarGraph1 BarGraph1Data={barData[0]} />
          <BarGraph2 BarGraph2Data={barData[1]} />
          <BarGraph3 BarGraph3Data={barData[2]} />
        </Grid>
      ) : null}
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  scnDetails: state.scn_details
});

export default connect(mapStateToProps)(Dashboard);
