import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const AllRoutes: React.FC = () => {
  return useRoutes([MainRoutes]);
};

export default AllRoutes;
