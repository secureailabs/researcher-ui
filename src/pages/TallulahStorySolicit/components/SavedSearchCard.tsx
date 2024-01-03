import { Box, Stack, Typography } from '@mui/material';
import styles from '../../TallulahSearch/components/PatientCard/PatientCard.module.css';
import PatientImage from 'src/assets/images/users/sample-face-image-1.png';

export interface IPatientCard {
  data: any;
}

const SavedSearchCard: React.FC<IPatientCard> = ({ data }) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.cardHeaderLayout}>
        <Box>
          <Typography variant="h6" className={styles.name}>
            {data.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1rem',
              marginTop: '1rem',
            }}
          >
            {data.tags.map((tag: string) => (
              <Box className={styles.tag}>{tag}</Box>
            ))}
          </Box>
          <Typography variant="body1" className={styles.age} gutterBottom>
            Alert Frequency: {data.alert_frequency}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SavedSearchCard;
