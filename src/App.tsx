import { createTheme, CssBaseline, StyledEngineProvider } from '@mui/material';
import ThemeCustomization from 'src/themes';
import { SnackbarProvider } from 'notistack';
import './App.css';
import Routes from './routes';
import { UserInfo_Out, OpenAPI, DefaultService, ApiError } from './client';
import { useQuery } from 'react-query';

// ==============================|| APP ||============================== //

const mode = 'light'; // currently only light mode is supported

const checkUserSession = async (): Promise<UserInfo_Out> => {
  //if (!process.env.REACT_APP_SAIL_API_SERVICE_URL)
  //  throw new Error('REACT_APP_SAIL_API_SERVICE_URL not set');
  const REACT_APP_SAIL_API_SERVICE_URL = 'http://172.20.100.7:8000';
  OpenAPI.BASE = REACT_APP_SAIL_API_SERVICE_URL;

  const token = localStorage.getItem('accessToken');
  if (token) {
    OpenAPI.TOKEN = token;
    const res = await DefaultService.getCurrentUserInfo();
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
