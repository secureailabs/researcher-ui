import { Box, Grid, Typography } from '@mui/material';
import FEATURE_LIST from 'src/constants/featureVariable';
import styles from './FeatureExtraction.module.css';

export interface IFeatureExtraction {}

const FeatureExtraction: React.FC<IFeatureExtraction> = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.titleContainer}>
        <Typography variant="h5" className={styles.title}>
          Feature extraction
        </Typography>
      </Box>
      <Box className={styles.featureListContainer}>
        <Grid container spacing={2}>
          {FEATURE_LIST.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={feature.series_name}
              className={styles.featureGrid}
            >
              <Box className={styles.featureContainer}>
                <Typography className={styles.listText}>
                  {feature.series_name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FeatureExtraction;
