import { useEffect, useState } from 'react';
import { Box, Button, Menu, MenuItem, Modal, Typography } from '@mui/material';
import styles from './PatientProfileViewModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import useNotification from 'src/hooks/useNotification';
import DeleteConfirmationModal from 'src/components/DeleteConfirmationModal';
import {
  PatientProfilesService,
  GetPatientProfile_Out,
  MediaService,
  FormMediaTypes,
  ContentGenerationTemplatesService,
  ContentGenerationsService,
  RegisterContentGeneration_In
} from 'src/tallulah-ts-client';
import EditPatientProfileModal from '../EditPatientProfileModal';
import { set } from 'react-hook-form';

export interface IPatientProfileViewModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: GetPatientProfile_Out;
  handleRefresh: () => void;
}

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

const mediaTypes = ['FILE', 'IMAGE', 'VIDEO'];

const convertTagsStringToArray = (tags: string | undefined) => {
  if (!tags) return [];
  return tags.split(',');
};

const PatientProfileViewModal: React.FC<IPatientProfileViewModal> = ({ openModal, handleCloseModal, data, handleRefresh }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [mediaDetails, setMediaDetails] = useState<any>({});
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openContentGenerationModal, setOpenContentGenerationModal] = useState<boolean>(false);

  const [sendNotification] = useNotification();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openOptionsMenu = Boolean(anchorEl);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

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

  const handleContentGenerationClick = async () => {
    handleClose();
    await handleContentGeneration();
  };

  const handleContentGeneration = async () => {
    setOpenContentGenerationModal(false);
    try {
      const content_generation_templates = await ContentGenerationTemplatesService.getAllContentGenerationTemplates();
      if (content_generation_templates.templates.length === 0) {
        sendNotification({
          msg: 'No content generation templates found',
          variant: 'error'
        });
        return;
      }

      const template_id = content_generation_templates.templates[0].id;
      console.log(data);
      const generation_values: any = { ...data, diagnosis: 'Cancer', guardian: data?.guardians[0].name };
      delete generation_values.guardians;
      delete generation_values.id;
      delete generation_values.creation_time;
      delete generation_values.organization_id;
      delete generation_values.owner_id;
      delete generation_values.state;
      delete generation_values.repository_id;
      delete generation_values.patient_id;

      const content_generation_req: RegisterContentGeneration_In = {
        template_id,
        values: generation_values
      };
      await ContentGenerationsService.createContentGeneration(content_generation_req);

      sendNotification({
        msg: 'Content generation request sent successfully',
        variant: 'success'
      });
    } catch (error) {
      sendNotification({
        msg: 'Failed to generate content',
        variant: 'error'
      });
    }
    handleCloseModal();
  };

  const handleDelete = async () => {
    setOpenDeleteModal(false);
    try {
      await PatientProfilesService.deletePatientProfile(data.id);
      sendNotification({
        msg: 'Removed successfully',
        variant: 'success'
      });
      handleRefresh();
    } catch (error) {
      console.log(error);
      sendNotification({
        msg: 'Failed to remove',
        variant: 'error'
      });
    }

    handleCloseModal();
    handleCloseDeleteModal();
  };

  const handleEditClicked = () => {
    setOpenEditModal(true);
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
        <MenuItem onClick={handleEditClicked}>Edit</MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteClick();
            handleClose();
          }}
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleContentGenerationClick();
            handleClose();
          }}
        >
          Generate Story
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

  const renderModalCardContent = (
    <Box className={styles.container}>
      <Box>
        <Typography variant="h6" className={styles.label}>
          Name
        </Typography>
        <Typography variant="body1">{data.name}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Age
        </Typography>
        <Typography variant="body1">{data.age}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Primary cancer diagnosis
        </Typography>
        <Typography variant="body1">{data.primary_cancer_diagnosis || 'N/A'}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Social worker name
        </Typography>
        <Typography variant="body1">{data.social_worker_name || 'N/A'}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Social worker organization
        </Typography>
        <Typography variant="body1">{data.social_worker_organization || 'N/A'}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Date of diagnosis
        </Typography>
        <Typography variant="body1">{data.date_of_diagnosis || 'N/A'}</Typography>
      </Box>
      {data.guardians &&
        data.guardians.length > 0 &&
        data.guardians.map((guardian: any) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '2rem',
              marginTop: '1rem'
            }}
          >
            <Box>
              <Typography variant="h6" className={styles.label}>
                Guardian Name
              </Typography>
              <Typography variant="body1">{guardian.name}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" className={styles.label}>
                Relationship
              </Typography>
              <Typography variant="body1">{guardian.relationship}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" className={styles.label}>
                Contact
              </Typography>
              <Typography variant="body1">{guardian.phone}</Typography>
            </Box>
          </Box>
        ))}
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Household details
        </Typography>
        <Typography variant="body1">{data.household_details || 'N/A'}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Family net income
        </Typography>
        <Typography variant="body1">{data.family_net_monthly_income || 'N/A'}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Address
        </Typography>
        <Typography variant="body1">{data.address || 'N/A'}</Typography>
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
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Notes
        </Typography>
        <Typography variant="body1">{data.notes || 'N/A'}</Typography>
      </Box>
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
        <DeleteConfirmationModal
          openDeleteModal={openDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleDelete={handleDelete}
        />
        <EditPatientProfileModal
          openModal={openEditModal}
          handleCloseModal={() => setOpenEditModal(false)}
          data={data}
          handleRefresh={handleRefresh}
        />
      </Box>
    </Modal>
  );
};

export default PatientProfileViewModal;
