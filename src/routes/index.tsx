import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoute from './LoginRoute';
import OtherRoutes from './other';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// ==============================|| ROUTING RENDER ||============================== //

const AllRoutes: React.FC = () => {
  const userProfile = useSelector((state: any) => state.userprofile);
  console.log('userProfile', userProfile);

  return useRoutes([MainRoutes, LoginRoute, OtherRoutes]);
};

export default AllRoutes;
