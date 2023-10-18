import { lazy } from 'react';
import Loadable from 'src/components/extended/Loadable';
import MainLayout from 'src/components/layout/MainLayout';
import Dataset from 'src/pages/Datasets/components/DatasetPage/DatasetPage';
import DatasetVersion from 'src/pages/Datasets/components/DatasetPage/components/DatasetVersionPage/DatasetVersionPage';
import Login from 'src/pages/Login';
import Invalid404 from 'src/pages/invalid404';
import Compare from 'src/pages/Compare';

const Home = Loadable(lazy(async () => await import('src/pages/home')));
const DemoLongitudinal = Loadable(lazy(async () => await import('src/pages/DemoLongitudinal')));
const DataModel = Loadable(lazy(async () => await import('src/pages/DataModel')));
const PAG = Loadable(lazy(async () => await import('src/pages/PAG')));
const Datasets = Loadable(lazy(async () => await import('src/pages/Datasets')));
const ComparePage = Loadable(lazy(async () => await import('src/pages/Compare')));
const TallulahSearch = Loadable(lazy(async () => await import('src/pages/TallulahSearch')));
const TallulahStoryAssistant = Loadable(lazy(async () => await import('src/pages/TallulahStoryAssistant')));
const TallulahDashboard = Loadable(lazy(async () => await import('src/pages/TallulahDashboard')));
const TallulahEmailAssistant = Loadable(lazy(async () => await import('src/pages/TallulahEmailAssistant')));
const MSAuthorize = Loadable(lazy(async () => await import('src/pages/MSAuthorize')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <TallulahEmailAssistant />
    },
    {
      path: 'home',
      element: <TallulahEmailAssistant />
    },
    {
      path: 'tallulah-search',
      element: <TallulahSearch />
    },
    {
      path: 'tallulah-story-assistant',
      element: <TallulahStoryAssistant />
    },
    {
      path: 'tallulah-dashboard',
      element: <TallulahDashboard />
    },
    {
      path: 'email-assistant',
      element: <TallulahEmailAssistant />
    },
    {
      path: 'outlook-oauth',
      element: <MSAuthorize />
    }
    // {
    //   path: 'home',
    //   element: <Home />
    // },
    // {
    //   path: 'demo-longitudinal',
    //   element: <DemoLongitudinal />
    // },
    // {
    //   path: 'data-model',
    //   element: <DataModel />
    // },
    // {
    //   path: 'pag-home',
    //   element: <PAG />
    // },
    // {
    //   path: 'pag-compare',
    //   element: <ComparePage />
    // },
    // {
    //   path: 'datasets',
    //   element: <Datasets />
    // },
    // {
    //   path: 'datasets/:id',
    //   element: <Dataset />
    // },
    // {
    //   path: 'datasets/:id/versions/:version',
    //   element: <DatasetVersion />
    // }
  ]
};

export default MainRoutes;
