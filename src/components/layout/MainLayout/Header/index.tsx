import { ReactNode, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, useMediaQuery, AppBarProps } from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';
import IconButton from 'src/components/extended/IconButton';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED } from 'src/config';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

interface Props {
  open: boolean;
  handleDrawerToggle?: () => void;
}

const Header = ({ open, handleDrawerToggle }: Props) => {
  const theme = useTheme();

  // header content
  const headerContent = useMemo(() => <HeaderContent />, []);

  // common header
  const mainHeader: ReactNode = (
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <IconButton aria-label="open drawer" onClick={handleDrawerToggle} edge="start" color="primary" variant="text" shape="square">
        {!open ? <MenuUnfoldOutlined /> : <MenuUnfoldOutlined />}
      </IconButton>
      {headerContent}
    </Toolbar>
  );

  // app-bar params
  const appBar: AppBarProps = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      zIndex: 1200,
      width: open ? `calc(100% - ${DRAWER_WIDTH}px)` : `calc(100% - ${DRAWER_WIDTH_COLLAPSED}px)`
    }
  };

  return (
    <>
      <AppBarStyled open={open} {...appBar}>
        {mainHeader}
      </AppBarStyled>
    </>
  );
};

export default Header;
