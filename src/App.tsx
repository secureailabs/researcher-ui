import { createTheme, CssBaseline, StyledEngineProvider } from '@mui/material';
import ThemeCustomization from 'src/themes';
import { SnackbarProvider } from 'notistack';
import { useQuery } from 'react-query';
import { ApiError, DefaultService, OpenAPI, UserInfo_Out } from 'src/client';
import './App.css';
import Routes from './routes';
import { REACT_APP_SAIL_API_SERVICE_URL } from './config';

// ==============================|| APP ||============================== //

const mode = 'light'; // currently only light mode is supported

const checkUserSession = async (): Promise<UserInfo_Out> => {
  OpenAPI.BASE = REACT_APP_SAIL_API_SERVICE_URL;
  const token = localStorage.getItem('accessToken');
  if (token) {
    OpenAPI.TOKEN = token;
    const res = await DefaultService.getCurrentUserInfo();
    console.log('res', res);
    return res;
  } else throw new Error('No token found');
};

const App: React.FC = () => {
  useQuery<UserInfo_Out, ApiError>('userData', checkUserSession, {
    retry: false,
    refetchInterval: Infinity,
    staleTime: Infinity
  });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeCustomization>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <Routes />
        </SnackbarProvider>
      </ThemeCustomization>
    </StyledEngineProvider>
  );
};

export default App;
