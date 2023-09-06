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

const App: React.FC = () => {
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
