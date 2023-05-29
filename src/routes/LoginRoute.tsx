import { lazy } from 'react';
import Loadable from 'src/components/extended/Loadable';
import LoginLayout from 'src/components/layout/LoginLayout';

const Login = Loadable(lazy(async () => await import('src/pages/Login')));

// ==============================|| MAIN ROUTING ||============================== //

const LoginRoute = {
  path: '/',
  element: <LoginLayout />,
  children: [
    {
      path: 'login',
      element: <Login />
    }
  ]
};

export default LoginRoute;
