// @ts-ignore
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MenuItemData, NestedDropdown } from 'mui-nested-menu';
import { getAllEmailLabels } from 'src/utils/helper';
import { useEffect, useState } from 'react';

interface IFilterProps {
  setFilters: (filters: any) => void;
  filters: string[];
}

const Filter: React.FC<IFilterProps> = ({ setFilters, filters }) => {
  const [MENU_ITEMS_LABEL, setMENU_ITEMS_LABEL] = useState<any[]>([]);

  const getMenuItems = (filters: any) => {
    const labels = getAllEmailLabels();
    // add new object to each object in labels array {sx={{ color: 'red' }}} to change color of text
    const menuItems = labels.map((label: any) => {
      let bgColor = 'white';
      if (filters.includes(label.label)) {
        bgColor = '#a1d0f7';
      }
      return {
        ...label,
        sx: {
          backgroundColor: bgColor
        },
        callback: () => {
          setFilters((prevFilters: any) => {
            if (prevFilters.includes(label.label)) {
              return prevFilters.filter((filter: any) => filter !== label.label);
            } else {
              return [...prevFilters, label.label];
            }
          });
        }
      };
    });

    return menuItems;
  };

  useEffect(() => {
    setMENU_ITEMS_LABEL(getMenuItems(filters));
  }, [filters]);

  const MenuItems: MenuItemData = {
    label: 'Filter',
    items: [
      {
        label: 'Tags',
        rightIcon: <ChevronRightIcon />,
        items: MENU_ITEMS_LABEL
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
