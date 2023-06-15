import { Box, Button, Drawer, Typography } from '@mui/material';
import styles from './DataModel.module.css';
import UtilityBar from './components/UtilityBar';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { ApiError, DefaultService, GetMultipleDataModel_Out } from 'src/client';
import AddNewDataModel from './components/AddNewDataModel';
import DataModelTableSection from './components/DataModelTableSection';

export interface IDataModel {
  sampleTextProp: string;
}

const DataModel: React.FC<IDataModel> = ({ sampleTextProp }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { data, isLoading, status, error, refetch } = useQuery<GetMultipleDataModel_Out, ApiError>(
    ['dataModels'],
    DefaultService.getAllDataModelInfo,
    {
      refetchOnMount: 'always'
    }
  );

  return (
    <Box className={styles.container}>
      <Typography variant="h3" component="h3">
        Data Model
      </Typography>
      <UtilityBar />
      {data && !isLoading ? (
        <Box className={styles.bodyContainerTable}>
          <DataModelTableSection data={data?.data_models[0]} refetchDataModelTables={refetch} />
        </Box>
      ) : (
        <Box className={styles.bodyContainerEmpty}>
          <Typography variant="body1" component="p">
            No tables have been added to your data model
          </Typography>
          <Button variant="contained" color="primary" className={styles.addTableButton} onClick={() => setOpenDrawer(true)}>
            Add Table
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DataModel;
