import { Select, Box, Button, FormControl, InputLabel, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './UtilityBar.module.css';
import { useEffect, useState } from 'react';
import IconButton from 'src/components/extended/IconButton';
import {
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
import { v4 as uuidv4 } from 'uuid';

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
  const [newVersionName, setNewVersionName] = useState<string>('');
  const [newVersionDescription, setNewVersionDescription] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVersion, setSelectedVersion] = useState(dataModelVersion.name);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const map_name_to_id = (name: string) => {
    let version_id = Object.keys(publishedVersions).find((key) => publishedVersions[key] === name);
    if (!version_id) {
      version_id = Object.keys(draftVersions).find((key) => draftVersions[key] === name);
      if (!version_id) {
        sendNotification({
          msg: 'Version not found',
          variant: 'error'
        });
        return '';
      }
    }
    return version_id;
  };

  const setDefaultVersion = async () => {
    const req_body: UpdateDataModel_In = {
      current_version_id: dataModelVersion.id
    };
    await DefaultService.updateDataModel(dataModel.id, req_body);

    sendNotification({
      msg: 'Current version updated successfully to' + dataModelVersion.name,
      variant: 'success'
    });

    setSelectedVersion(dataModelVersion.name);

    // Update the data model
    const dataModelInfo = await DefaultService.getDataModelInfo(dataModel.id);
    setDataModelInfo(dataModelInfo);
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
    const existing_id = map_name_to_id(newVersionName);
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
          id: uuidv4(),
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
    <Box className={styles.container}>
      <FormControl variant="standard">
        <InputLabel id="demo-simple-select-label">Published Versions</InputLabel>
        <Select
          labelId="publishedVersions"
          id="publishedVersions"
          label="publishedVersions"
          placeholder="Select Published Version"
          value={selectedVersion}
          onChange={(event) => {
            if (!event.target.value) {
              return;
            }
            setSelectedVersion(event.target.value);
            displaySelectedVersion(map_name_to_id(event.target.value));
          }}
        >
          {Object.entries(publishedVersions).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {value}
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
          onChange={(event) => {
            setSelectedVersion(event.target.value);
            displaySelectedVersion(map_name_to_id(event.target.value));
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
        {userProfile.roles.includes(UserRole.DATA_MODEL_EDITOR) &&
        dataModelVersion.state === DataModelVersionState.DRAFT &&
        userProfile.id === dataModelVersion.user_id ? (
          <>
            <Button variant="contained" color="primary" className={styles.addTableButton} onClick={() => setOpenModal(true)}>
              Add Table
            </Button>

            <Button variant="contained" color="primary" className={styles.addTableButton} onClick={() => setOpenPublishModal(true)}>
              Publish
            </Button>
          </>
        ) : null}
        {userProfile.roles.includes(UserRole.DATA_MODEL_EDITOR) &&
        dataModelVersion.state === DataModelVersionState.PUBLISHED &&
        userProfile.organization.id === dataModel.maintainer_organization.id &&
        dataModelVersion.id !== dataModel.current_version_id ? (
          <>
            <Button variant="contained" color="primary" className={styles.addTableButton} onClick={setDefaultVersion}>
              Set as Current
            </Button>
          </>
        ) : null}

        {userProfile.roles.includes(UserRole.DATA_MODEL_EDITOR) && dataModelVersion.state === DataModelVersionState.PUBLISHED ? (
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
          <MenuItem onClick={handleClose}>Revision History</MenuItem>
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
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  userProfile: state.userprofile
});

export default connect(mapStateToProps)(UtilityBar);
