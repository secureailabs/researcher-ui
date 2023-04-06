import { useState } from 'react';
import { Grid } from '@mui/material';
import SectionCard from 'src/components/card/sectioncard';
import CohortSelection from './components/CohortSelection';
import FeatureExtraction from './components/FeatureExtraction';
import Analysis from './components/Analysis';

// types
import {
  type TOperatorString,
  type IFilter,
} from 'src/shared/types/customTypes';

// styles
import styles from './Home.module.css';

const Home: React.FC = () => {
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [filterOperator, setFilterOperator] = useState<TOperatorString[]>([]);

  const handleFilterChange = (data: IFilter[]): void => {
    setFilters(data);
  };

  const handleFilterOperatorChange = (data: TOperatorString[]): void => {
    setFilterOperator(data);
  };

  return (
    <Grid container spacing={2} className={styles.container}>
      {/* Feature Extraction */}
      <Grid item xs={12}>
        <SectionCard>
          <FeatureExtraction />
        </SectionCard>
      </Grid>
      {/* Cohort Selection */}
      <Grid item xs={12}>
        <SectionCard>
          <CohortSelection
            handleChildFilterChange={handleFilterChange}
            handleChildFilterOperatorChange={handleFilterOperatorChange}
          />
        </SectionCard>
      </Grid>
      {/* Analysis */}
      <Grid item xs={12}>
        <SectionCard>
          <Analysis filters={filters} filterOperator={filterOperator} />
        </SectionCard>
      </Grid>
    </Grid>
  );
};

export default Home;
