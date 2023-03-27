import { Grid } from '@mui/material';
import SectionCard from 'src/components/card/sectioncard';
import CohortSelection from './components/CohortSelection';
import FeatureExtraction from './components/FeatureExtraction';
import Analysis from './components/Analysis';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <Grid container spacing={2} className={styles.container}>
      <Grid item xs={12}>
        <SectionCard>
          <FeatureExtraction />
        </SectionCard>
      </Grid>
      <Grid item xs={12}>
        <SectionCard>
          <CohortSelection />
        </SectionCard>
      </Grid>
      <Grid item xs={12}>
        <SectionCard>
          <Analysis sampleTextProp={''} />
        </SectionCard>
      </Grid>
    </Grid>
  );
};

export default Home;
