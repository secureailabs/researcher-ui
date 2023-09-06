import { Grid, Paper, Typography } from '@mui/material';
import Plot from 'react-plotly.js';

export interface IBarGraph1Props {
  BarGraph1Data: any;
  index: any;
}

const BarGraph1: React.FC<IBarGraph1Props> = ({ BarGraph1Data }) => {
  return (
    <Grid item xs={3} md={5}>
      <Paper>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold', fontSize: 18 }}>
          {BarGraph1Data.label}
        </Typography>
        <Plot data={BarGraph1Data.data.data} layout={BarGraph1Data.data.layout} />
      </Paper>
    </Grid>
  );
};

export default BarGraph1;
