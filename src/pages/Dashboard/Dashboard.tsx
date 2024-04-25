import { Box } from '@mui/material';
import styles from './Dashboard.module.css';
import PatientStoryDashboard from './components/PatientStoryDashboard';

export interface IDashboard {}

const Dashboard: React.FC<IDashboard> = ({}) => {
  return (
    <Box>
      <PatientStoryDashboard />
    </Box>
  );
};

export default Dashboard;
