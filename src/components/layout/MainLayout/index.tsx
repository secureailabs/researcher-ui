import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Header from './Header';
import Drawer from './Drawer';
import { RootStateProps } from 'src/types/root';
import { openDrawer } from 'src/store/reducers/menu';
import { storeLoginCredentials } from 'src/pages/Login/Login';
import { ApiError, DefaultService, OpenAPI, UserInfo_Out } from 'src/client';
import { REACT_APP_SAIL_API_SERVICE_URL } from 'src/config';
import { useQuery } from 'react-query';
import { updateUserProfile } from 'src/store/reducers/userprofile';
import { updateSCNDetails } from 'src/store/reducers/scn_details';

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

  const checkUserSession = async (): Promise<UserInfo_Out> => {
    // OpenAPI.BASE = REACT_APP_SAIL_API_SERVICE_URL;

    if (!process.env.REACT_APP_SAIL_API_SERVICE_URL) throw new Error('REACT_APP_SAIL_API_SERVICE_URL not set');

    OpenAPI.BASE = process.env.REACT_APP_SAIL_API_SERVICE_URL;

    const token = localStorage.getItem('accessToken');
    if (token) {
      OpenAPI.TOKEN = token;
      try {
        const res = await DefaultService.getCurrentUserInfo();
        dispatch(updateUserProfile(res));
        return res;
      } catch (err) {
        console.log(err);
        throw new Error('User session fetch failed');
      }
    } else throw new Error('No token found');
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

    try {
      (async () => {
        const res = await DefaultService.getAllSecureComputationNodes();
        const node = res.secure_computation_nodes[0];
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useQuery<UserInfo_Out, ApiError>('userData', checkUserSession, {
    refetchOnMount: 'always'
  });

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            marginTop: '79px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 79px)',
            backgroundColor: '#f5f5f5',
            width: '100%'
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default MinimalLayout;
