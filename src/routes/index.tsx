import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoute from './LoginRoute';
import OtherRoutes from './other';

// ==============================|| ROUTING RENDER ||============================== //

const AllRoutes: React.FC = () => {
  return useRoutes([MainRoutes, LoginRoute, OtherRoutes]);
};

export default AllRoutes;
