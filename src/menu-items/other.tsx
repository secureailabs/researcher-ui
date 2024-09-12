// assets
import {
  IconChartHistogram,
  IconDatabaseCog,
  IconUpload,
  IconDeviceDesktopAnalytics,
  IconId,
  IconListDetails,
  IconPencil,
  IconUsers
} from '@tabler/icons-react';

// type
import { store } from 'src/store';
import { UserRole } from 'src/tallulah-ts-client';

// icons
const icons = {
  IconChartHistogram,
  IconDatabaseCog,
  IconUpload,
  IconDeviceDesktopAnalytics,
  IconId,
  IconListDetails,
  IconPencil,
  IconUsers
};

const pagesIdAndCorrespondingRoles: { [key: string]: UserRole[] } = {
  // pages
  'tallulah-email-assistant': [UserRole.EMAIL_INTEGRATION_USER],
  'patient-story': [UserRole.FORM_INTAKE_USER],
  'content-generation': [UserRole.CONTENT_GENERATION_USER],
  'patient-profile': [UserRole.PATIENT_PROFILE_USER],
  'etapestry-data': [UserRole.ETAPESTRY_USER],
  Dashboard: [UserRole.FORM_INTAKE_USER],
  'patient-chat': [UserRole.FORM_INTAKE_USER]
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

let currentMenuItems: any = [];

// Define the pages and their structure
const pages = [
  {
    id: 'Dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: icons.IconChartHistogram,
    url: '/dashboard'
  },
  {
    id: 'tallulah-email-assistant',
    title: 'Email Assistant',
    type: 'collapse',
    icon: icons.IconListDetails,
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
        id: 'patient-story-list',
        title: 'Patient Story',
        type: 'item',
        url: '/patient-story',
        target: false
      },
      {
        id: 'patient-story-form',
        title: 'Patient Story Form',
        type: 'item',
        url: '/patient-story-form',
        target: false
      },
      {
        id: 'patient-story-form-templates',
        title: 'Manage Templates',
        type: 'item',
        url: '/patient-story-form-templates',
        target: false
      }
    ]
  },
  {
    id: 'patient-chat',
    title: 'Patient Chat',
    type: 'collapse',
    icon: icons.IconDeviceDesktopAnalytics,
    children: [
      {
        id: 'patient-chat',
        title: 'Patient Chat',
        type: 'item',
        url: '/patient-chat',
        target: false
      }
    ]
  },
  {
    id: 'content-generation',
    title: 'Content Generation',
    type: 'collapse',
    icon: icons.IconPencil,
    children: [
      {
        id: 'content-generation-form',
        title: 'Content Generation Form',
        type: 'item',
        url: '/content-generation-form',
        target: false
      },
      {
        id: 'content-generation',
        title: 'Generated Content',
        type: 'item',
        url: '/content-generation',
        target: false
      }
    ]
  },
  {
    id: 'patient-profile',
    title: 'Patient Profile',
    type: 'collapse',
    icon: icons.IconUsers,
    children: [
      {
        id: 'patient-profile',
        title: 'Patient Profile',
        type: 'item',
        url: '/patient-profile',
        target: false
      }
    ]
  },
  {
    id: 'etapestry-data',
    title: 'ETapestry',
    type: 'collapse',
    icon: icons.IconUsers,
    children: [
      {
        id: 'etapestry',
        title: 'ETapestry',
        type: 'item',
        url: '/etapestry',
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
