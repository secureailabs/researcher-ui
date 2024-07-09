import {
  FormMediaTypes,
  GetPatientProfile_Out,
  MediaService,
  PatientProfilesService,
  UpdatePatientProfile_In
} from 'src/tallulah-ts-client';
import styles from './EditPatientProfileModal.module.css';
import { Box, Modal, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import ImageUpload from '../ImageUpload';
import { set } from 'react-hook-form';
import axios from 'axios';
import VideoUpload from '../VideoUpload';
import useNotification from 'src/hooks/useNotification';
export interface IEditPatientProfileModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: GetPatientProfile_Out;
  handleRefresh: () => void;
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
          onClick={() => {
            handleRemovePhoto(imageId);
          }}
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
          onClick={() => {
            handleRemoveVideo(videoId);
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

const EditPatientProfileModal: React.FC<IEditPatientProfileModal> = ({ openModal, handleCloseModal, data, handleRefresh }) => {
  const [patientData, setPatientData] = useState<GetPatientProfile_Out>(data);
  const [imageFiles, setImageFiles] = useState<TImageFileUpload[]>([]);
  const [videoFiles, setVideoFiles] = useState<TMediaFileUpload[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [savedPhotosList, setPhotos] = useState<string[]>(data.photos || []);
  const [savedVideosList, setVideos] = useState<string[]>(data.videos || []);

  const [sendNotification] = useNotification();

  const {
    id,
    patient_id,
    repository_id,
    photos,
    videos,
    tags,
    guardians,
    recent_requests,
    state,
    creation_time,
    organization_id,
    owner_id,
    ...rest
  } = data;

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

  const handleRemovePhoto = (photoId: string) => {
    console.log('removing photo', photoId);
    const updatedPhotosList = savedPhotosList.filter((photo) => photo !== photoId);
    setPhotos(updatedPhotosList);
  };

  const handleRemoveVideo = (videoId: string) => {
    const updatedVideosList = savedVideosList.filter((video) => video !== videoId);
    setVideos(updatedVideosList);
  };

  const modalContent = (
    <Box
      sx={{
        marginTop: '3rem',
        padding: '2rem'
      }}
    >
      {/* create editable fields for key/value in rest */}
      {data &&
        Object.entries(rest).map(([key, value]) => (
          <Box key={key}>
            <Box>
              <TextField
                name={key}
                defaultValue={value}
                fullWidth
                className={styles.inputStyle}
                type="text"
                label={key}
                onChange={(e) => {
                  setPatientData({
                    ...patientData,
                    [key]: e.target.value
                  });
                }}
              />
            </Box>
          </Box>
        ))}

      <TextField
        name="tags"
        defaultValue={tags?.join(',')}
        fullWidth
        className={styles.inputStyle}
        type="text"
        label="tags"
        onChange={(e) => {
          setPatientData({
            ...patientData,
            tags: e.target.value.split(',')
          });
        }}
      />
      <Box>
        <Box>Image</Box>
        <ImageUpload fieldName="photos" setImageFiles={setImageFiles} />
        {savedPhotosList && savedPhotosList.length > 0 && (
          <ImageViewComponent imageFiles={savedPhotosList} handleRemovePhoto={handleRemovePhoto} />
        )}
      </Box>
      <Box>
        <VideoUpload fieldName="videos" setVideoFiles={setVideoFiles} />
        {savedVideosList && savedVideosList.length > 0 && (
          <VideoViewComponent videoFiles={savedVideosList} handleRemoveVideo={handleRemoveVideo} />
        )}
      </Box>
    </Box>
  );

  const modalHeader = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        position: 'absolute',
        top: '0',
        right: '0'
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

  const updatePatientProfile = async () => {
    setIsLoading(true);
    const mediaUploadPromises: any[] = [];

    imageFiles[0].files.forEach((file: any) => {
      mediaUploadPromises.push(handleMediaUpload(file.file, FormMediaTypes.IMAGE));
    });

    const videoMediaUploadPromises: any[] = [];

    videoFiles[0].files.forEach((file: any) => {
      videoMediaUploadPromises.push(handleMediaUpload(file.file, FormMediaTypes.VIDEO));
    });

    const imageMediaUploadResults = await Promise.all(mediaUploadPromises);

    const body: UpdatePatientProfile_In = {
      name: patientData.name,
      race: patientData.race,
      ethnicity: patientData.ethnicity,
      gender: patientData.gender,
      primary_cancer_diagnosis: patientData.primary_cancer_diagnosis,
      social_worker_name: patientData.social_worker_name,
      social_worker_organization: patientData.social_worker_organization,
      date_of_diagnosis: patientData.date_of_diagnosis,
      age: patientData.age,
      guardians: patientData.guardians,
      household_details: patientData.household_details,
      family_net_monthly_income: patientData.family_net_monthly_income,
      address: patientData.address,
      recent_requests: patientData.recent_requests || [],
      photos: [...savedPhotosList, ...imageMediaUploadResults.map((result) => result.id)],
      videos: [...savedVideosList, ...videoFiles[0].files.map((file: any) => file.id)],
      notes: patientData.notes,
      tags: patientData.tags
    };

    try {
      const res = await PatientProfilesService.updatePatientProfile(id, body);
      sendNotification({
        msg: 'Patient details updated successfully.',
        variant: 'success'
      });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleSubmit = () => {
    updatePatientProfile();
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box className={styles.container}>
        {modalHeader}
        {modalContent}
        <LoadingButton variant="contained" color="primary" sx={{ margin: '1rem' }} fullWidth onClick={handleSubmit} loading={isLoading}>
          Save
        </LoadingButton>
      </Box>
    </Modal>
  );
};

export default EditPatientProfileModal;
