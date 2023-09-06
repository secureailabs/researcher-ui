import { Box, Button, Typography } from '@mui/material';
import styles from './DataModel.module.css';
import UtilityBar from './components/UtilityBar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ApiError, DataModelVersionState, DefaultService, GetDataModelVersion_Out, GetDataModel_Out } from 'src/client';
import DataModelTableSection from './components/DataModelTableSection';
import useNotification from 'src/hooks/useNotification';
import { useEffect } from 'react';
import CommentSection from './components/CommentSection';

const DataModel: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataModelInfo, setDataModelInfo] = useState<GetDataModel_Out | undefined>();
  const [dataModelVersion, setDataModelVersion] = useState<GetDataModelVersion_Out>();
  const [sendNotification] = useNotification();
  const [publishedVersions, setPublishedVersions] = useState<Record<string, string>>({});
  const [draftVersions, setDraftVersions] = useState<Record<string, string>>({});

  const setAllVersions = async () => {
    if (!dataModelInfo) {
      return;
    }

    // Get the list of all published versions
    const publishedVersions = await DefaultService.getAllPublishedDataModelVersionNames(dataModelInfo.id);
    setPublishedVersions(publishedVersions);

    // Get the list of all draft Versions
    const draftVersions = await DefaultService.getAllDraftDataModelVersionNames(dataModelInfo.id);
    setDraftVersions(draftVersions);
  };

  useEffect(() => {
    setAllVersions();
  }, [dataModelInfo]);

  const fetchDataModelVersion = async () => {
    if (!dataModelVersion) {
      const res1 = await DefaultService.getAllDataModelInfo();
      if (res1.data_models[0]) {
        setDataModelInfo(res1.data_models[0]);
        if (res1.data_models[0].current_version_id) {
          const latest_version = await DefaultService.getDataModelVersion(res1.data_models[0].current_version_id);
          setDataModelVersion(latest_version);
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

  const setSelectedVersion = async (versionId: string) => {
    if (!dataModelInfo) {
      return;
    }

    const versionData = await DefaultService.getDataModelVersion(versionId);
    setDataModelVersion(versionData);
  };

  const { isLoading, refetch } = useQuery<GetDataModelVersion_Out | null, ApiError>(['dataModelVersion'], fetchDataModelVersion, {
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

    // refetch the list of data model versions
    setAllVersions();

    // update the data model version in the frontend
    refetch();
  };

  return (
    <Box className={styles.container}>
      {dataModelVersion && !isLoading && dataModelInfo ? (
        <>
          <Typography variant="h3" component="h3">
            Data Model - {dataModelInfo.name}
          </Typography>
          <UtilityBar
            dataModel={dataModelInfo}
            dataModelVersion={dataModelVersion}
            handlePublish={handlePublish}
            publishedVersions={publishedVersions}
            draftVersions={draftVersions}
            setDataModelVersion={saveDataModelVersion}
            displaySelectedVersion={setSelectedVersion}
            setAllVersions={setAllVersions}
            setDataModelInfo={setDataModelInfo}
          />
          <Box className={styles.bodyContainerTable}>
            <DataModelTableSection
              dataModelVersion={dataModelVersion}
              dataModel={dataModelInfo}
              setDataModelVersion={saveDataModelVersion}
            />
          </Box>
          <Box className={styles.bodyContainerTable} style={{ marginTop: '2rem' }}>
            <CommentSection dataModel={dataModelInfo} />
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
