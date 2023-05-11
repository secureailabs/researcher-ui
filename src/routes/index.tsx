import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import OtherRoutes from './other';

// ==============================|| ROUTING RENDER ||============================== //

const AllRoutes: React.FC = () => {
  return useRoutes([MainRoutes, OtherRoutes]);
};

export default AllRoutes;
