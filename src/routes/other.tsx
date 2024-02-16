import { lazy } from 'react';
import Loadable from 'src/components/extended/Loadable';
import MinimalLayout from 'src/components/layout/MinimalLayout';
import Invalid404 from 'src/pages/invalid404';

// ==============================|| MAIN ROUTING ||============================== //

const OtherRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '*',
      element: <Invalid404 />
    }
  ]
};

export default OtherRoutes;
