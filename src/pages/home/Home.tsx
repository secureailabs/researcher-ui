import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import styles from './Home.module.css';
import FeatureExtraction from './components/FeatureExtraction';
import { IconList, IconUsersGroup, IconChartInfographic } from '@tabler/icons-react';

import { type TOperatorString, type IFilter } from 'src/shared/types/customTypes';
import CohortSelection from './components/CohortSelection';
import Analysis from './components/Analysis';
//import DynamicGroupingDataTable from './components/DynamicGroupingDataModelTable/DynamicGroupingDataModelTable';
import { useQuery } from 'react-query';
import { GetDataModel_Out, DefaultService, GetMultipleDataModelDataframe_Out, ApiError } from 'src/client';
import FeatureGroupTable from './components/DynamicGroupingDataModelTable/FeatureGroupTable';

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

const StyledTabs = styled(Tabs)`
  border-radius: ${({ theme }) => theme.spacing(2)}px;
  overflow: hidden;
`;

const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: 0,
  backgroundColor: '#f5f5f5',
  margin: '10px',
  color: '#000',
  // if active tab then change color
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.lighter,
    fontWeight: 'bold'
  }
}));

const Home: React.FC<IHome> = ({ sampleTextProp }) => {
  const [value, setValue] = useState(0);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [filterOperator, setFilterOperator] = useState<TOperatorString[]>([]);
  const [dataModelInfo, setDataModelInfo] = useState<GetDataModel_Out | undefined>();

  const fetchAllDataFrames = async () => {
    const res1 = await DefaultService.getAllDataModelInfo();
    // Only taling the first from the array list
    setDataModelInfo(res1.data_models[0]);
    const dataModelId = res1.data_models[0].id;
    const res = await DefaultService.getAllDataModelDataframeInfo(dataModelId);
    return res;
  };

  const { data, isLoading, status, error, refetch } = useQuery<GetMultipleDataModelDataframe_Out, ApiError>(
    ['dataModels'],
    fetchAllDataFrames,
    {
      refetchOnMount: 'always'
    }
  );

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
        <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <StyledTab icon={<IconList />} label="Feature Selection" {...a11yProps(0)} />
          <StyledTab icon={<IconUsersGroup />} label="Cohort Selection" {...a11yProps(1)} />
          <StyledTab icon={<IconChartInfographic />} label="Analysis" {...a11yProps(2)} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
      {data && !isLoading ? (
      <FeatureGroupTable />
      ) : null}
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
