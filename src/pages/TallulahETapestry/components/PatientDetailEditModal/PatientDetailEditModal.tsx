import { useEffect, useState } from 'react';
import PatientImage from 'src/assets/images/users/avatar-3.png';
import { formatReceivedTimeFull } from 'src/utils/helper';
import {
  EtapestryDataService,
  FormDataService,
  FormMediaTypes,
  FormTemplatesService,
  GetMultipleFormTemplate_Out,
  MediaService
} from 'src/tallulah-ts-client';
import styles from './PatientDetailEditModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import DeleteConfirmationModal from 'src/components/DeleteConfirmationModal';
import useNotification from 'src/hooks/useNotification';
import {
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Typography,
  CircularProgress,
  Divider,
  Modal
} from '@mui/material';
import { set } from 'react-hook-form';
import ImageUpload from '../ImageUpload';
import VideoUpload from '../VideoUpload';
import axios from 'axios';

export interface IPatientDetailEditModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: any;
  handleParentClose: () => void;
}

export type TImageFileUpload = {
  fieldName: string;
  files: File[];
};

export type TMediaFileUpload = {
  fieldName: string;
  files: File[];
};

const ImageFile: React.FC<{ imageId: string; handleRemovePhoto: any }> = ({ imageId, handleRemovePhoto }) => {
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
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          right: '0'
        }}
      >
        {/* add a close icon with absolute position */}
        <CloseIcon
          onClick={handleRemovePhoto}
          sx={{
            cursor: 'pointer'
          }}
        />
      </Box>
      <img src={imageUrl} alt="patient" className={styles.image} />
    </Box>
  );
};

const ImageViewComponent: React.FC<{ imageFiles: string[]; handleRemovePhoto: any }> = ({ imageFiles, handleRemovePhoto }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        marginTop: '1rem'
      }}
    >
      {imageFiles.map((image) => (
        <ImageFile key={image} imageId={image} handleRemovePhoto={handleRemovePhoto} />
      ))}
    </Box>
  );
};

const VideoFile: React.FC<{ videoId: string; handleRemoveVideo: any }> = ({ videoId, handleRemoveVideo }) => {
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
          onClick={handleRemoveVideo}
          sx={{
            cursor: 'pointer'
          }}
        />
      </Box>
      <video src={videoUrl} controls className={styles.image} />
    </Box>
  );
};

const VideoViewComponent: React.FC<{ videoFiles: string[]; handleRemoveVideo: any }> = ({ videoFiles, handleRemoveVideo }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        marginTop: '1rem'
      }}
    >
      {videoFiles.map((video) => (
        <VideoFile key={video} videoId={video} handleRemoveVideo={handleRemoveVideo} />
      ))}
    </Box>
  );
};

const PatientDetailEditModal: React.FC<IPatientDetailEditModal> = ({ openModal, handleCloseModal, data, handleParentClose }) => {
  const [sendNotification] = useNotification();

  const [tags, setTags] = useState<string>();
  const [notes, setNotes] = useState<string>();
  const [savedPhotosList, setSavedPhotosList] = useState<string[]>(data?.photos || []);
  const [savedVideosList, setSavedVideosList] = useState<string[]>(data?.videos || []);
  const [imageFiles, setImageFiles] = useState<TImageFileUpload[]>([]);
  const [videoFiles, setVideoFiles] = useState<TMediaFileUpload[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleMediaUpload = async (file: any, mediaType: FormMediaTypes) => {
    const res = await MediaService.getMediaUploadUrl(mediaType);
    const { id, url } = res;

    const uploadResponse = await axios({
      method: 'PUT',
      url: url,
      data: file,
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': file.type
      }
    });

    if (!uploadResponse) {
      throw new Error('Failed to upload media');
    }

    return { id, fileType: file.type, fileName: file.name };
  };

  const updateETapestryData = async () => {
    setIsLoading(true);

    const mediaUploadPromises: any[] = [];

    imageFiles[0].files.forEach((file: any) => {
      mediaUploadPromises.push(handleMediaUpload(file.file, FormMediaTypes.IMAGE));
    });

    const videoMediaUploadPromises: any[] = [];

    videoFiles[0].files.forEach((file: any) => {
      videoMediaUploadPromises.push(handleMediaUpload(file.file, FormMediaTypes.VIDEO));
    });

    try {
      const res = await EtapestryDataService.updateEtapestryData(data.id, {
        notes: notes,
        tags: tags?.split(',').map((tag) => tag.trim()) || [],
        photos: [...savedPhotosList, ...(await Promise.all(mediaUploadPromises)).map((media) => media.id)],
        videos: [...savedVideosList, ...(await Promise.all(videoMediaUploadPromises)).map((media) => media.id)]
      });
      sendNotification({
        msg: 'Patient details updated successfully.',
        variant: 'success'
      });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleSubmitClicked = () => {
    updateETapestryData();
  };

  useEffect(() => {
    if (data) {
      // create comma separated tags from array
      if (data.tags) {
        setTags(data.tags.join(', '));
      }
      if (data.notes) {
        setNotes(data.notes);
      }
    }
  }, [data]);

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
      <CloseIcon
        onClick={handleCloseModal}
        sx={{
          cursor: 'pointer'
        }}
      />
    </Box>
  );

  const handleRemovePhoto = (photoId: string) => {
    const updatedPhotosList = savedPhotosList.filter((photo) => photo !== photoId);
    setSavedPhotosList(updatedPhotosList);
  };

  const handleRemoveVideo = (videoId: string) => {
    const updatedVideosList = savedVideosList.filter((video) => video !== videoId);
    setSavedVideosList(updatedVideosList);
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box className={styles.container}>
        {renderModalCardHeader}
        <Typography
          variant="h5"
          sx={{
            paddingLeft: '1rem'
          }}
        >
          Edit Details
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '1rem',
            bottom: '0',
            width: '100%'
          }}
        >
          <TextField
            name={'tags'}
            fullWidth
            className={styles.inputStyle}
            type="text"
            placeholder={'Tags'}
            required={false}
            variant="outlined"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            label={'Tags'}
          />

          <Typography>Notes</Typography>
          <TextField
            name={'notes'}
            fullWidth
            multiline
            rows={6}
            placeholder={'Notes'}
            required={false}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            sx={{
              width: '100%'
            }}
            value={notes}
          />

          <Box
            sx={{
              width: '100%',
              marginBottom: '1rem'
            }}
          >
            <Box>Image</Box>
            <ImageUpload fieldName="photos" setImageFiles={setImageFiles} />
            {savedPhotosList && savedPhotosList.length > 0 && (
              <ImageViewComponent imageFiles={savedPhotosList} handleRemovePhoto={handleRemovePhoto} />
            )}
          </Box>
          <Box
            sx={{
              width: '100%'
            }}
          >
            <VideoUpload fieldName="videos" setVideoFiles={setVideoFiles} />
            {savedVideosList && savedVideosList.length > 0 && (
              <VideoViewComponent videoFiles={savedVideosList} handleRemoveVideo={handleRemoveVideo} />
            )}
          </Box>

          {isLoading && (
            <Box
              className={styles.loading}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircularProgress />
            </Box>
          )}

          <Button variant="contained" color="primary" sx={{ margin: '1rem' }} fullWidth onClick={handleSubmitClicked}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientDetailEditModal;
