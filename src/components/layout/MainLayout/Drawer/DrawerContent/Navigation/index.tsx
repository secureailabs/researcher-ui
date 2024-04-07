import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Typography, useMediaQuery } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import { getMenuItemsList, getSettingsMenuItemsList } from 'src/menu-items';

import { useSelector } from 'src/store';
import useConfig from 'src/hooks/useConfig';
import { HORIZONTAL_MAX_ITEM } from 'src/config';

// types
import { NavItemType } from 'src/types/menu';
import { LAYOUT_CONST } from 'src/types/config';
import { SideBarMenuEnum } from '../../..';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

interface Props {
  sideBarMenuType: SideBarMenuEnum;
}

const Navigation = ({ sideBarMenuType }: Props) => {
  const userProfile = useSelector((state) => state.userprofile);
  const userRole = userProfile.roles;

  let menuItems = sideBarMenuType === SideBarMenuEnum.SETTINGS ? getSettingsMenuItemsList() : getMenuItemsList();

  const theme = useTheme();

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  const { drawerOpen } = useSelector((state: any) => state.menu);
  const [selectedItems, setSelectedItems] = useState<string | undefined>('');
  const [selectedLevel, setSelectedLevel] = useState<number>(0);

  console.log('drawerOpen', drawerOpen);

  const isHorizontal = menuOrientation === LAYOUT_CONST.HORIZONTAL_LAYOUT && !downLG;

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  let lastItemIndex = menuItems.items.length - 1;
  let remItems: NavItemType[] = [];
  let lastItemId: string;

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id!;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
      title: item.title,
      elements: item.children,
      icon: item.icon
    }));
  }

  useEffect(() => {
    if (sideBarMenuType === SideBarMenuEnum.SETTINGS) {
      menuItems = getSettingsMenuItemsList();
    } else {
      menuItems = getMenuItemsList();
    }
  }, [userProfile.roles]);

  const navGroups = menuItems.items.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case 'group':
        return (
          <NavGroup
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            lastItem={lastItem!}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        '& > ul:first-of-type': { mt: 0 },
        display: isHorizontal ? { xs: 'block', lg: 'flex' } : 'block'
      }}
    >
      {navGroups}
    </Box>
  );
};

export default Navigation;
