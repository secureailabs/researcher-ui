import { Grid, Paper, Typography } from '@mui/material';
import Plot from 'react-plotly.js';

export interface IBarGraph2Props {
  BarGraph2Data: any;
}

const BarGraph2: React.FC<IBarGraph2Props> = ({ BarGraph2Data }) => {
  return (
    <Grid item xs={3} md={5}>
      <Paper>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold', fontSize: 18 }}>
          {BarGraph2Data.label}
        </Typography>
        <Plot
          data={[
            {
              type: 'bar',
              x: BarGraph2Data.data.map((data: any) => data.range),
              y: BarGraph2Data.data.map((data: any) => data.value)
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

export default BarGraph2;
