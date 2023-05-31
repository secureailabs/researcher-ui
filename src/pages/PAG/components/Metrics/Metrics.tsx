import { Grid, Paper, Typography } from '@mui/material';

export interface IMetricsProps {
  column: any;
  index: any;
}

const Metrics: React.FC<IMetricsProps> = ({ column, index }) => {
  return (
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
  );
};

export default Metrics;
