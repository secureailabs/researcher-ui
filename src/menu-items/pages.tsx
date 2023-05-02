// assets
import { IconChartHistogram } from '@tabler/icons-react';

// constant
const icons = {
  IconChartHistogram,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'researcher-portal',
      title: 'Researcher Portal',
      type: 'collapse',
      icon: icons.IconChartHistogram,

      children: [
        {
          id: 'demo-static',
          title: 'Demo Static',
          type: 'item',
          url: '/',
          target: false,
        },
        {
          id: 'demo-longitudinal',
          title: 'Demo Longitudinal',
          type: 'item',
          url: '/demo-longitudinal',
          target: false,
        },
      ],
    },
  ],
};

export default pages;
