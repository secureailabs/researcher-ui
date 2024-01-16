import { useEffect, useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import PatientImage from 'src/assets/images/users/avatar-3.png';
import { convertTagsStringToArray } from 'src/utils/helper';
import { FormDataService, FormMediaTypes } from 'src/tallulah-ts-client';
import styles from './PatientDetailViewModal.module.css';

export interface IPatientDetailViewModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: any;
}

const PatientDetailViewModal: React.FC<IPatientDetailViewModal> = ({ openModal, handleCloseModal, data }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const profileImageId = data?.values.profilePicture ? data?.values.profilePicture[0] : null;

  const { fullName, age, location, diseaseType, storyTags, patientStory, profilePicture, ...rest } = data?.values;

  const fetchProfileImage = async () => {
    try {
      const res = await FormDataService.getDownloadUrl(profileImageId, FormMediaTypes.IMAGE);
      setProfileImageUrl(res.url);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfileImage();
    return () => {
      setProfileImageUrl('');
    };
  }, [data]);

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          outline: 'none',
          width: '1000px',
          overflowY: 'scroll',
          height: '600px',
          backgroundColor: '#fff'
        }}
      >
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
          {
            // rest of the data
            Object.keys(rest).map((key) => (
              <Box className={styles.section1}>
                <Box>
                  <Typography variant="body1" className={styles.label}>
                    {key}
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
                    {rest[key]}
                  </Typography>
                </Box>
              </Box>
            ))
          }
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientDetailViewModal;
