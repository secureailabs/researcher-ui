import { Box, Breadcrumbs, Container, Toolbar } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Header from './Header';
import Drawer from './Drawer';
import { RootStateProps } from 'src/types/root';
import { openDrawer } from 'src/store/reducers/menu';
import { roleBasedHomeRouting, storeLoginCredentials } from 'src/pages/Login/Login';
import { ApiError, AuthenticationService, OpenAPI, UserInfo_Out } from 'src/tallulah-ts-client';
import { REACT_APP_SAIL_API_SERVICE_URL } from 'src/config';
import { useQuery } from 'react-query';
import { updateUserProfile } from 'src/store/reducers/userprofile';
import { updateSCNDetails } from 'src/store/reducers/scn_details';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { initAmplitude } from 'src/utils/Amplitude/amplitude';
import axios from 'axios';
import { notification } from 'antd';
import useNotification from 'src/hooks/useNotification';

// ==============================|| MINIMAL LAYOUT ||============================== //

export const enum SideBarMenuEnum {
  SETTINGS = 'settings',
  DEFAULT = 'default'
}

const BreadcrumbsWrapper = (): JSX.Element => {
  const breadcrumbs = useBreadcrumbs();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <Link key={match.pathname} color="inherit" to={match.pathname}>
          {breadcrumb}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

const MainLayout = ({ sideBarMenuType = SideBarMenuEnum.DEFAULT }): JSX.Element => {
  const [leftDrawerOpened, setLeftDrawerOpened] = useState(true);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const [sendNotification] = useNotification();

  const menu = useSelector((state: RootStateProps) => state.menu);

  const userProfile = useSelector((state: any) => state.userprofile);

  const { drawerOpen } = menu;

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  const handleLogout = () => {
    try {
      // remove tokens from local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokenType');

      storeLoginCredentials({
        access_token: '',
        refresh_token: '',
        token_type: ''
      });

      navigate(`/login`, {
        state: {
          from: ''
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  async function refreshAuthToken() {
    if (!process.env.REACT_APP_SAIL_API_SERVICE_URL) throw new Error('REACT_APP_SAIL_API_SERVICE_URL not set');
    OpenAPI.BASE = process.env.REACT_APP_SAIL_API_SERVICE_URL;
    const refreshToken = localStorage.getItem('refreshToken');
    const tokenType = localStorage.getItem('tokenType');
    if (refreshToken && tokenType) {
      try {
        const res = await AuthenticationService.getRefreshToken({
          refresh_token: refreshToken
        });
        storeLoginCredentials(res);
      } catch (err) {
        console.error('Token refresh failed', err);
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }

  const AxiosInterceptor = axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401) {
        handleLogout();
      }
      return Promise.reject(error);
    }
  );

  const checkUserSession = async (): Promise<UserInfo_Out> => {
    if (!process.env.REACT_APP_SAIL_API_SERVICE_URL) throw new Error('REACT_APP_SAIL_API_SERVICE_URL not set');
    OpenAPI.BASE = process.env.REACT_APP_SAIL_API_SERVICE_URL;
    const token = localStorage.getItem('accessToken');

    if (token) {
      OpenAPI.TOKEN = token;
      try {
        const res = await AuthenticationService.getCurrentUserInfo();
        dispatch(updateUserProfile(res));
        initAmplitude(res.organization_name);
        return res;
      } catch (err) {
        console.error('User session fetch failed', err);
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
  }, []);

  const { data: userInfo, status } = useQuery<UserInfo_Out, ApiError>('userData', checkUserSession, {
    refetchOnMount: 'always'
  });

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', position: 'relative' }}>
      {process.env.REACT_APP_ENV === 'development' && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '20px',
            zIndex: 9999,
            backgroundColor: '#ff9800',
            color: '#fff',
            fontSize: '11px',
            padding: '2px 5px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: '600'
          }}
        >
          Development
        </Box>
      )}

      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} sideBarMenuType={sideBarMenuType} />
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
          <BreadcrumbsWrapper />
          {status === 'success' ? <Outlet /> : null}
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
