import { Box, Button, Drawer, Typography } from '@mui/material';
import styles from './DataModel.module.css';
import UtilityBar from './components/UtilityBar';
import { useEffect, useState } from 'react';
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

  console.log('data1', data);

  return (
    <Box sx={{ width: '100%' }} className={styles.container}>
      <Typography variant="h4" component="h4">
        Data Model
      </Typography>
      <UtilityBar />
      {data && !isLoading ? (
        <Box className={styles.bodyContainerTable}>
          <DataModelTableSection data={data?.data_models[0]} />
        </Box>
      ) : (
        <Box className={styles.bodyContainerEmpty}>
          <Typography variant="body1" component="p">
            No tables have been added to your datamodel
          </Typography>
          <Button variant="contained" color="primary" className={styles.addTableButton} onClick={() => setOpenDrawer(true)}>
            Add Table
          </Button>
        </Box>
      )}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { width: '50%', padding: '20px 0 0 20px' }
        }}
      >
        <AddNewDataModel />
      </Drawer>
    </Box>
  );
};

export default DataModel;
