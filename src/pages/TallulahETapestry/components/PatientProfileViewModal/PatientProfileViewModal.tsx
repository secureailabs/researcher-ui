import { useEffect, useState } from 'react';
import { Box, Button, Divider, Menu, MenuItem, Modal, Typography } from '@mui/material';
import styles from './PatientProfileViewModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import useNotification from 'src/hooks/useNotification';
import { FormMediaTypes, GetETapestryData_Out, GetPatientProfile_Out, MediaService } from 'src/tallulah-ts-client';
import { convertcamelCaseToTitleCase } from 'src/utils/helper';
import PatientDetailEditModal from '../PatientDetailEditModal';

export interface IPatientProfileViewModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: GetETapestryData_Out;
  handleRefresh: () => void;
}

const mediaTypes = ['FILE', 'IMAGE', 'VIDEO'];

const convertTagsStringToArray = (tags: string | undefined) => {
  if (!tags) return [];
  return tags.split(',');
};

const ImageFile: React.FC<{ imageId: string }> = ({ imageId }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const fetchImageUrl = async (imageId: string) => {
    try {
      const res = await MediaService.getMediaDownloadUrl(imageId, FormMediaTypes.IMAGE);
      setImageUrl(res.url);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImageUrl(imageId);
  }, [imageId]);

  return (
    <Box
      sx={{
        position: 'relative'
      }}
    >
      <img src={imageUrl} alt="patient" className={styles.image} />
    </Box>
  );
};

const VideoFile: React.FC<{ videoId: string }> = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const fetchImageUrl = async (videoId: string) => {
    try {
      const res = await MediaService.getMediaDownloadUrl(videoId, FormMediaTypes.VIDEO);
      setVideoUrl(res.url);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImageUrl(videoId);
  }, [videoId]);

  return (
    <Box
      sx={{
        position: 'relative'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          right: '0'
        }}
      >
        {/* add a close icon with absolute position */}
        <CloseIcon
          onClick={() => {
            console.log('delete image');
          }}
          sx={{
            cursor: 'pointer'
          }}
        />
      </Box>
      <video src={videoUrl} controls className={styles.image} />
    </Box>
  );
};

const PatientProfileViewModal: React.FC<IPatientProfileViewModal> = ({ openModal, handleCloseModal, data, handleRefresh }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');

  const [mediaDetails, setMediaDetails] = useState<any>({});

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [sendNotification] = useNotification();

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const openOptionsMenu = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionsMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const renderModalCardHeader = (
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
        <MenuItem
          onClick={() => {
            setShowEditModal(true);
            handleClose();
          }}
        >
          Edit
        </MenuItem>
      </Menu>
      <CloseIcon
        onClick={handleCloseModal}
        sx={{
          cursor: 'pointer'
        }}
      />
    </Box>
  );

  const { defined_values, ...restAccounts } = data.account;
  type AccountKey = keyof typeof restAccounts;

  const renderModalCardContent = (
    <Box className={styles.container}>
      <Box className={styles.grid}>
        {Object.entries(restAccounts).map(([key]) => {
          const accountKey = key as AccountKey;
          if (key === 'defined_values') {
            return null;
          }
          return (
            <Box
              sx={{
                marginTop: '1rem'
              }}
            >
              <Typography variant="h6" className={styles.label}>
                {convertcamelCaseToTitleCase(key)}
              </Typography>
              <Typography variant="body1" className={styles.value}>
                {restAccounts[accountKey] || 'N/A'}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Divider />

      {defined_values && (
        <Box
          sx={{
            marginTop: '2rem'
          }}
        >
          <Typography variant="h5">Defined Values</Typography>
          <Box className={styles.grid}>
            {Object.entries(defined_values).map(([key, value]) => (
              <Box
                sx={{
                  marginTop: '1rem'
                }}
              >
                <Typography variant="body1" className={styles.label}>
                  {key}
                </Typography>
                <Typography variant="body1" className={styles.value}>
                  {value || 'N/A'}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Box
        sx={{
          marginTop: '2rem'
        }}
      >
        <Typography variant="h5">Tags</Typography>
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
      </Box>
      <Box>
        <Typography variant="h5">Notes</Typography>
        <Typography variant="body1">{data.notes || 'N/A'}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Photos
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginTop: '1rem'
          }}
        >
          {data.photos && data.photos.length > 0 && data.photos.map((photo: any) => <ImageFile imageId={photo} />)}
        </Box>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Videos
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginTop: '1rem'
          }}
        >
          {data.videos && data.videos.length > 0 && data.videos.map((video: any) => <VideoFile videoId={video} />)}
        </Box>
      </Box>
    </Box>
  );

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
          height: '90%',
          backgroundColor: '#fff'
        }}
      >
        {renderModalCardHeader}
        {renderModalCardContent}
        {
          <PatientDetailEditModal
            openModal={showEditModal}
            handleCloseModal={() => {
              setShowEditModal(false);
            }}
            data={data}
            handleParentClose={() => {}}
          />
        }
      </Box>
    </Modal>
  );
};

export default PatientProfileViewModal;
