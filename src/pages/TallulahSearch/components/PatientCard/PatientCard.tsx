import { Box, Typography } from '@mui/material';
import styles from './PatientCard.module.css';
import PatientImage from 'src/assets/images/users/sample-face-image-1.png';

export interface IPatientCard {
  data: any;
}

const PatientCard: React.FC<IPatientCard> = ({ data }) => {
  return (
    <Box
      className={styles.container}
      sx={[
        {
          border: '1px solid #439c5c'
        },
        data._source.storyUsed > 3
          ? {
              border: '1px solid #7096cc'
            }
          : {},
        data._source.storyUsed > 7
          ? {
              border: '1px solid #ff0000'
            }
          : {}
      ]}
    >
      {/* Patient Details */}
      <Box className={styles.cardHeaderLayout}>
        <Box>
          <Typography variant="h6" className={styles.name}>
            {data._source.Name}
          </Typography>
          <Typography variant="body1" className={styles.age}>
            {data._source.Age} years
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
            Life Story
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
      <Box className={styles.footer1}>
        <Typography
          variant="body1"
          sx={[
            {
              fontStyle: 'italic'
            },
            {
              color: '#439c5c'
            },
            data._source.storyUsed > 3
              ? {
                  color: '#7096cc'
                }
              : {},
            data._source.storyUsed > 7
              ? {
                  color: '#ff0000'
                }
              : {}
          ]}
        >
          Story Used : {data._source.storyUsed} times
        </Typography>
      </Box>
    </Box>
  );
};

export default PatientCard;
