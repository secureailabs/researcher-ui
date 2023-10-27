import { Box } from '@mui/material';
import styles from './TallulahEmailResponseTemplate.module.css';
import TemplateResponseListSection from './components/TemplateResponseListSection';

export interface ITallulahEmailResponseTemplate {}

const TallulahEmailResponseTemplate: React.FC<ITallulahEmailResponseTemplate> = ({}) => {
  return (
    <Box>
      <Box>
        <TemplateResponseListSection />
      </Box>
    </Box>
  );
};

export default TallulahEmailResponseTemplate;
