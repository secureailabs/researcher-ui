import { Select, Box, Button, FormControl, InputLabel, Menu, MenuItem, Modal, TextField, Typography, Divider } from '@mui/material';
import { Drawer } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './UtilityBar.module.css';
import { useState } from 'react';
import IconButton from 'src/components/extended/IconButton';
import {
  DataModelState,
  DataModelVersionState,
  DefaultService,
  GetDataModelVersion_Out,
  GetDataModel_Out,
  RegisterDataModelVersion_In,
  UpdateDataModel_In,
  UserInfo_Out,
  UserRole
} from 'src/client';
import { connect } from 'react-redux';
import useNotification from 'src/hooks/useNotification';
import uuid from 'react-uuid';
import DataModelRevisionHistoryCard from 'src/pages/DataModel/components/DataModelRevisionHistoryCard';
import DataModel from '../../DataModel';

export interface IUtilityBar {
  dataModel: GetDataModel_Out;
  handlePublish: (publishMessage: string) => void;
  dataModelVersion: GetDataModelVersion_Out;
  setDataModelVersion: (dataModelVersion: GetDataModelVersion_Out) => void;
  publishedVersions: Record<string, string>;
  draftVersions: Record<string, string>;
  displaySelectedVersion: (version: string) => void;
  setAllVersions: () => void;
  setDataModelInfo: (dataModelInfo: GetDataModel_Out) => void;
}

interface DispatchProps {
  userProfile: UserInfo_Out;
}

