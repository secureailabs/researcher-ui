import { Select, Box, Button, FormControl, InputLabel, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './UtilityBar.module.css';
import { useEffect, useState } from 'react';
import IconButton from 'src/components/extended/IconButton';
import { DataModelVersionState, GetDataModelVersion_Out, UserInfo_Out, UserRole } from 'src/client';
import { connect } from 'react-redux';
import useNotification from 'src/hooks/useNotification';
import { v4 as uuidv4 } from 'uuid';

export interface IUtilityBar {
  handlePublish: (publishMessage: string) => void;
  dataModelVersion: GetDataModelVersion_Out;
  setDataModelVersion: (dataModelVersion: GetDataModelVersion_Out) => void;
  publishedVersions: Record<string, string>;
  draftVersions: Record<string, string>;
  displaySelectedVersion: (version: string) => void;
}

interface DispatchProps {
  userProfile: UserInfo_Out;
}

const UtilityBar: React.FC<IUtilityBar & DispatchProps> = ({
  dataModelVersion,
  setDataModelVersion,
  userProfile,
  handlePublish,
  publishedVersions,
  draftVersions,
  displaySelectedVersion
}) => {
  const [tableName, setTableName] = useState('');
  const [tableDescription, setTableDescription] = useState('');
  const [sendNotification] = useNotification();
  const [publishMessage, setPublishMessage] = useState<string>('');
  const [openPublishModal, setOpenPublishModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(Object.entries(publishedVersions)[0][1]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClosePublishModal = () => {
    setOpenPublishModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
            if (event.target.value === null) {
              return;
            }
            setSelectedVersion(event.target.value);
            displaySelectedVersion(event.target.value);
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
            displaySelectedVersion(event.target.value);
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
        {userProfile.roles.includes(UserRole.DATA_MODEL_EDITOR) && dataModelVersion.state === DataModelVersionState.PUBLISHED ? (
          <Button variant="contained" color="primary" className={styles.addTableButton} onClick={() => setOpenModal(true)}>
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
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  userProfile: state.userprofile
});

export default connect(mapStateToProps)(UtilityBar);
