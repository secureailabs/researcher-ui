import { lazy } from 'react';
import Loadable from 'src/components/extended/Loadable';
import MinimalLayout from 'src/components/layout/MinimalLayout';
import Invalid404 from 'src/pages/invalid404';

const Home = Loadable(lazy(async () => await import('src/pages/DataFederationHome')));
const PatientStoryForm = Loadable(lazy(async () => await import('src/pages/TallulahPatientStory/PatientStoryForm')));

// ==============================|| MAIN ROUTING ||============================== //

const OtherRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '*',
      element: <Invalid404 />
    },
    {
      path: 'form/:id',
      element: <PatientStoryForm />
    }
  ]
};

export default OtherRoutes;
