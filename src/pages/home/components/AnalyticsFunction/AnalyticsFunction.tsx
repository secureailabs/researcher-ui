import { Box, Typography } from '@mui/material';
import styles from './AnalyticsFunction.module.css';

export interface ISKEW {
  sampleTextProp?: string;
}

export interface IVariance {
  sampleTextProp?: string;
}

export interface IKurtosis {
  sampleTextProp?: string;
}

export interface IAnalyticsFunctionContainerComponent {
  title: string;
  children?: React.ReactNode;
}

const AnalyticsFunctionContainerComponent: React.FC<
  IAnalyticsFunctionContainerComponent
> = ({ title, children }) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.titleContainer}>
        <Typography variant="h6" className={styles.title}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

const SKEW: React.FC<ISKEW> = ({ sampleTextProp }) => {
  return (
    <AnalyticsFunctionContainerComponent title={'Skew'}>
      <Typography variant="body1" className={styles.text}>
        {sampleTextProp}
      </Typography>
    </AnalyticsFunctionContainerComponent>
  );
};

export { SKEW };

const Variance: React.FC<IVariance> = ({ sampleTextProp }) => {
  return (
    <AnalyticsFunctionContainerComponent title={'Variance'}>
      <Typography variant="body1" className={styles.text}>
        {sampleTextProp}
      </Typography>
    </AnalyticsFunctionContainerComponent>
  );
};

export { Variance };

const Kurtosis: React.FC<IKurtosis> = ({ sampleTextProp }) => {
  return (
    <AnalyticsFunctionContainerComponent title={'Kurtosis'}>
      <Typography variant="body1" className={styles.text}>
        {sampleTextProp}
      </Typography>
    </AnalyticsFunctionContainerComponent>
  );
};

export { Kurtosis };
