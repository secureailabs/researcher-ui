import { lazy } from 'react';
import Loadable from 'src/components/extended/Loadable';
import MainLayout from 'src/components/layout/MainLayout';
import Dataset from 'src/pages/Datasets/components/DatasetPage/DatasetPage';
import DatasetVersion from 'src/pages/Datasets/components/DatasetPage/components/DatasetVersionPage/DatasetVersionPage';
import Login from 'src/pages/Login';
import Invalid404 from 'src/pages/invalid404';
import Compare from 'src/pages/Compare';
import StoryStatus from 'src/pages/TallulahStorySolicit/components/StoryStatus/StoryStatusTable';
import SocialSearchResults from 'src/pages/TallulahStorySolicit/components/RunSearch/RunSearch';
import StoryViaVideo from 'src/pages/StoryViaVideo';
import StoryViaAudio from 'src/pages/StoryViaAudio';
import TranslateToStructured from 'src/pages/TranslateToStructured';
import ContentGeneration from 'src/pages/TallulahContentGeneration/ContentGeneration';
import ContentGenerationForm from 'src/pages/TallulahContentGeneration/ContentGenerationForm';

// const Home = Loadable(lazy(async () => await import('src/pages/home')));
const DataModel = Loadable(lazy(async () => await import('src/pages/DataModel')));
const PAG = Loadable(lazy(async () => await import('src/pages/PAG')));
const Datasets = Loadable(lazy(async () => await import('src/pages/Datasets')));
const ComparePage = Loadable(lazy(async () => await import('src/pages/Compare')));
const TallulahSearch = Loadable(lazy(async () => await import('src/pages/TallulahSearch')));
const TallulahStoryAssistant = Loadable(lazy(async () => await import('src/pages/TallulahStoryAssistant')));
const TallulahDashboard = Loadable(lazy(async () => await import('src/pages/TallulahDashboard')));
const SocialSearch = Loadable(lazy(async () => await import('src/pages/TallulahSocialSearch')));
const PatientIntake = Loadable(lazy(async () => await import('src/pages/TallulahPatientIntake')));
const TallulahStorySolicit = Loadable(lazy(async () => await import('src/pages/TallulahStorySolicit')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <TallulahDashboard />
    },
    {
      path: 'home',
      element: <TallulahDashboard />
    },
    {
      path: 'tallulah-search',
      element: <TallulahSearch />
    },
    {
      path: 'tallulah-copy-assistant',
      element: <TallulahStoryAssistant />
    },
    {
      path: 'tallulah-dashboard',
      element: <TallulahDashboard />
    },
    {
      path: 'tallulah-social-search',
      element: <SocialSearch />
    },
    {
      path: 'tallulah-patient-intake',
      element: <PatientIntake />
    },
    {
      path: 'tallulah-find-stories',
      element: <TallulahStorySolicit />
    },
    {
      path: 'tallulah-find-stories/story-status',
      element: <StoryStatus />
    },
    {
      path: 'tallulah-find-stories/search',
      element: <SocialSearchResults />
    },
    {
      path: 'tallulah-video-story',
      element: <StoryViaVideo />
    },
    {
      path: 'tallulah-audio-story',
      element: <StoryViaAudio />
    },
    {
      path: 'translate-to-structured-data',
      element: <TranslateToStructured />
    },
    {
      path: 'content-generation-form',
      element: <ContentGenerationForm />
    },
    {
      path: 'content-generation',
      element: <ContentGeneration />
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
