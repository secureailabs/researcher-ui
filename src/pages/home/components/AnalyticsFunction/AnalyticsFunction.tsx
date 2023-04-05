import React, { type HTMLAttributes } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
} from '@mui/material';
import FEATURE_LIST from 'src/constants/featureVariable';
import styles from './AnalyticsFunction.module.css';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { type IAutocompleteOptionData } from 'src/shared/types/customTypes';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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

export interface IWelchTTest {
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
  <li {...props} key={option.series_name}>
    <StyledOption option={option}>{option.series_name}</StyledOption>
  </li>
);

const renderOptionWithCheckbox = (
  props: any,
  option: any,
  { selected }: any
): JSX.Element => (
  <li {...props} key={option.series_name}>
    <StyledOption option={option}>
      <Checkbox
        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
        checkedIcon={<CheckBoxIcon fontSize="small" />}
        style={{ marginRight: 8 }}
        checked={selected}
      />
      {option.series_name}
    </StyledOption>
  </li>
);

const SKEW: React.FC<ISKEW> = ({ sampleTextProp, handleSaveResult }) => {
  const [feature, setFeature] = React.useState<IAutocompleteOptionData | null>(
    null
  );

  const handleRunAnalysis = (): void => {
    if (feature !== null) {
      const result = `Skew of ${feature.series_name} :: 0.5`;
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
          getOptionLabel={(option) => option.series_name}
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

const Variance: React.FC<IVariance> = ({ sampleTextProp }) => {
  return (
    <AnalyticsFunctionContainerComponent title={'Variance'}>
      <Typography variant="body1" className={styles.text}>
        {sampleTextProp}
      </Typography>
    </AnalyticsFunctionContainerComponent>
  );
};

const Kurtosis: React.FC<IKurtosis> = ({ sampleTextProp }) => {
  return (
    <AnalyticsFunctionContainerComponent title={'Kurtosis'}>
      <Typography variant="body1" className={styles.text}>
        {sampleTextProp}
      </Typography>
    </AnalyticsFunctionContainerComponent>
  );
};

const WelchTTest: React.FC<IWelchTTest> = ({
  sampleTextProp,
  handleSaveResult,
}) => {
  const [feature, setFeature] = React.useState<IAutocompleteOptionData[]>([]);

  const handleRunAnalysis = (): void => {
    if (feature !== null && feature !== undefined && feature.length === 2) {
      const resultData =
        'statistic=24.610655184404763, pvalue=3.005513292994968e-31';
      const result = `Welch TTest result of (${feature[0].series_name}, ${feature[1].series_name}) :: ${resultData}`;
      handleSaveResult(result);
    }
  };
  return (
    <AnalyticsFunctionContainerComponent
      title={"Welch's TTest"}
      handleRunAnalysis={handleRunAnalysis}
    >
      <Box>
        <Autocomplete
          multiple
          className={styles.autocomplete}
          disablePortal
          id="feature-dropdown-checkboxes"
          value={feature}
          options={FEATURE_LIST}
          getOptionLabel={(option) => option.series_name}
          renderInput={(params) => <TextField {...params} label="Feature" />}
          renderOption={renderOptionWithCheckbox}
          onChange={(event, newValue) => {
            if (newValue === null && newValue === undefined) {
              setFeature([]);
            } else {
              if (newValue.length <= 2) {
                setFeature(newValue);
              }
            }
          }}
          getOptionDisabled={(option) => {
            if (
              feature !== null &&
              feature !== undefined &&
              feature.length > 1 &&
              !feature.includes(option)
            ) {
              return true;
            }
            return false;
          }}
          style={{ width: 500 }}
        />
      </Box>
    </AnalyticsFunctionContainerComponent>
  );
};

export { Kurtosis, SKEW, Variance, WelchTTest };