const UtilityBar: React.FC<IUtilityBar & DispatchProps> = ({
  dataModel,
  dataModelVersion,
  setDataModelVersion,
  userProfile,
  handlePublish,
  publishedVersions,
  draftVersions,
  displaySelectedVersion,
  setAllVersions,
  setDataModelInfo
}) => {
  const [tableName, setTableName] = useState('');
  const [tableDescription, setTableDescription] = useState('');
  const [sendNotification] = useNotification();
  const [publishMessage, setPublishMessage] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [openPublishModal, setOpenPublishModal] = useState<boolean>(false);
  const [openCheckoutModal, setOpenCheckoutModal] = useState<boolean>(false);
  const [openModelPublishModal, setOpenModelPublishModal] = useState<boolean>(false);
  const [newVersionName, setNewVersionName] = useState<string>('');
  const [newVersionDescription, setNewVersionDescription] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVersion, setSelectedVersion] = useState(dataModelVersion.name);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [revisionHistoryElement, setRevisionHistoryElement] = useState<GetDataModelVersion_Out | GetDataModel_Out>();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseCheckoutModal = () => {
    setOpenCheckoutModal(false);
  };

  const handleClosePublishModal = () => {
    setOpenPublishModal(false);
  };

  const handleCloseModelPublishModal = () => {
    setOpenModelPublishModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const map_name_to_id = (name: string, show_error: boolean) => {
    let version_id = Object.keys(publishedVersions).find((key) => publishedVersions[key] === name);
    if (!version_id) {
      version_id = Object.keys(draftVersions).find((key) => draftVersions[key] === name);
      if (!version_id) {
        if (show_error) {
          sendNotification({
            msg: 'Version not found',
            variant: 'error'
          });
        }
        return '';
      }
    }
    return version_id;
  };

  const handleCheckout = async () => {
    if (newVersionName === '') {
      sendNotification({
        msg: 'Please enter a name for the new version',
        variant: 'error'
      });
      return;
    }

    // check if there is a draft version with the same name
    const existing_id = map_name_to_id(newVersionName, false);
    if (existing_id) {
      sendNotification({
        msg: 'A version with the same name already exists',
        variant: 'error'
      });
      return;
    }

    const req_body: RegisterDataModelVersion_In = {
      name: newVersionName,
      description: newVersionDescription,
      data_model_id: dataModelVersion.data_model_id,
      previous_version_id: dataModelVersion.id
    };
    const checkout_resp = await DefaultService.registerDataModelVersion(req_body);
    if (checkout_resp.id) {
      sendNotification({
        msg: 'New version created successfully',
        variant: 'success'
      });
      displaySelectedVersion(checkout_resp.id);
    } else {
      sendNotification({
        msg: 'Error creating new version',
        variant: 'error'
      });
    }
    setOpenCheckoutModal(false);
    setAllVersions();
    setSelectedVersion(newVersionName);

    // Update the data model
    const dataModelInfo = await DefaultService.getDataModelInfo(dataModel.id);
    setDataModelInfo(dataModelInfo);
  };

  const handleModelPublish = async () => {
    const publish_req: UpdateDataModel_In = {
      state: DataModelState.PUBLISHED
    };
    try {
      await DefaultService.updateDataModel(dataModel.id, publish_req);
    } catch (error) {
      sendNotification({
        msg: 'Error publishing model',
        variant: 'error'
      });
      return;
    }
    sendNotification({
      msg: 'Model published successfully',
      variant: 'success'
    });
    setOpenModelPublishModal(false);

    // Update the data model
    const dataModelInfo = await DefaultService.getDataModelInfo(dataModel.id);
    setDataModelInfo(dataModelInfo);
  };

  const handleAddNewTable = () => {
    // ensure that the new tableName is not already in use
    const existingTableNames = dataModelVersion.dataframes.map((df) => df.name);
    if (existingTableNames.includes(tableName)) {
      sendNotification({
        msg: 'Table name already exists. Kindly choose a different name.',
        variant: 'error'
      });
      return;
    }

    const newDataModel = {
      ...dataModelVersion,
      dataframes: [
        ...dataModelVersion.dataframes,
        {
          id: uuid(),
          name: tableName,
          description: tableDescription,
          series: []
        }
      ]
    };
    setDataModelVersion(newDataModel);
    setOpenModal(false);
  };

  return (
    <Box sx={{ marginTop: '20px' }} className={styles.container}>
      <FormControl variant="standard">
        <InputLabel id="demo-simple-select-label">Published Versions</InputLabel>
        <Select
          labelId="publishedVersions"
          id="publishedVersions"
          label="publishedVersions"
          placeholder="Select Published Version"
          value={selectedVersion ?? null}
          sx={{ width: '100%', minWidth: '200px' }}
          onChange={(event) => {
            if (!event.target.value) {
              return;
            }
            setSelectedVersion(event.target.value);
            displaySelectedVersion(map_name_to_id(event.target.value, true));
          }}
        >
          {Object.entries(publishedVersions).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {value} {key === dataModel.current_version_id && '(Current)'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel id="demo-simple-select-label">Draft Versions</InputLabel>
        <Select
          labelId="draftVersions"
          id="draftVersions"
          label="draftVersions"
          placeholder="Select Draft Version"
          value={selectedVersion ?? null}
          sx={{ width: '100%', minWidth: '200px' }}
          onChange={(event) => {
            setSelectedVersion(event.target.value);
            displaySelectedVersion(map_name_to_id(event.target.value, true));
          }}
        >
          {Object.entries(draftVersions).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box className={styles.bodyContainerLeft}></Box>
      <Box className={styles.bodyContainerRight}>
        {(userProfile.roles.includes(UserRole.DATA_MODEL_EDITOR) || userProfile.roles.includes(UserRole.SAIL_ADMIN)) &&
        dataModelVersion.state === DataModelVersionState.DRAFT &&
        userProfile.id === dataModelVersion.user_id ? (
          <>
            <Button variant="contained" color="primary" className={styles.addTableButton} onClick={() => setOpenModal(true)}>
              Add Table
            </Button>

            <Button variant="contained" color="primary" className={styles.addTableButton} onClick={() => setOpenPublishModal(true)}>
              Publish Version
            </Button>
          </>
        ) : null}

        {(userProfile.roles.includes(UserRole.DATA_MODEL_EDITOR) || userProfile.roles.includes(UserRole.SAIL_ADMIN)) &&
        dataModel.maintainer_organization.id === userProfile.organization.id &&
        dataModel.current_version_id === dataModelVersion.id &&
        dataModel.state === DataModelState.DRAFT ? (
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: '2px' }}
            className={styles.addTableButton}
            onClick={() => setOpenModelPublishModal(true)}
          >
            Publish Model
          </Button>
        ) : null}

        {(userProfile.roles.includes(UserRole.DATA_MODEL_EDITOR) || userProfile.roles.includes(UserRole.SAIL_ADMIN)) &&
        dataModel.current_version_id === dataModelVersion.id &&
        dataModelVersion.state === DataModelVersionState.PUBLISHED &&
        dataModel.state === DataModelState.DRAFT ? (
          <Button variant="contained" color="primary" className={styles.addTableButton} onClick={() => setOpenCheckoutModal(true)}>
            Checkout
          </Button>
        ) : null}

        <IconButton
          aria-label="refresh"
          shape="rounded"
          variant="outlined"
          sx={{
            mx: 2
          }}
        >
          <RefreshIcon />
        </IconButton>
        <IconButton aria-label="menu" shape="rounded" variant="outlined" onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              if (dataModel.revision_history) setRevisionHistoryElement(dataModel);
              setOpenDrawer(true);
            }}
          >
            Data Model Publish History
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              if (dataModelVersion.revision_history) setRevisionHistoryElement(dataModelVersion);
              setOpenDrawer(true);
            }}
          >
            Version - {dataModelVersion.name} Revision Changes
          </MenuItem>
        </Menu>
      </Box>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '30px',
            outline: 'none',
            width: '500px'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Enter DataModel Table Details
          </Typography>
          <Box>
            <TextField
              id="outlined-basic"
              label="Table Name"
              variant="outlined"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              sx={{
                width: '100%',
                marginTop: '20px'
              }}
            />
            <TextField
              id="outlined-basic"
              label="Table Description"
              variant="outlined"
              value={tableDescription}
              onChange={(e) => setTableDescription(e.target.value)}
              sx={{
                width: '100%',
                marginTop: '20px'
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px'
            }}
          >
            <Button variant="outlined" color="info" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddNewTable} style={{ marginLeft: '10px' }}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={openPublishModal} onClose={handleClosePublishModal}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '30px',
            outline: 'none',
            width: '500px'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Publish Message
          </Typography>
          <Box>
            <TextField
              id="outlined-basic"
              label="Publish Notes"
              variant="outlined"
              value={publishMessage}
              onChange={(e) => setPublishMessage(e.target.value)}
              sx={{
                width: '100%',
                marginTop: '20px'
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px'
            }}
          >
            <Button variant="outlined" color="info" onClick={handleClosePublishModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handlePublish(publishMessage);
                setOpenPublishModal(false);
              }}
              style={{ marginLeft: '10px' }}
            >
              Publish
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={openModelPublishModal} onClose={handleCloseModelPublishModal}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '30px',
            outline: 'none',
            width: '500px'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Confirmation - Important
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: '20px'
            }}
          >
            <Typography variant="body1" gutterBottom>
              Are you sure you want to publish this model? This will make the model available for use by other users and no further changes
              can be made to the model.
            </Typography>
            <Button variant="outlined" color="info" onClick={handleCloseModelPublishModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleModelPublish} style={{ marginLeft: '10px' }}>
              Publish
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={openCheckoutModal} onClose={handleCloseCheckoutModal}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '30px',
            outline: 'none',
            width: '500px'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Create new version
          </Typography>
          <Box>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={newVersionName}
              onChange={(e) => setNewVersionName(e.target.value)}
              sx={{
                width: '100%',
                marginTop: '20px'
              }}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={newVersionDescription}
              onChange={(e) => setNewVersionDescription(e.target.value)}
              sx={{
                width: '100%',
                marginTop: '20px'
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px'
            }}
          >
            <Button variant="outlined" color="info" onClick={handleCloseCheckoutModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleCheckout} style={{ marginLeft: '10px' }}>
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { width: '50%', padding: '20px 0 0 20px' }
        }}
      >
        {/* <Box sx={{ width: '100%' }} className={styles.container}> */}
        <Box className={styles.drawercontainer} sx={{ width: '100%' }}>
          <Typography variant="h4" component="h4" sx={{ marginRight: '1rem' }}>
            Revision Changes - {revisionHistoryElement?.name}
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
          <Box className={styles.inputContainer}>
            {revisionHistoryElement?.revision_history?.reverse().map((column) => {
              return <DataModelRevisionHistoryCard key={column.id} revisionData={column} />;
            })}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  userProfile: state.userprofile
});

export default connect(mapStateToProps)(UtilityBar);
