import React, { type HTMLAttributes } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import FEATURE_LIST from 'src/constants/featureVariable';
import styles from './AnalyticsFunction.module.css';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export interface ISKEW {
  sampleTextProp?: string;
  handleSaveResult: (result: string) => void;
}

export interface IVariance {
  sampleTextProp?: string;
  handleSaveResult: (result: string) => void;
}

export interface IKurtosis {
  sampleTextProp?: string;
  handleSaveResult: (result: string) => void;
}

export interface IAnalyticsFunctionContainerComponent {
  title: string;
  children?: React.ReactNode;
  handleRunAnalysis?: () => void;
}

const AnalyticsFunctionContainerComponent: React.FC<
  IAnalyticsFunctionContainerComponent
> = ({ title, children, handleRunAnalysis }) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.titleContainer}>
        <Typography variant="h6" className={styles.title}>
          {title}
        </Typography>
      </Box>
      {children}
      <Box className={styles.analyseButton}>
        <Button
          className={styles.button}
          variant="outlined"
          startIcon={<PlayArrowIcon />}
          onClick={handleRunAnalysis}
        >
          Run Analysis
        </Button>
      </Box>
    </Box>
  );
};

interface IAutocompleteOptionData {
  variableName: string;
  dataType: string;
  choices: string;
}

interface StyledOptionProps extends HTMLAttributes<HTMLDivElement> {
  option: IAutocompleteOptionData;
}

const StyledOption = styled('div')<StyledOptionProps>(({ option }) => ({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
}));

const renderOption = (props: any, option: any): JSX.Element => (
  <li {...props} key={option.variableName}>
    <StyledOption option={option}>{option.variableName}</StyledOption>
  </li>
);

const SKEW: React.FC<ISKEW> = ({ sampleTextProp, handleSaveResult }) => {
  const [feature, setFeature] = React.useState<IAutocompleteOptionData | null>(
    null
  );

  const handleRunAnalysis = (): void => {
    if (feature !== null) {
      const result = `Skew of ${feature.variableName} :: 0.5`;
      handleSaveResult(result);
    }
  };

  return (
    <AnalyticsFunctionContainerComponent
      title={'Skew'}
      handleRunAnalysis={handleRunAnalysis}
    >
      <Box className={styles.featureContainer}>
        <Autocomplete
          className={styles.autocomplete}
          disablePortal
          id="feature-dropdown"
          options={FEATURE_LIST}
          getOptionLabel={(option) => option.variableName}
          renderInput={(params) => <TextField {...params} label="Feature" />}
          renderOption={renderOption}
          onChange={(event, newValue) => {
            if (newValue === null && newValue === undefined) {
              setFeature(null);
            } else {
              setFeature(newValue);
            }
          }}
        />
      </Box>
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
