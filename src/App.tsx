import { createTheme, CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import GetDesignTokens from 'src/styles/theme';
import './App.css';
import Routes from './routes';

// ==============================|| APP ||============================== //

const mode = 'light'; // currently only light mode is supported
const theme = createTheme(GetDesignTokens(mode));

const App = (): JSX.Element => {
  return (
    <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
