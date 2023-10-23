// assets
import { IconChartHistogram, IconDatabaseCog, IconUpload, IconDeviceDesktopAnalytics } from '@tabler/icons-react';

// type
import { NavItemType } from 'src/types/menu';
import { store } from 'src/store';
import { UserRole } from 'src/client';

// icons
const icons = {
  IconChartHistogram,
  IconDatabaseCog,
  IconUpload,
  IconDeviceDesktopAnalytics
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

let state = store.getState();

let userProfile = state.userprofile;

const hasDataModelUploadRole = userProfile?.roles?.includes(UserRole.DATA_SUBMITTER);

console.log('hasDataModelUploadRole', hasDataModelUploadRole);

const other: any = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'tallulah',
      title: 'Tallulah',
      type: 'collapse',
      icon: icons.IconChartHistogram,
      children: [
        {
          id: 'patient-dashboard',
          title: 'Tallulah Dashboard',
          type: 'item',
          url: '/tallulah-dashboard',
          target: false
        },
        {
          id: 'search',
          title: 'Patient Story Search',
          type: 'item',
          url: '/tallulah-search',
          target: false
        },
        {
          id: 'copy-assistant',
          title: 'Copy Assistant',
          type: 'item',
          url: '/tallulah-copy-assistant',
          target: false
        },
        {
          id: 'social-search',
          title: 'Social Search',
          type: 'item',
          url: '/tallulah-social-search',
          target: false
        },
        {
          id: 'patient-intake',
          title: 'Patient Intake',
          type: 'item',
          url: '/tallulah-patient-intake',
          target: false
        }
      ]
    }
  ].filter(Boolean)
};

// Add a callback function to handle store state changes
function handleStateChange() {
  state = store.getState();
  userProfile = state.userprofile;
}

// Subscribe to store state changes
store.subscribe(handleStateChange);

export default other;
