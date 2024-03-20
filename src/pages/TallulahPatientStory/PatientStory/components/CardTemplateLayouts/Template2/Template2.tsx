import { useEffect, useState } from 'react';
import { ICard } from '../../CardTemplates/CardTemplates';
import { FormDataService, FormMediaTypes } from 'src/tallulah-ts-client';
import { Box, Typography } from '@mui/material';
import styles from './Template2.module.css';
import PatientImage from 'src/assets/images/users/avatar-3.png';

const fieldNamesToDisplay = ['name', 'age', 'gender', 'disease_stage', 'disease_type', 'profilePicture', 'tags', 'patientStory'];
const skipFieldNames = ['profilePicture', 'tags', 'name', 'firstName', 'lastName'];

const Template2: React.FC<ICard> = ({ data }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const profileImageId =
    data?.values.profilePicture?.value && data?.values.profilePicture?.value.length > 0 ? data?.values.profilePicture.value[0].id : null;

  const fetchProfileImage = async () => {
    if (!profileImageId) return;
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
      <Box>
        {/* display data */}
        <Box className={styles.cardHeaderLayout}>
          <Box>
            {data.values.firstName ? (
              <Typography variant="h6" className={styles.name}>
                {data.values.firstName?.value} {data.values.lastName?.value}
              </Typography>
            ) : data.values.name ? (
              <Typography variant="h6" className={styles.name}>
                {data.values?.name?.value}
              </Typography>
            ) : null}
          </Box>
          <Box>
            {/* display image  */}
            <img src={profileImageUrl ? profileImageUrl : PatientImage} alt="Patient Image" className={styles.image} />
          </Box>
        </Box>
        {fieldNamesToDisplay.map((fieldName) => {
          if (skipFieldNames.includes(fieldName)) {
            return null;
          }
          return (
            <Box className={styles.valueContainer}>
              <Typography variant="body1" className={styles.label}>
                {data.values[fieldName]?.label ? data.values[fieldName]?.label : 'n/a'}
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
                {data.values[fieldName]?.value ? data.values[fieldName]?.value : 'n/a'}
              </Typography>
            </Box>
          );
        })}
        {/* display tags */}
        <Box className={styles.section1}>
          {data?.values && 'tags' in data?.values && fieldNamesToDisplay.includes('tags') ? (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '1rem',
                marginTop: '1rem'
              }}
            >
              {convertTagsStringToArray(data?.values?.tags?.value).map((tag: string) => (
                <Box className={styles.tag}>{tag}</Box>
              ))}
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Template2;
