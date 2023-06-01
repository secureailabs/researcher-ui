import { Box, Grid, Paper, Typography } from '@mui/material';
import styles from './MetricsCard.module.css';

export interface IMetricsCardProps {
  column: any;
  index: any;
}

const MetricsCard: React.FC<IMetricsCardProps> = ({ column, index }) => {
  return (
    <Box key={index} className={styles.container}>
      <Typography variant="h6" component="h6">
        {column.label}
      </Typography>
      <Typography variant="h4" className={styles.metricData}>
        {column.value}
      </Typography>
    </Box>
  );
};

export default MetricsCard;
