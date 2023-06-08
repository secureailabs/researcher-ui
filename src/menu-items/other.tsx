// assets
import { IconChartHistogram, IconDatabaseCog } from '@tabler/icons-react';

// type
import { NavItemType } from 'src/types/menu';

// icons
const icons = {
  IconChartHistogram,
  IconDatabaseCog
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
        },
        {
          id: 'datasets',
          title: 'Upload Datasets',
          type: 'item',
          url: '/datasets',
          target: false
        }
      ]
    },
    {
      id: 'patient-advisory-group',
      title: 'Patient Advisory Group',
      type: 'collapse',
      icon: icons.IconChartHistogram,
      children: [
        {
          id: 'pag-home',
          title: 'Home',
          type: 'item',
          url: '/pag-home',
          target: false
        }
      ]
    }
  ]
};

export default other;
