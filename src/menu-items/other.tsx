// assets
import { IconChartHistogram, IconDatabaseCog, IconUpload, IconDeviceDesktopAnalytics, IconId } from '@tabler/icons-react';

// type
import { store } from 'src/store';
import { UserRole } from 'src/tallulah-ts-client';

// icons
const icons = {
  IconChartHistogram,
  IconDatabaseCog,
  IconUpload,
  IconDeviceDesktopAnalytics,
  IconId
};

const pagesIdAndCorrespondingRoles: { [key: string]: UserRole[] } = {
  // pages
  'tallulah-email-assistant': [UserRole.EMAIL_INTEGRATION_USER],
  'patient-story': [UserRole.FORM_INTAKE_USER],
  'content-generation': [UserRole.USER]
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

let currentMenuItems: any = [];

// Define the pages and their structure
const pages = [
  {
    id: 'tallulah-email-assistant',
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
        id: 'patient-story-list',
        title: 'Patient Story',
        type: 'item',
        url: '/patient-story',
        target: false
      }
    ]
  },
  {
    id: 'content-generation',
    title: 'Content Generation',
    type: 'collapse',
    icon: icons.IconId,
    children: [
      {
        id: 'content-generation-form',
        title: 'Content Generation Form',
        type: 'item',
        url: '/content-generation-form',
        target: false
      }
    ]
  }
];

const userHasAccess = (pageId: string, roles: UserRole[]) => {
  const allowedRoles = pagesIdAndCorrespondingRoles[pageId] || [];
  return roles?.some((role) => allowedRoles.includes(role));
};

// Filter pages if page.id is not in pagesIdAndCorrespondingRoles
const filterPages = (roles: any) => {
  return pages.filter((page) => userHasAccess(page.id, roles));
};

const updateMenuItems = () => {
  const state = store.getState();
  const userRoles = state.userprofile.roles;
  currentMenuItems = filterPages(userRoles);
};

// Initial update
updateMenuItems();

// Subscribe to store changes
store.subscribe(updateMenuItems);

export const getMenuItems = () => {
  return {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    children: currentMenuItems
  };
};
