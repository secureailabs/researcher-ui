import { Box, Button, Typography } from '@mui/material';
import styles from './DataModel.module.css';
import UtilityBar from './components/UtilityBar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ApiError, DataModelVersionState, DefaultService, GetDataModelVersion_Out, GetDataModel_Out } from 'src/client';
import DataModelTableSection from './components/DataModelTableSection';
import useNotification from 'src/hooks/useNotification';

const DataModel: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataModelInfo, setDataModelInfo] = useState<GetDataModel_Out | undefined>();
  const [dataModelVersion, setDataModelVersion] = useState<GetDataModelVersion_Out>();
  const [sendNotification] = useNotification();
  const [publishedVersions, setPublishedVersions] = useState<Record<string, string>>({});
  const [draftVersions, setDraftVersions] = useState<Record<string, string>>({});

  const fetchAllDataFrames = async () => {
    if (!dataModelVersion) {
      const res1 = await DefaultService.getAllDataModelInfo();
      if (res1.data_models[0]) {
        setDataModelInfo(res1.data_models[0]);
        if (res1.data_models[0].current_version_id) {
          const latest_version = await DefaultService.getDataModelVersion(res1.data_models[0].current_version_id);
          setDataModelVersion(latest_version);

          // Get the list of all published versions
          const publishedVersions = await DefaultService.getAllPublishedDataModelVersionNames(res1.data_models[0].id);
          setPublishedVersions(publishedVersions);

          // Get the list of all draft Versions
          const draftVersions = await DefaultService.getAllDraftDataModelVersionNames(res1.data_models[0].id);
          setDraftVersions(draftVersions);

          return latest_version;
        } else {
          return null;
        }
      }
    } else {
      const version_data = await DefaultService.getDataModelVersion(dataModelVersion.id);
      setDataModelVersion(version_data);
    }
    return null;
  };

  const setSelectedVersion = async (version: string) => {
    if (!dataModelInfo) {
      return;
    }

    let version_id = Object.keys(publishedVersions).find((key) => publishedVersions[key] === version);
    if (!version_id) {
      version_id = Object.keys(draftVersions).find((key) => draftVersions[key] === version);
      if (!version_id) {
        sendNotification({
          msg: 'Version not found',
          variant: 'error'
        });
        return;
      }
    }

    const version_data = await DefaultService.getDataModelVersion(version_id);
    setDataModelVersion(version_data);
  };

  const { isLoading, refetch } = useQuery<GetDataModelVersion_Out | null, ApiError>(['dataModelVersion'], fetchAllDataFrames, {
    refetchOnMount: 'always'
  });

  const saveDataModelVersion = async (newDataModelVersion: GetDataModelVersion_Out) => {
    if (!dataModelVersion) {
      return;
    }
    await DefaultService.saveDataModel(dataModelVersion.id, newDataModelVersion);
    refetch();
  };

  const handlePublish = async (publishMessage: string) => {
    if (!dataModelVersion) {
      return;
    }

    // only publish data model if it is in draft state
    if (dataModelVersion.state !== DataModelVersionState.DRAFT) {
      sendNotification({
        msg: 'Data Model is not ready to be published or is already published.',
        variant: 'error'
      });
      return;
    }

    // commit the data model in the backend
    await DefaultService.commitDataModelVersion(dataModelVersion.id, { commit_message: publishMessage });

    sendNotification({
      msg: 'Data Model published successfully.',
      variant: 'success'
    });

    // update the data model version in the frontend
    refetch();
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h3" component="h3">
        Data Model
      </Typography>
      {dataModelVersion && !isLoading && dataModelInfo ? (
        <>
          <UtilityBar
            dataModelVersion={dataModelVersion}
            handlePublish={handlePublish}
            publishedVersions={publishedVersions}
            draftVersions={draftVersions}
            setDataModelVersion={saveDataModelVersion}
            displaySelectedVersion={setSelectedVersion}
          />
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
