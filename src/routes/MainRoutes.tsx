import { lazy } from 'react';
import Loadable from 'src/components/extended/Loadable';
import MainLayout from 'src/components/layout/MainLayout';
import ResetPassword from 'src/pages/AdminPages/ResetPassword';
import ContentGeneration from 'src/pages/TallulahContentGeneration/ContentGeneration';
import ContentGenerationForm from 'src/pages/TallulahContentGeneration/ContentGenerationForm';

const Home = Loadable(lazy(async () => await import('src/pages/Home')));
const TallulahSearch = Loadable(lazy(async () => await import('src/pages/TallulahSearch')));
const TallulahStoryAssistant = Loadable(lazy(async () => await import('src/pages/TallulahStoryAssistant')));
const TallulahDashboard = Loadable(lazy(async () => await import('src/pages/TallulahDashboard')));
const TallulahEmailAssistant = Loadable(lazy(async () => await import('src/pages/TallulahEmailAssistant')));
const MSAuthorize = Loadable(lazy(async () => await import('src/pages/MSAuthorize')));
const TallulahEmailResponseTemplate = Loadable(lazy(async () => await import('src/pages/TallulahEmailResponseTemplate')));
const PatientStoryForm = Loadable(lazy(async () => await import('src/pages/TallulahPatientStory/PatientStoryForm')));
const PatientStory = Loadable(lazy(async () => await import('src/pages/TallulahPatientStory/PatientStory')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home />,
      breadcrumb: 'Home'
    },
    {
      path: 'home',
      element: <Home />,
      breadcrumb: 'Home'
    },
    {
      path: 'tallulah-search',
      element: <TallulahSearch />,
      breadcrumb: 'Tallulah Search'
    },
    {
      path: 'tallulah-story-assistant',
      element: <TallulahStoryAssistant />,
      breadcrumb: 'Story Assistant'
    },
    {
      path: 'tallulah-dashboard',
      element: <TallulahDashboard />,
      breadcrumb: 'Dashboard'
    },
    {
      path: 'email-assistant',
      element: <TallulahEmailAssistant />,
      breadcrumb: 'Email Assistant'
    },
    {
      path: 'email-assistant/response-template',
      element: <TallulahEmailResponseTemplate />,
      breadcrumb: 'Response Template'
    },
    {
      path: 'mailbox/authorize',
      element: <MSAuthorize />
    },
    {
      path: 'patient-story-form',
      element: <PatientStoryForm />
    },
    {
      path: 'patient-story',
      element: <PatientStory />
    },
    {
      path: 'content-generation-form',
      element: <ContentGenerationForm />
    },
    {
      path: 'content-generation',
      element: <ContentGeneration />
    }
  ]
};

export default MainRoutes;
