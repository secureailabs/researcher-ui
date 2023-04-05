import { Box, Divider, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import {
  Kurtosis,
  SKEW,
  Variance,
  WelchTTest,
} from '../AnalyticsFunction/AnalyticsFunction';
import AnalyticsResultHistory from '../AnalyticsResultHistory';
import styles from './Analysis.module.css';

import {
  type TOperatorString,
  type IFilter,
} from 'src/shared/types/customTypes';

export interface IAnalysis {
  filters: IFilter[];
  filterOperator: TOperatorString[];
}

const ANALYTICS_FUNCTION_LIST = [
  {
    name: 'Skew',
    description: 'Sample Function 1 Description',
    functionComponent: (handleSaveResult: (result: string) => void) => (
      <SKEW sampleTextProp={''} handleSaveResult={handleSaveResult} />
    ),
  },
  {
    name: 'Variance',
    description: 'Sample Function 2 Description',
    functionComponent: (handleSaveResult: (result: string) => void) => (
      <Variance sampleTextProp={''} handleSaveResult={handleSaveResult} />
    ),
  },
  {
    name: 'Kurtosis',
    description: 'Sample Function 3 Description',
    functionComponent: (handleSaveResult: (result: string) => void) => (
      <Kurtosis sampleTextProp={''} handleSaveResult={handleSaveResult} />
    ),
  },
  {
    name: "Welch's TTest",
    description: 'Sample Function 3 Description',
    functionComponent: (
      handleSaveResult: (result: string) => void,
      filters: IFilter[],
      filterOperator: TOperatorString[]
    ) => (
      <WelchTTest
        sampleTextProp={''}
        handleSaveResult={handleSaveResult}
        filters={filters}
        filterOperator={filterOperator}
      />
    ),
  },
];

const a11yProps = (index: number): { id: string; 'aria-controls': string } => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

const TabPanel: React.FC<{
  value: number;
  handleSaveResult: (result: string) => void;
  filters: IFilter[];
  filterOperator: TOperatorString[];
}> = ({ value, handleSaveResult, filters, filterOperator }) => {
  // right switch case
  switch (value) {
    case value:
      return (
        <Box
          className={styles.tabPanelContainer}
          role="tabpanel"
          id={`vertical-tabpanel-${value}`}
          aria-labelledby={`vertical-tab-${value}`}
        >
          {ANALYTICS_FUNCTION_LIST[value].functionComponent(
            handleSaveResult,
            filters,
            filterOperator
          )}
        </Box>
      );
    default:
      return null;
  }
};

const Analysis: React.FC<IAnalysis> = ({ filters, filterOperator }) => {
  const [value, setValue] = useState(0);
  const [result, setResult] = useState<string[]>([]);

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  const handleSaveResult = (data: string): void => {
    setResult((prevResult) => [...prevResult, data]);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.titleContainer}>
        <Typography variant="h5">Analysis</Typography>
      </Box>
      <Box className={styles.subContainer}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
          className={styles.tabs}
        >
          {ANALYTICS_FUNCTION_LIST.map((item, index) => (
            <Tab
              key={a11yProps(index).id}
              label={item.name}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
        <TabPanel
          value={value}
          handleSaveResult={handleSaveResult}
          filters={filters}
          filterOperator={filterOperator}
        />
      </Box>
      <Box className={styles.resultContainer}>
        <Typography variant="h6" className={styles.description}>
          Results
        </Typography>
        <Divider />
        <AnalyticsResultHistory sampleTextProp={''} result={result} />
      </Box>
    </Box>
  );
};

export default Analysis;
