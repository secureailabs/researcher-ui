import { Box, Button, Drawer, Typography } from '@mui/material';
import styles from './DataModel.module.css';
import UtilityBar from './components/UtilityBar';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  ApiError,
  DataModelState,
  DefaultService,
  GetDataModel_Out,
  GetMultipleDataModelDataframe_Out,
  GetMultipleDataModel_Out
} from 'src/client';
import AddNewDataModel from './components/AddNewDataModel';
import DataModelTableSection from './components/DataModelTableSection';

export interface IDataModel {
  sampleTextProp: string;
}

const DataModel: React.FC<IDataModel> = ({ sampleTextProp }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
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

  return (
    <Box className={styles.container}>
      <Typography variant="h3" component="h3">
        Data Model
      </Typography>
      {data && !isLoading && dataModelInfo ? (
        <>
          <UtilityBar refetch={refetch} dataModelId={dataModelInfo?.id} />
          <Box className={styles.bodyContainerTable}>
            <DataModelTableSection data={data} refetchDataModelTables={refetch} />
          </Box>
        </>
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
