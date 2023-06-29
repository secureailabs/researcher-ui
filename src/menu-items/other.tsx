// assets
import { IconChartHistogram, IconDatabaseCog, IconUpload, IconDeviceDesktopAnalytics } from '@tabler/icons-react';

// type
import { NavItemType } from 'src/types/menu';

// icons
const icons = {
  IconChartHistogram,
  IconDatabaseCog,
  IconUpload,
  IconDeviceDesktopAnalytics
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other: NavItemType = {
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
    {
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
          title: 'Home',
          type: 'item',
          url: '/pag-home',
          target: false
        },
        {
          id: 'pag-comparitive-analysis',
          title: 'Comparative Analysis',
          type: 'item',
          url: 'https://sail365-demo-portal1.eastus.cloudapp.azure.com:8501/Comparison%20Metrics',
          target: true
        }
      ]
    }
  ]
};

export default other;
