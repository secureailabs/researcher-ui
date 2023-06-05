import { AppBar, Box, Toolbar } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Header from './Header';
import Drawer from './Drawer';
import { RootStateProps } from 'src/types/root';
import { openDrawer } from 'src/store/reducers/menu';
import { storeLoginCredentials } from 'src/pages/Login/Login';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = (): JSX.Element => {
  const [leftDrawerOpened, setLeftDrawerOpened] = useState(true);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menu = useSelector((state: RootStateProps) => state.menu);
  const { drawerOpen } = menu;

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const tokenType = localStorage.getItem('tokenType');
    if (accessToken && refreshToken && tokenType) {
      const res = {
        access_token: accessToken,
        refresh_token: refreshToken,
        token_type: tokenType
      };
      storeLoginCredentials(res);
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#e6e6e6' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        sx={{
          margin: '15px',
          marginTop: '79px',
          display: 'flex',
          flex: 1,
          backgroundColor: '#ffffff',
          minHeight: 'calc(100vh - 79px - 30px)'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MinimalLayout;
