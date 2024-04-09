import { GetPatientProfile_Out } from 'src/tallulah-ts-client';
import styles from './PatientCard.module.css';
import { Box, Typography } from '@mui/material';

export interface IPatientCard {
  data: GetPatientProfile_Out;
}

const PatientCard: React.FC<IPatientCard> = ({ data }) => {
  const fieldNamesToDisplay = [
    {
      name: 'Age',
      value: data.age
    },
    {
      name: 'Primary cancer diagnosis',
      value: data.primary_cancer_diagnosis
    },
    {
      name: 'Social worker name',
      value: data.social_worker_name
    },
    {
      name: 'Social worker organization',
      value: data.social_worker_organization
    },
    {
      name: 'Date of diagnosis',
      value: data.date_of_diagnosis
    }
  ];
  return (
    <Box className={styles.container}>
      <Typography variant="h5">{data.name}</Typography>
      {fieldNamesToDisplay.map((field) => (
        <Box className={styles.valueContainer}>
          <Typography variant="body1" className={styles.label}>
            {field.name}
          </Typography>
          <Typography variant="body1" className={styles.value}>
            {field.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PatientCard;
