// @ts-ignore
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MenuItemData, NestedDropdown } from 'mui-nested-menu';

const Filter = (props: any) => {
  const { setFilters } = props;

  const MenuItems: MenuItemData = {
    label: 'Filter',
    items: [
      {
        label: 'Tags',
        rightIcon: <ChevronRightIcon />,
        items: [
          {
            label: 'General Info'
          },
          {
            label: 'Empty'
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
        startIcon: <FilterAltIcon />,
        endIcon: null,
        sx: { width: 1 }
      }}
    />
  );
};

export default Filter;
