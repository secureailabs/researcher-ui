// @ts-ignore
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MenuItemData, NestedDropdown } from 'mui-nested-menu';

const Sort = (props: any) => {
  const MenuItems: MenuItemData = {
    label: 'Sort',
    items: [
      {
        label: 'Date',
        rightIcon: <ChevronRightIcon />,
        items: [
          {
            label: 'Asc'
          },
          {
            label: 'Desc'
          }
        ]
      }
    ]
  };

  return (
    <NestedDropdown
      menuItemsData={MenuItems}
      ButtonProps={{
        variant: 'outlined',
        startIcon: <SortIcon />,
        endIcon: null,
        sx: { width: 1 }
      }}
    />
  );
};

export default Sort;
