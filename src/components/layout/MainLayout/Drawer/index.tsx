import { useMemo } from 'react';

import { Box } from '@mui/material';

// project import
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled';
import { SideBarMenuEnum } from '../../MainLayout';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

interface Props {
  open: boolean;
  window?: () => Window;
  handleDrawerToggle?: () => void;
  sideBarMenuType: SideBarMenuEnum;
}

const MainDrawer = ({ open, handleDrawerToggle, window, sideBarMenuType }: Props) => {
  // header content
  const drawerContent = useMemo(() => <DrawerContent sideBarMenuType={sideBarMenuType} />, [sideBarMenuType]);
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
      <MiniDrawerStyled variant="permanent" open={open}>
        {drawerHeader}
        {drawerContent}
      </MiniDrawerStyled>
    </Box>
  );
};

export default MainDrawer;
