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

const mediaTypes = ['FILE', 'IMAGE', 'VIDEO'];

const PatientDetailViewModal: React.FC<IPatientDetailViewModal> = ({ openModal, handleCloseModal, data }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const profileImageId = data?.values.profilePicture?.value ? data?.values.profilePicture.value[0].id : null;
  const [mediaDetails, setMediaDetails] = useState<any>({});

  const { firstName, lastName, age, location, diseaseType, storyTags, patientStory, profilePicture, ...rest } = data?.values;

  const fetchProfileImage = async (id: any, type: string) => {
    const mediaType = type === 'FILE' ? FormMediaTypes.FILE : type === 'IMAGE' ? FormMediaTypes.IMAGE : FormMediaTypes.VIDEO;
    try {
      const res = await FormDataService.getDownloadUrl(id, mediaType);
      setProfileImageUrl(res.url);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetchMediaUrls() {
      const newMediaDetails: any = {};

      // Fetch and store media URLs in newMediaDetails
      for (const key of Object.keys(rest)) {
        if (mediaTypes.includes(data.values[key].type)) {
          for (const media of data.values[key].value) {
            const mediaType =
              data.values[key].type === 'FILE'
                ? FormMediaTypes.FILE
                : data.values[key].type === 'IMAGE'
                ? FormMediaTypes.IMAGE
                : FormMediaTypes.VIDEO;
            try {
              const res = await FormDataService.getDownloadUrl(media.id, mediaType);
              newMediaDetails[media.id] = {
                url: res.url,
                type: data.values[key].type,
                name: media.name
              };
            } catch (err) {
              console.error(err);
            }
          }
        }
      }

      setMediaDetails(newMediaDetails);
    }

    fetchMediaUrls();
    fetchProfileImage(profileImageId, 'IMAGE');
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
                {data.values.firstName?.value} {data.values.lastName?.value}
              </Typography>
              <Typography variant="body1" className={styles.age}>
                Age : {data?.values.age?.value} years
                <Typography>Location : {data?.values.zipCode?.value}</Typography>
                <Typography>Disease Type : {data?.values.diseaseType?.value}</Typography>
              </Typography>
            </Box>
            <Box>
              {/* display image  */}
              <img src={profileImageUrl ? profileImageUrl : PatientImage} alt="Patient Image" className={styles.profileImage} />
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
            {convertTagsStringToArray(data?.values?.storyTags?.value).map((tag: string) => (
              <Box className={styles.tag} key={tag}>
                {tag}
              </Box>
            ))}
          </Box>
          <Box className={styles.section1}>
            <Box>
              <Typography variant="body1" className={styles.label}>
                Journey
              </Typography>
              <Typography variant="body1" className={styles.value}>
                {data.values.patientStory.value}
              </Typography>
            </Box>
          </Box>
          {
            // rest of the data
            Object.keys(rest).map((key: any) =>
              mediaTypes.includes(data.values[key].type) ? (
                <Box className={styles.section1} key={key}>
                  <Box>
                    <Typography variant="body1" className={styles.label}>
                      {rest[key].label}
                    </Typography>
                    <Box>
                      {rest[key].value.map((media: any) => (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            gap: '2rem'
                          }}
                        >
                          {data.values[key].type === 'IMAGE' ? (
                            <img src={mediaDetails[media.id]?.url} alt="Patient Media" className={styles.image} />
                          ) : data.values[key].type === 'VIDEO' ? (
                            <video src={mediaDetails[media.id]?.url} controls className={styles.video} />
                          ) : (
                            <Typography
                              variant="body1"
                              className={styles.value}
                              sx={{
                                marginY: '5px'
                              }}
                            >
                              <a href={mediaDetails[media.id]?.url} target="_blank" rel="noreferrer">
                                {mediaDetails[media.id]?.name}
                              </a>
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box className={styles.section1} key={key}>
                  <Box>
                    <Typography variant="body1" className={styles.label}>
                      {rest[key].label}
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
                      {rest[key].value}
                    </Typography>
                  </Box>
                </Box>
              )
            )
          }
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientDetailViewModal;
