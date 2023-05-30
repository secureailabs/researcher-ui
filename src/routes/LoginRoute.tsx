import { lazy } from 'react';
import Loadable from 'src/components/extended/Loadable';
import MinimalLayout from 'src/components/layout/MinimalLayout';

const Login = Loadable(lazy(async () => await import('src/pages/Login')));

// ==============================|| MAIN ROUTING ||============================== //

const LoginRoute = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <Login />
    }
  ]
};

export default LoginRoute;
