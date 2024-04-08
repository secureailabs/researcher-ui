import { GetETapestryData_Out, GetPatientProfile_Out } from 'src/tallulah-ts-client';
import styles from './PatientCard.module.css';
import { Box, Typography } from '@mui/material';

export interface IPatientCard {
  data: GetETapestryData_Out;
}

const PatientCard: React.FC<IPatientCard> = ({ data }) => {
  return (
    <Box className={styles.container}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        {data.account.firstName} {data.account.lastName}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          wordBreak: 'break-word',
          whiteSpace: 'normal'
        }}
      >
        Email : {data.account.email}
      </Typography>
      <Typography variant="body1">
        Location : {data.account.city} {data.account.country}
      </Typography>
    </Box>
  );
};

export default PatientCard;
