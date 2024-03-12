import { useEffect, useState } from 'react';
import { Box, Button, Menu, MenuItem, Modal, Typography } from '@mui/material';
import PatientImage from 'src/assets/images/users/avatar-3.png';
import { formatReceivedTimeFull } from 'src/utils/helper';
import { FormDataService, FormMediaTypes } from 'src/tallulah-ts-client';
import styles from './PatientDetailViewModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import DeleteConfirmationModal from 'src/components/DeleteConfirmationModal';
import useNotification from 'src/hooks/useNotification';

export interface IPatientDetailViewModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: any;
  handleRefresh: () => void;
}

const mediaTypes = ['FILE', 'IMAGE', 'VIDEO'];

const PatientDetailViewModal: React.FC<IPatientDetailViewModal> = ({ openModal, handleCloseModal, data, handleRefresh }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');

  const profileImageId =
    data?.values.profilePicture?.value && data?.values.profilePicture?.value.length > 0 ? data?.values.profilePicture.value[0].id : null;
  const [mediaDetails, setMediaDetails] = useState<any>({});

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const [sendNotification] = useNotification();

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = async () => {
    setOpenDeleteModal(false);
    try {
      await FormDataService.deleteFormData(data._id);
      sendNotification({
        msg: 'Story removed successfully',
        variant: 'success'
      });
      handleRefresh();
    } catch (error) {
      console.log(error);
      sendNotification({
        msg: 'Failed to remove story',
        variant: 'error'
      });
    }

    handleCloseModal();
    handleCloseDeleteModal();
  };

  const openOptionsMenu = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionsMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteClick = () => {
    handleClose();
    setOpenDeleteModal(true);
  };

  const {
    firstName,
    lastName,
    age,
    location,
    diseaseType,
    storyTags,
    patientStory,
    profilePicture,
    consent,
    'gender-other': genderOther,
    ...rest
  } = data?.values;

  const fetchProfileImage = async (id: any, type: string) => {
    const mediaType = type === 'FILE' ? FormMediaTypes.FILE : type === 'IMAGE' ? FormMediaTypes.IMAGE : FormMediaTypes.VIDEO;
    try {
      const res = await FormDataService.getDownloadUrl(id, mediaType);
      setProfileImageUrl(res.url);
    } catch (err) {
      setProfileImageUrl('');
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

    if (profileImageId) {
      fetchProfileImage(profileImageId, 'IMAGE');
    }
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem'
          }}
        >
          <Button
            id="basic-button"
            aria-controls={openOptionsMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openOptionsMenu ? 'true' : undefined}
            onClick={handleOptionsMenuClick}
            variant="outlined"
          >
            Actions
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openOptionsMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
            onClose={handleClose}
          >
            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          </Menu>
          <CloseIcon
            onClick={handleCloseModal}
            sx={{
              cursor: 'pointer'
            }}
          />
        </Box>

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
                {data?.values?.diseaseType ? <Typography>Disease Type : {data?.values?.diseaseType?.value}</Typography> : null}
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
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <Typography
              variant="body1"
              sx={{
                padding: '10px',
                backgroundColor: data?.values.consent?.value[0] === 'Yes' ? '#78bf92' : '#eba865'
              }}
            >
              Date of Data Use Consent :{' '}
              {data?.values.consent?.value[0] === 'Yes'
                ? formatReceivedTimeFull(data?.creation_time)
                : data?.values.consent?.value[0] === 'No'
                ? 'No'
                : 'Pending '}
            </Typography>
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
                    {key === 'gender' && genderOther && genderOther?.value && (
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
                        ( {genderOther?.value} )
                      </Typography>
                    )}
                  </Box>
                </Box>
              )
            )
          }
        </Box>
        <DeleteConfirmationModal
          openDeleteModal={openDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleDelete={handleDelete}
        />
      </Box>
    </Modal>
  );
};

export default PatientDetailViewModal;
