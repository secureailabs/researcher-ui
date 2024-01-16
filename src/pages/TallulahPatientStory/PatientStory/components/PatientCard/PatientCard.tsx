import { Box, Typography } from '@mui/material';
import styles from './PatientCard.module.css';
import PatientImage from 'src/assets/images/users/avatar-3.png';
import { useEffect, useState } from 'react';
import { FormDataService, FormMediaTypes } from 'src/tallulah-ts-client';

export interface IPatientCard {
  data: any;
}

const PatientCard: React.FC<IPatientCard> = ({ data }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const profileImageId = data?.values.profilePicture ? data?.values.profilePicture[0] : null;

  const fetchProfileImage = async () => {
    try {
      const res = await FormDataService.getDownloadUrl(profileImageId, FormMediaTypes.IMAGE);
      setProfileImageUrl(res.url);
    } catch (err) {
      console.log(err);
    }
  };

  const convertTagsStringToArray = (tags: string | undefined) => {
    if (!tags) return [];

    return tags.split(',');
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  return (
    <Box className={styles.container}>
      {/* Patient Details */}
      <Box className={styles.cardHeaderLayout}>
        <Box>
          <Typography variant="h6" className={styles.name}>
            {data.values.fullName}
          </Typography>
          <Typography variant="body1" className={styles.age}>
            Age : {data?.values.age} years
            <Typography>Location : {data?.values.cityState}</Typography>
            <Typography>Disease Type : {data?.values.diseaseType}</Typography>
          </Typography>
        </Box>
        <Box>
          {/* display image  */}
          <img src={profileImageUrl ? profileImageUrl : PatientImage} alt="Patient Image" className={styles.image} />
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
        {convertTagsStringToArray(data?.values?.storyTags).map((tag: string) => (
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
            {data.values.patientStory}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientCard;
