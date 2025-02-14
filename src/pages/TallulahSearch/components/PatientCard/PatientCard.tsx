import { Box, Typography } from '@mui/material';
import styles from './PatientCard.module.css';
import PatientImage from 'src/assets/images/users/sample-face-image-1.png';

export interface IPatientCard {
  data: any;
}

const PatientCard: React.FC<IPatientCard> = ({ data }) => {
  return (
    <Box className={styles.container}>
      {/* Patient Details */}
      <Box className={styles.cardHeaderLayout}>
        <Box>
          <Typography variant="h6" className={styles.name}>
            {data._source.Name}
          </Typography>
          <Typography variant="body1" className={styles.age}>
            Age : {data?._source.Age} years
            <Typography>Location : {data?._source.location}</Typography>
          </Typography>
        </Box>
        <Box>
          {/* display image  */}
          <img src={require(`src/assets/images/users/${data._source.imageName}`)} alt="Patient Image" className={styles.image} />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1rem',
          marginTop: '1rem'
        }}
      >
        {data._source.Tags.map((tag: string) => (
          <Box className={styles.tag}>{tag}</Box>
        ))}
      </Box>
      <Box className={styles.section1}>
        <Box>
          <Typography variant="body1" className={styles.label}>
            Journey
          </Typography>
          <Typography
            variant="body1"
            className={styles.value}
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3
            }}
          >
            {data._source['Life Story']}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientCard;
