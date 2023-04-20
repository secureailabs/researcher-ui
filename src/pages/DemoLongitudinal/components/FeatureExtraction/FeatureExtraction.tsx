import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { LONGITUDINAL_VARIABLES } from 'src/constants/featureVariable';
import styles from './FeatureExtraction.module.css';

const LONGITUDINAL_DROPDOWN = [
  { value: 'mean', label: 'mean' },
  { value: 'median', label: 'median' },
  { value: 'min', label: 'min' },
  { value: 'max', label: 'max' },
  { value: 'std', label: 'std' },
  { value: 'var', label: 'var' },
  { value: 'count', label: 'count' },
];

export interface IFeatureExtraction {}

const FeatureExtraction: React.FC<IFeatureExtraction> = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.titleContainer}>
        <Typography variant="h5" className={styles.title}>
          Feature Selection
        </Typography>
      </Box>
      <Box className={styles.featureListContainer}>
        <Typography variant="h6" className={styles.subTitle}>
          Static variables
        </Typography>
        <Grid container spacing={2}>
          {LONGITUDINAL_VARIABLES.static.map((feature, index) => (
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
      <Box className={styles.featureListContainer}>
        <Typography variant="h6" className={styles.subTitle}>
          Longitudinal variables
        </Typography>
        <Grid container spacing={2}>
          {LONGITUDINAL_VARIABLES.longitudinal.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              key={feature.series_name}
              className={styles.featureGrid}
            >
              <Box className={styles.featureContainerLongitudinal}>
                <Typography className={styles.listTextLongitudinal}>
                  {feature.series_name}
                </Typography>
                <Box className={styles.longitudinalSelectContainer}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Condition
                    </InputLabel>
                    <Select
                      labelId="operator"
                      id="operator"
                      label="operator"
                      defaultValue=""
                    >
                      {LONGITUDINAL_DROPDOWN.map((condition) => (
                        <MenuItem key={condition.value} value={condition.value}>
                          {condition.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FeatureExtraction;
