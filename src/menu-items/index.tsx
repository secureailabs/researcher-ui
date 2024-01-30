// project import
import menu from 'src/store/reducers/menu';
import { getMenuItems } from './other';

// types
import { NavItemType } from 'src/types/menu';

// ==============================|| MENU ITEMS ||============================== //

export const getMenuItemsList = (): { items: NavItemType[] } => {
  const menuItems = [getMenuItems()];

  return {
    items: menuItems
  };
};

const menuItems: { items: NavItemType[] } = {
  items: [getMenuItems()]
};

export default menuItems;
