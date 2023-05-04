import { createTheme, CssBaseline, StyledEngineProvider } from '@mui/material';
import ThemeCustomization from 'src/themes';
import { SnackbarProvider } from 'notistack';
import GetDesignTokens from 'src/styles/theme';
import './App.css';
import Routes from './routes';

// ==============================|| APP ||============================== //

const mode = 'light'; // currently only light mode is supported
const theme = createTheme(GetDesignTokens(mode));

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
