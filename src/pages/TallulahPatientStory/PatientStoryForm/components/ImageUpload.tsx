import { Box, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PersonIcon from '@mui/icons-material/Person';
import { TImageFileUpload } from '../PatientStoryForm';

const thumbsContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb: React.CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner: React.CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img: React.CSSProperties = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const highlightedImg: React.CSSProperties = {
  ...img,
  border: '3px solid orange' // border to highlight the first photo
};

interface CustomFile extends File {
  preview: string;
}

export interface ProfilePictureUploadProps {
  spacing?: number;
  fieldName: string;
  setImageFiles?: any;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({ spacing, setImageFiles, fieldName }) => {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const { acceptedFiles, getRootProps, getInputProps, fileRejections, open } = useDropzone({
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const filesWithPreview = acceptedFiles.map((file) => {
        const customFile: CustomFile = file as CustomFile;
        customFile.preview = URL.createObjectURL(file);
        return customFile;
      });
      setFiles(filesWithPreview);
    },
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg']
    },
    maxFiles: fieldName === 'profilePicture' ? 1 : 5,
    multiple: fieldName === 'profilePicture' ? false : true,
    noClick: true
  });

  console.log('fileRejections', fileRejections);

  const thumbs = files.map((file, index) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={index === 0 ? highlightedImg : img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    if (setImageFiles) {
      setImageFiles((prev: TImageFileUpload[]) => {
        const newImageFiles: TImageFileUpload[] = [...prev];
        const fileIndex = newImageFiles.findIndex((file) => file.fieldName === fieldName);
        if (fileIndex === -1) {
          newImageFiles.push({
            fieldName: fieldName,
            files: acceptedFiles
          });
        } else {
          newImageFiles[fileIndex] = {
            fieldName: fieldName,
            files: acceptedFiles
          };
        }
        return newImageFiles;
      });
    }
  }, [acceptedFiles]);

  return (
    <Box>
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          {fieldName === 'profilePicture' ? (
            <Stack
              sx={{
                p: 4,
                borderStyle: 'dashed',
                borderColor: 'lightgray',
                borderWidth: 2,
                width: 200,
                height: 200,
                borderRadius: '50%',
                margin: 'auto'
              }}
              direction={'column'}
              spacing={spacing}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <PersonIcon sx={{ fontSize: '5rem', color: '#a19e9d' }} />
              <Button variant="outlined" onClick={open}>
                <Typography
                  sx={{
                    fontSize: '1rem'
                  }}
                >
                  Upload Photo
                </Typography>
              </Button>
            </Stack>
          ) : (
            <Stack
              sx={{ p: 4, borderStyle: 'dashed', borderColor: 'lightgray', borderWidth: 2 }}
              direction={'column'}
              spacing={spacing}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography>Drag & drop photos here, or click below</Typography>
              <Button variant="outlined" startIcon={<AddPhotoAlternateIcon />}>
                Upload Photos
              </Button>
            </Stack>
          )}
        </div>
        {files.length > 0 ? <Typography sx={{ mt: 1 }}>Selected Photos:</Typography> : null}
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    </Box>
  );
};

export default ProfilePictureUpload;
