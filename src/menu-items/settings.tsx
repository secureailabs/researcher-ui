// assets
import { IconSettings } from '@tabler/icons-react';

// icons
const icons = {
  IconSettings
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

// Define the pages and their structure
const pages = [
  {
    id: 'user-settings',
    title: 'User Settings',
    type: 'collapse',
    icon: icons.IconSettings,
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
