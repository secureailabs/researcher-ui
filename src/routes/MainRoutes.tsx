import { lazy } from 'react';
import Loadable from 'src/components/extended/Loadable';
import MainLayout from 'src/components/layout/MainLayout';

const Home = Loadable(lazy(async () => await import('src/pages/home')));
const DemoLongitudinal = Loadable(lazy(async () => await import('src/pages/DemoLongitudinal')));
const Login = Loadable(lazy(async () => await import('src/pages/Login')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: 'home',
      element: <Home />
    },
    {
      path: 'demo-longitudinal',
      element: <DemoLongitudinal />
    },
    {
      path: 'login',
      element: <Login />
    }
  ]
};

export default MainRoutes;
