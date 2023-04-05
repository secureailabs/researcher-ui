import { lazy } from 'react';
import Loadable from 'src/components/extended/Loadable';
import MinimalLayout from 'src/components/layout/MinimalLayout';

const Home = Loadable(lazy(async () => await import('src/pages/home')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'home',
      element: <Home />,
    },
  ],
};

export default MainRoutes;
