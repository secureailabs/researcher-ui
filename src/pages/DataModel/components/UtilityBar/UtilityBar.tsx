import { Box, Button, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './UtilityBar.module.css';
import { useState } from 'react';
import IconButton from 'src/components/extended/IconButton';
import { DefaultService, RegisterDataModelDataframe_In, RegisterDataModel_In, UserRole } from 'src/client';
import { connect } from 'react-redux';

export interface IUtilityBar {
  refetch: () => void;
  dataModelId: string;
}

interface DispatchProps {
  userProfile: any;
}

const UtilityBar: React.FC<IUtilityBar & DispatchProps> = ({ refetch, dataModelId, ...props }) => {
  const [tableName, setTableName] = useState('');
  const [tableDescription, setTableDescription] = useState('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSave = async () => {
    const body: RegisterDataModelDataframe_In = {
      name: tableName,
      description: tableDescription,
      data_model_id: dataModelId
    };
    try {
      const res = await DefaultService.registerDataModelDataframe(body);
      refetch();
      setOpenModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.bodyContainerLeft}></Box>
      <Box className={styles.bodyContainerRight}>
        {props.userProfile.roles.includes(UserRole.DATA_MODEL_EDITOR) ? (
          <Button variant="contained" color="primary" className={styles.addTableButton} onClick={() => setOpenModal(true)}>
            Add Table
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
            <Button variant="contained" color="primary" onClick={handleSave} style={{ marginLeft: '10px' }}>
              Save
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
