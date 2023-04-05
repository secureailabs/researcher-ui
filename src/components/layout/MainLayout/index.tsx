import { AppBar, Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = (): JSX.Element => (
  <>
    <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0}>
      <Toolbar>
        <Header />
      </Toolbar>
    </AppBar>
    <main>
      <Box
        sx={{
          marginTop: '64px',
        }}
      >
        <Outlet />
      </Box>
    </main>
  </>
);

export default MinimalLayout;
