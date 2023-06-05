import { createTheme, CssBaseline, StyledEngineProvider } from '@mui/material';
import ThemeCustomization from 'src/themes';
import { SnackbarProvider } from 'notistack';
import { useQuery } from 'react-query';
import { ApiError, DefaultService, OpenAPI, UserInfo_Out } from 'src/client';
import './App.css';
import Routes from './routes';

// ==============================|| APP ||============================== //

const mode = 'light'; // currently only light mode is supported

export const checkUserSession = async (): Promise<UserInfo_Out> => {
  OpenAPI.TOKEN = localStorage.getItem('accessToken') as string;
  const res = await DefaultService.getCurrentUserInfo();
  return res;
};

const App: React.FC = () => {
  useQuery<UserInfo_Out, ApiError>(['userData'], checkUserSession, {
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
