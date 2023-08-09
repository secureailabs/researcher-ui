import { Box, Divider, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CHISQUARE, Kurtosis, PairedTTest, SKEW, Variance } from '../AnalyticsFunction/AnalyticsFunction';
import AnalyticsResultHistory from '../AnalyticsResultHistory';
import styles from './Analysis.module.css';

import { type TOperatorString, type IFilter, type IAnalyticsResult, IAutocompleteOptionData } from 'src/shared/types/customTypes';

export interface IAnalysis {
  filters: IFilter[];
  filterOperator: TOperatorString[];
  featureList: IAutocompleteOptionData[];
}

const ANALYTICS_FUNCTION_LIST = [
  {
    name: 'Chi Square',
    description: 'Sample Function 1 Description',
    functionComponent: (
      handleSaveResult: (result: IAnalyticsResult) => void,
      filters: IFilter[],
      filterOperator: TOperatorString[],
      featureList: IAutocompleteOptionData[]
    ) => (
      <CHISQUARE
        sampleTextProp={''}
        handleSaveResult={handleSaveResult}
        filters={filters}
        filterOperator={filterOperator}
        featureList={featureList}
      />
    )
  }
  // {
  //   name: 'Variance',
  //   description: 'Sample Function 2 Description',
  //   functionComponent: (handleSaveResult: (result: IAnalyticsResult) => void) => (
  //     <Variance sampleTextProp={''} handleSaveResult={handleSaveResult} />
  //   )
  // },
  // {
  //   name: 'Kurtosis',
  //   description: 'Sample Function 3 Description',
  //   functionComponent: (handleSaveResult: (result: IAnalyticsResult) => void) => (
  //     <Kurtosis sampleTextProp={''} handleSaveResult={handleSaveResult} />
  //   )
  // },
  // {
  //   name: 'Paired TTest',
  //   description: 'Sample Function 3 Description',
  //   functionComponent: (handleSaveResult: (result: IAnalyticsResult) => void, filters: IFilter[], filterOperator: TOperatorString[]) => (
  //     <PairedTTest sampleTextProp={''} handleSaveResult={handleSaveResult} filters={filters} filterOperator={filterOperator} />
  //   )
  // }
];

const a11yProps = (index: number): { id: string; 'aria-controls': string } => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
};

const TabPanel: React.FC<{
  value: number;
  handleSaveResult: (result: IAnalyticsResult) => void;
  filters: IFilter[];
  filterOperator: TOperatorString[];
  featureList: IAutocompleteOptionData[];
}> = ({ value, handleSaveResult, filters, filterOperator, featureList }) => {
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
          {ANALYTICS_FUNCTION_LIST[value].functionComponent(handleSaveResult, filters, filterOperator, featureList)}
        </Box>
      );
    default:
      return null;
  }
};

const Analysis: React.FC<IAnalysis> = ({ filters, filterOperator, featureList }) => {
  const [value, setValue] = useState(0);
  const [result, setResult] = useState<IAnalyticsResult[]>([]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  const handleSaveResult = (data: IAnalyticsResult): void => {
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
            <Tab key={a11yProps(index).id} label={item.name} {...a11yProps(index)} />
          ))}
        </Tabs>
        <TabPanel
          value={value}
          handleSaveResult={handleSaveResult}
          filters={filters}
          filterOperator={filterOperator}
          featureList={featureList}
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
