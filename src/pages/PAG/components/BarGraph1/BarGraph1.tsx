import { Grid, Paper, Typography } from '@mui/material';
import Plot from 'react-plotly.js';

export interface IBarGraph1Props {
  BarGraph1Data: any;
}

const BarGraph1: React.FC<IBarGraph1Props> = ({ BarGraph1Data }) => {
  return (
    <Grid item xs={3} md={5}>
      <Paper>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold', fontSize: 18 }}>
          {BarGraph1Data.label}
        </Typography>
        <Plot
          data={[
            {
              type: 'bar',
              x: BarGraph1Data.data.map((data: any) => data.range),
              y: BarGraph1Data.data.map((data: any) => data.value)
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
  );
};

export default BarGraph1;
