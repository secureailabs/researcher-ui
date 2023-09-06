import { Box, Grid, Paper, Typography } from '@mui/material';
import Plot from 'react-plotly.js';
import styles from './PieChartSection.module.css';

export interface IPieChartSectionProps {
  chart: any;
  index: any;
}

const PieChartSection: React.FC<IPieChartSectionProps> = ({ chart, index }) => {
  return (
    <Box key={index} className={styles.container}>
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
    </Box>
  );
};

export default PieChartSection;
