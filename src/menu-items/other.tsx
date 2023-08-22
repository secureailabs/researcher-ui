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
      id: 'researcher-portal',
      title: 'Researcher Portal',
      type: 'collapse',
      icon: icons.IconChartHistogram,
      children: [
        {
          id: 'login',
          title: 'Static Data',
          type: 'item',
          url: '/',
          target: false
        },
        {
          id: 'register',
          title: 'Longitudinal Data',
          type: 'item',
          url: '/demo-longitudinal',
          target: false
        }
      ]
    },
    {
      id: 'data-model',
      title: 'Data Model',
      type: 'collapse',
      icon: icons.IconDatabaseCog,
      children: [
        {
          id: 'data-model',
          title: 'Data Model',
          type: 'item',
          url: '/data-model',
          target: false
        }
      ]
    },
    true && {
      id: 'data-model-upload',
      title: 'Data Upload',
      type: 'collapse',
      icon: icons.IconUpload,
      children: [
        {
          id: 'upload-datasets',
          title: 'Upload Datasets',
          type: 'item',
          url: '/datasets',
          target: false
        }
      ]
    },
    {
      id: 'patient-advisory-group',
      title: 'Administrative',
      type: 'collapse',
      icon: icons.IconDeviceDesktopAnalytics,
      children: [
        {
          id: 'pag-home',
          title: 'Dashboard',
          type: 'item',
          url: '/pag-home',
          target: false
        },
        {
          id: 'pag-comparitive-analysis',
          title: 'Comparative Analysis',
          type: 'item',
          url: '/pag-compare',
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
