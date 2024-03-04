import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoute from './LoginRoute';
import OtherRoutes from './other';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import SettingsRoutes from './SettingsRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const AllRoutes: React.FC = () => {
  const userProfile = useSelector((state: any) => state.userprofile);

  return useRoutes([MainRoutes, SettingsRoutes, LoginRoute, OtherRoutes]);
};

export default AllRoutes;
