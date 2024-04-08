import { GetPatientProfile_Out } from 'src/tallulah-ts-client';
import styles from './PatientCard.module.css';
import { Box, Typography } from '@mui/material';

export interface IPatientCard {
  data: GetPatientProfile_Out;
}

const PatientCard: React.FC<IPatientCard> = ({ data }) => {
  return (
    <Box className={styles.container}>
      <Typography variant="h5">{data.name}</Typography>
      <Typography variant="body2">Age : {data.age}</Typography>
      <Typography variant="body2">Primary cancer diagnosis: {data.primary_cancer_diagnosis || 'N/A'}</Typography>
      <Typography variant="body2">Social worker name: {data.social_worker_name || 'N/A'}</Typography>
      <Typography variant="body2">Social worker organization: {data.social_worker_organization || 'N/A'}</Typography>
      <Typography variant="body2">Date of diagnosis: {data.date_of_diagnosis || 'N/A'}</Typography>
    </Box>
  );
};

export default PatientCard;
