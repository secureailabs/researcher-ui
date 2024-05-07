// @ts-ignore
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MenuItemData, NestedDropdown } from 'mui-nested-menu';
import { useEffect, useState } from 'react';
import { sendAmplitudeData } from 'src/utils/Amplitude/amplitude';
import { PatientStoryFilter } from 'src/pages/TallulahPatientStory/PatientStory/PatientStory';
import { convertcamelCaseToTitleCase } from 'src/utils/helper';

interface IFilterProps {
  filterObjects: PatientStoryFilter[];
  setSelectedFilter: (data: any) => void;
  selectedFilter: any;
}

const Filter: React.FC<IFilterProps> = ({ filterObjects, setSelectedFilter, selectedFilter }) => {
  const [MenuItems, setMenuItems] = useState<MenuItemData>({});

  const isSelected = (key: string, option: string) => {
    if (selectedFilter && selectedFilter[key] && selectedFilter[key].includes(option)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const menuItemsData: MenuItemData = {
      label: 'Filter',
      items: filterObjects.map((filterObject) => {
        return {
          label: convertcamelCaseToTitleCase(filterObject.name),
          rightIcon: <ChevronRightIcon />,
          items: filterObject.options.map((option) => {
            return {
              label: option,
              sx: {
                backgroundColor: isSelected(filterObject.name, option) ? '#a1d0f7' : 'white'
                // override hover color
              },
              callback: (event, item) => {
                if (selectedFilter && selectedFilter[filterObject.name] && selectedFilter[filterObject.name].includes(option)) {
                  const newSelectedFilter = { ...selectedFilter };
                  newSelectedFilter[filterObject.name] = newSelectedFilter[filterObject.name].filter((item: string) => item !== option);
                  if (newSelectedFilter[filterObject.name].length === 0) {
                    delete newSelectedFilter[filterObject.name];
                  }
                  setSelectedFilter(newSelectedFilter);
                } else {
                  setSelectedFilter({ ...selectedFilter, [filterObject.name]: [...(selectedFilter[filterObject.name] || []), option] });
                }
              }
            };
          })
        };
      })
    };
    setMenuItems(menuItemsData);
  }, [filterObjects]);

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
