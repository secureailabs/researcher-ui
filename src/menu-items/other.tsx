// assets
import { IconChartHistogram } from '@tabler/icons-react';

// type
import { NavItemType } from 'src/types/menu';

// icons
const icons = {
  IconChartHistogram
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
        },
        {
          id: 'comparison-metrics',
          title: 'Comparison Metrics',
          type: 'item',
          url: '/pag-comparisonmetrics',
          target: false
        }
      ]
    }
  ]
};

export default other;
