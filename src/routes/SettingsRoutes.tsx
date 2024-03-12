import { lazy } from 'react';
import Loadable from 'src/components/extended/Loadable';
import MainLayout, { SideBarMenuEnum } from 'src/components/layout/MainLayout';
import ResetPassword from 'src/pages/AdminPages/ResetPassword';

// ==============================|| MAIN ROUTING ||============================== //

const SettingsRoutes = {
  path: '/settings',
  element: <MainLayout sideBarMenuType={SideBarMenuEnum.SETTINGS} />,
  children: [
    {
      path: 'password-reset',
      element: <ResetPassword />
    }
  ]
};

export default SettingsRoutes;
