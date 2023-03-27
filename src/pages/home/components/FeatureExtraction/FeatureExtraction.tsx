import { Box, Typography } from '@mui/material';
import styles from './FeatureExtraction.module.css';

export interface IFeatureExtraction {}

const FeatureExtraction: React.FC<IFeatureExtraction> = () => {
  return (
    <Box className={styles.container}>
      <Typography variant="h5">Feature extraction</Typography>
    </Box>
  );
};

export default FeatureExtraction;
