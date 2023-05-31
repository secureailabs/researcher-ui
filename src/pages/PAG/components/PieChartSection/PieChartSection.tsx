import { Grid, Paper, Typography } from '@mui/material';
import Plot from 'react-plotly.js';

export interface IPieChartSectionProps {
  chart: any;
  index: any;
}

const PieChartSection: React.FC<IPieChartSectionProps> = ({ chart, index }) => {
  return (
    <Grid key={index} item xs={5} sm={5} md={5}>
      <Paper>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold', fontSize: 18 }}>
          {chart.label}
        </Typography>
        <Plot
          data={[
            {
              type: 'pie',
              values: chart.data.map((data: any) => data.value),
              labels: chart.data.map((data: any) => data.label)
            }
          ]}
          layout={{
            width: 400,
            height: 300,
            margin: { t: 0, r: 0, l: 25, b: 0 }
          }}
        />
      </Paper>
    </Grid>
  );
};

export default PieChartSection;
