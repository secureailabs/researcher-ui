import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import {
  Kurtosis,
  SKEW,
  Variance,
} from '../AnalyticsFunction/AnalyticsFunction';
import styles from './Analysis.module.css';

export interface IAnalysis {
  sampleTextProp: string;
}

const ANALYTICS_FUNCTION_LIST = [
  {
    name: 'Skew',
    description: 'Sample Function 1 Description',
    functionComponent: <SKEW sampleTextProp={''} />,
  },
  {
    name: 'Variance',
    description: 'Sample Function 2 Description',
    functionComponent: <Variance sampleTextProp={''} />,
  },
  {
    name: 'Kurtosis',
    description: 'Sample Function 3 Description',
    functionComponent: <Kurtosis sampleTextProp={''} />,
  },
];

const a11yProps = (index: number): { id: string; 'aria-controls': string } => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

const TabPanel: React.FC<{ value: number }> = ({ value }) => {
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
          {ANALYTICS_FUNCTION_LIST[value].functionComponent}
        </Box>
      );
    default:
      return null;
  }
};

const Analysis: React.FC<IAnalysis> = ({ sampleTextProp }) => {
  const [value, setValue] = useState(0);

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
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
          {/* <Tab label="Item One" {...a11yProps(0)} /> */}
          {ANALYTICS_FUNCTION_LIST.map((item, index) => (
            <Tab
              key={a11yProps(index).id}
              label={item.name}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
        <TabPanel value={value} />
      </Box>
    </Box>
  );
};

export default Analysis;
