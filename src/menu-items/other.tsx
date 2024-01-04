// assets
import { IconChartHistogram, IconDatabaseCog, IconUpload, IconDeviceDesktopAnalytics, IconId } from '@tabler/icons-react';

// type
import { NavItemType } from 'src/types/menu';
import { store } from 'src/store';
import { UserRole } from 'src/client';

// icons
const icons = {
  IconChartHistogram,
  IconDatabaseCog,
  IconUpload,
  IconDeviceDesktopAnalytics,
  IconId
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
      title: 'Email Assistant',
      type: 'collapse',
      icon: icons.IconChartHistogram,
      children: [
        {
          id: 'email-assistant',
          title: 'Email Assistant',
          type: 'item',
          url: '/email-assistant',
          target: false
        }
      ]
    },
    {
      id: 'patient-story',
      title: 'Patient Story',
      type: 'collapse',
      icon: icons.IconId,
      children: [
        {
          id: 'patient-story-form',
          title: 'Patient Story Form',
          type: 'item',
          url: '/patient-story-form',
          target: false
        },
        {
          id: 'patient-story',
          title: 'Patient Story',
          type: 'item',
          url: '/patient-story',
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
