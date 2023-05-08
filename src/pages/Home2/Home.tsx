import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from './Home.module.css';
import FeatureExtraction from './components/FeatureExtraction';

import { type TOperatorString, type IFilter } from 'src/shared/types/customTypes';
import CohortSelection from './components/CohortSelection';
import Analysis from './components/Analysis';

export interface IHome {
  sampleTextProp: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const Home: React.FC<IHome> = ({ sampleTextProp }) => {
  const [value, setValue] = useState(0);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [filterOperator, setFilterOperator] = useState<TOperatorString[]>([]);

  const handleFilterChange = (data: IFilter[]): void => {
    setFilters(data);
  };

  const handleFilterOperatorChange = (data: TOperatorString[]): void => {
    setFilterOperator(data);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className={styles.container}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab label="Feature Selection" {...a11yProps(0)} />
          <Tab label="Cohort Selection" {...a11yProps(1)} />
          <Tab label="Analysis" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FeatureExtraction />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CohortSelection handleChildFilterChange={handleFilterChange} handleChildFilterOperatorChange={handleFilterOperatorChange} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Analysis filters={filters} filterOperator={filterOperator} />
      </TabPanel>
    </Box>
  );
};

export default Home;
