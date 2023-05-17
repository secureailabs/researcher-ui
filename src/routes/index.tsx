import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
//import LoginRoute from './LoginRoute';
import AppRouter from './LoginRoute';
import LoginRoute from './LoginRoute';

// ==============================|| ROUTING RENDER ||============================== //

const AllRoutes: React.FC = () => {
  return useRoutes([MainRoutes, LoginRoute]);
};

export default AllRoutes;
