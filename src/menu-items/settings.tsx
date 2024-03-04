// assets
import { IconChartHistogram, IconDatabaseCog, IconUpload, IconDeviceDesktopAnalytics, IconId } from '@tabler/icons-react';

// icons
const icons = {
  IconChartHistogram,
  IconDatabaseCog,
  IconUpload,
  IconDeviceDesktopAnalytics,
  IconId
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

// Define the pages and their structure
const pages = [
  {
    id: 'user-settings',
    title: 'User Settings',
    type: 'collapse',
    icon: icons.IconChartHistogram,
    children: [
      {
        id: 'password-reset',
        title: 'Password Reset',
        type: 'item',
        url: '/settings/password-reset',
        target: false
      }
    ]
  }
];

export const getSettingsMenuItems = () => {
  return {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    children: pages
  };
};
