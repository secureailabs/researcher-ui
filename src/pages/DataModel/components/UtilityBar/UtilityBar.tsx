import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './UtilityBar.module.css';
import { useState } from 'react';

export interface IUtilityBar {}

const UtilityBar: React.FC<IUtilityBar> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: '100%' }} className={styles.container}>
      <Box className={styles.bodyContainerLeft}></Box>
      <Box className={styles.bodyContainerRight}>
        <Button variant="contained" color="primary" className={styles.addTableButton}>
          Add Table
        </Button>
        <IconButton
          aria-label="delete"
          sx={{
            mx: 1,
            border: '1px solid #e6e6e6'
          }}
        >
          <RefreshIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          sx={{
            mx: 1,
            border: '1px solid #e6e6e6'
          }}
          onClick={handleClick}
        >
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
    </Box>
  );
};

export default UtilityBar;
