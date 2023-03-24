import { Box } from '@mui/material';
import SectionCard from 'src/components/card/sectioncard';
import FeatureExtraction from 'src/pages/home/components/FeatureExtraction';

const Home: React.FC = () => {
  return (
    <Box>
      <SectionCard>
        <FeatureExtraction />
        </SectionCard>
    </Box>
  );
}

export default Home;
