import { Box, Button, Drawer, Typography } from '@mui/material';
import styles from './DataModel.module.css';
import UtilityBar from './components/UtilityBar';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { ApiError, DataModelState, DefaultService, GetDataModelVersion_Out, GetDataModel_Out } from 'src/client';
import AddNewDataModel from './components/AddNewDataModel';
import DataModelTableSection from './components/DataModelTableSection';

export interface IDataModel {
  sampleTextProp: string;
}

const DataModel: React.FC<IDataModel> = ({ sampleTextProp }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataModelInfo, setDataModelInfo] = useState<GetDataModel_Out | undefined>();
  const [dataModelVersion, setDataModelVersion] = useState<GetDataModelVersion_Out>();

  const fetchAllDataFrames = async () => {
    const res1 = await DefaultService.getAllDataModelInfo();

    if (res1.data_models[0]) {
      setDataModelInfo(res1.data_models[0]);
      if (res1.data_models[0].current_version_id) {
        const latest_version = await DefaultService.getDataModelVersion(res1.data_models[0].current_version_id);
        console.log('latest_version', latest_version);
        setDataModelVersion(latest_version);
        return latest_version;
      } else {
        return null;
      }
    }
    return null;
  };

  const saveDataModelVersion = async (newDataModelVersion: GetDataModelVersion_Out) => {
    if (!dataModelVersion) {
      return;
    }
    await DefaultService.saveDataModel(dataModelVersion.id, newDataModelVersion);
    refetch();
  };

  const { data, isLoading, status, error, refetch } = useQuery<GetDataModelVersion_Out | null, ApiError>(
    ['dataModels'],
    fetchAllDataFrames,
    {
      refetchOnMount: 'always'
    }
  );

  console.log('dataModel', dataModelVersion);

  return (
    <Box className={styles.container}>
      <Typography variant="h3" component="h3">
        Data Model
      </Typography>
      {dataModelVersion && !isLoading && dataModelInfo ? (
        <>
          {/* Utility bar contains Add table button, refresh button  */}
          <UtilityBar dataModelVersion={dataModelVersion} setDataModelVersion={saveDataModelVersion} dataModelId={dataModelInfo?.id} />
          <Box className={styles.bodyContainerTable}>
            <DataModelTableSection dataModelVersion={dataModelVersion} setDataModelVersion={saveDataModelVersion} />
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
