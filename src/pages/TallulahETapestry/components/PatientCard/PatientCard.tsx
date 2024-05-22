import { GetETapestryData_Out, GetPatientProfile_Out } from 'src/tallulah-ts-client';
import styles from './PatientCard.module.css';
import { Box, Typography } from '@mui/material';

export interface IPatientCard {
  data: GetETapestryData_Out;
}

const PatientCard: React.FC<IPatientCard> = ({ data }) => {
  const fieldNamesToDisplay = [
    {
      name: 'Email',
      value: data.account.email
    },
    {
      name: 'City',
      value: data.account.city
    },
    {
      name: 'Country',
      value: data.account.country
    }
  ];

  return (
    <Box className={styles.container}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        {data.account.name}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1rem',
          marginTop: '1rem'
        }}
      >
        {data?.tags && (data?.tags).map((tag: string) => <Box className={styles.tag}>{tag}</Box>)}
      </Box>
      {fieldNamesToDisplay.map((field) => (
        <Box className={styles.valueContainer}>
          <Typography variant="body1" className={styles.label}>
            {field.name}
          </Typography>
          <Typography variant="body1" className={styles.value}>
            {field.value || 'N/A'}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PatientCard;
