import { AppBar, Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useState } from 'react';
import Sidebar from './Sidebar';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = (): JSX.Element => {
  const [leftDrawerOpened, setLeftDrawerOpened] = useState(true);

  const handleLeftDrawerToggle = (): void => {
    setLeftDrawerOpened((prev) => !prev);
  };

  return (
    <>
      <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0}>
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
      <Sidebar
        drawerOpen={leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />
      <main>
        <Box
          sx={{
            marginTop: '64px',
            width: { sm: `calc(100% - ${leftDrawerOpened ? 260 : 0}px)` },
            marginLeft: { sm: `${leftDrawerOpened ? 260 : 0}px` },
          }}
        >
          <Outlet />
        </Box>
      </main>
    </>
  );
};

export default MinimalLayout;
