/* eslint-disable react/display-name */
import React, {
  forwardRef,
  type HTMLAttributes,
  useRef,
  useImperativeHandle,
} from 'react';

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import FEATURE_LIST from 'src/constants/featureVariable';
import styles from './AnalyticsFunction.module.css';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  type IFilter,
  type IAutocompleteOptionData,
  type TOperatorString,
} from 'src/shared/types/customTypes';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useNotification from 'src/hooks/useNotification';

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

export interface IPairedTTest {
  sampleTextProp?: string;
  handleSaveResult: (result: string) => void;
  filters: IFilter[];
  filterOperator: TOperatorString[];
}

export interface IAnalyticsFunctionContainerComponent {
  title: string;
  children?: React.ReactNode;
  handleRunAnalysis?: () => void;
  ref?: React.RefObject<HTMLDivElement>;
}

interface AnalyticsFunctionContainerRef {
  toggleLoading: () => void;
}

const AnalyticsFunctionContainerComponent = forwardRef<
  AnalyticsFunctionContainerRef,
  IAnalyticsFunctionContainerComponent
>(({ title, children, handleRunAnalysis }, ref) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const toggleLoading = (): void => {
    setLoading((prevLoading) => !prevLoading);
  };

  useImperativeHandle(ref, () => ({
    toggleLoading,
  }));

  return (
    <Box className={styles.container}>
      <Box className={styles.titleContainer}>
        <Typography variant="h6" className={styles.title}>
          {title}
        </Typography>
      </Box>
      {children}
      <Box className={styles.analyseButton}>
        {loading ? (
          <Box className={styles.loadingContainer}>
            <CircularProgress />
            <Typography variant="body2">Running Analysis...</Typography>
          </Box>
        ) : (
          <Button
            className={styles.button}
            variant="outlined"
            startIcon={<PlayArrowIcon />}
            onClick={handleRunAnalysis}
          >
            Run Analysis
          </Button>
        )}
      </Box>
    </Box>
  );
});

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

// ==============================|| SKEW ||============================== //

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

// =========================================|| Variance || ========================================= //

const Variance: React.FC<IVariance> = ({ sampleTextProp }) => {
  return (
    <AnalyticsFunctionContainerComponent title={'Variance'}>
      <Typography variant="body1" className={styles.text}>
        {sampleTextProp}
      </Typography>
    </AnalyticsFunctionContainerComponent>
  );
};

// =========================================|| Kurtosis || ========================================= //

const Kurtosis: React.FC<IKurtosis> = ({ sampleTextProp }) => {
  return (
    <AnalyticsFunctionContainerComponent title={'Kurtosis'}>
      <Typography variant="body1" className={styles.text}>
        {sampleTextProp}
      </Typography>
    </AnalyticsFunctionContainerComponent>
  );
};

// =========================================|| Paired T-Test || ========================================= //

const PairedTTest: React.FC<IPairedTTest> = ({
  sampleTextProp,
  handleSaveResult,
  filters,
  filterOperator,
}) => {
  const [feature, setFeature] = React.useState<IAutocompleteOptionData[]>([]);
  const [sendNotification] = useNotification();
  const childRef = useRef<AnalyticsFunctionContainerRef>(null);

  const getAnalyticsResult = async (): Promise<any> => {
    // axios call
    const body = {
      cohort: {
        filter: filters,
        filter_operator: filterOperator,
      },
      analysis: {
        type: 'paired_t_test',
        parameter: {
          series_name_0: feature[0].series_name,
          series_name_1: feature[1].series_name,
        },
      },
    };

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/demo/paired_t',
        body
      );
      return response.data.data;
    } catch (error) {
      sendNotification({
        msg: 'Error in running analysis',
        variant: 'error',
      });
    }
  };

  const handleRunAnalysis = (): void => {
    if (feature !== null && feature !== undefined && feature.length === 2) {
      childRef.current?.toggleLoading();
      getAnalyticsResult()
        .then((data) => {
          if (data !== null && data !== undefined) {
            const resultDataStr = JSON.stringify(data);
            const result = `Paired TTest result of (${feature[0].series_name}, ${feature[1].series_name}) :: ${resultDataStr}`;
            handleSaveResult(result);
          }
        })
        .finally(() => {
          childRef.current?.toggleLoading();
        });
    } else {
      sendNotification({
        msg: 'Please select two features',
        variant: 'error',
      });
    }
  };

  return (
    <AnalyticsFunctionContainerComponent
      title={'Paired TTest'}
      handleRunAnalysis={handleRunAnalysis}
      ref={childRef}
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

export { Kurtosis, SKEW, Variance, PairedTTest };
