import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import Plot from 'react-plotly.js';
import { columnData, pieChartData, ageData, deathData, survivalData } from '../../constants/PADdummyData';

const Dashboard = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {columnData.map((column, index) => (
          <Grid key={index} item xs={12} sm={6} md={2}>
            <Paper>
              <Typography variant="h6" align="center">
                {column.label}
              </Typography>
              <Typography variant="h4" align="center">
                {column.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        {pieChartData.map((chart, index) => (
          <Grid key={index} item xs={12} sm={6} md={2}>
            <Paper>
              <Typography variant="h6" align="center">
                {chart.label}
              </Typography>
              <Plot
                data={[
                  {
                    type: 'pie',
                    values: chart.data.map((data) => data.value),
                    labels: chart.data.map((data) => data.label)
                  }
                ]}
                layout={{
                  width: 200,
                  height: 200,
                  margin: { t: 0, r: 0, l: 0, b: 0 }
                }}
              />
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12} md={4}>
          <Paper>
            <Typography variant="h6" align="center">
              {ageData.label}
            </Typography>
            <Plot
              data={[
                {
                  type: 'bar',
                  x: ageData.data.map((data) => data.range),
                  y: ageData.data.map((data) => data.value)
                }
              ]}
              layout={{
                width: 400,
                height: 300,
                margin: { t: 40, r: 10, l: 40, b: 40 }
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper>
            <Typography variant="h6" align="center">
              {deathData.label}
            </Typography>
            <Plot
              data={[
                {
                  type: 'bar',
                  x: deathData.data.map((data) => data.range),
                  y: deathData.data.map((data) => data.value)
                }
              ]}
              layout={{
                width: 400,
                height: 300,
                margin: { t: 40, r: 10, l: 40, b: 40 }
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper>
            <Typography variant="h6" align="center">
              {survivalData.label}
            </Typography>
            <Plot
              data={[
                {
                  type: 'bar',
                  x: survivalData.data.map((data) => data.range),
                  y: survivalData.data.map((data) => data.value)
                }
              ]}
              layout={{
                width: 400,
                height: 300,
                margin: { t: 40, r: 10, l: 40, b: 40 }
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
