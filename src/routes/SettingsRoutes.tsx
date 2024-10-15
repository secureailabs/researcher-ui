import path from 'path';
import { lazy } from 'react';
import Loadable from 'src/components/extended/Loadable';
import MainLayout, { SideBarMenuEnum } from 'src/components/layout/MainLayout';
import ResetPassword from 'src/pages/AdminPages/ResetPassword';
import DataExportRequests from 'src/pages/AdminPages/DataExportRequests';

// ==============================|| MAIN ROUTING ||============================== //

const SettingsRoutes = {
  path: '/settings',
  element: <MainLayout sideBarMenuType={SideBarMenuEnum.SETTINGS} />,
  children: [
    {
      path: 'password-reset',
      element: <ResetPassword />
    },
    {
      path: 'data-export-requests',
      element: <DataExportRequests />
    }
  ]
};

export default SettingsRoutes;
