import { Box, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TVideoUpload } from '../PatientStoryForm';

export interface IFile {
  url: string;
  name: string;
}

export interface IUploadMedia {
  spacing?: number;
  editPatient?: boolean;
  setVideoFiles?: any;
  fieldName: string;
}

const VideoUpload: React.FC<IUploadMedia> = ({ spacing, editPatient, fieldName, setVideoFiles }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    if (setVideoFiles) {
      setVideoFiles((prev: TVideoUpload[]) => {
        const newDocumentFiles: TVideoUpload[] = [...prev];
        const fileIndex = newDocumentFiles.findIndex((file) => file.fieldName === fieldName);
        if (fileIndex === -1) {
          newDocumentFiles.push({
            fieldName: fieldName,
            files: acceptedFiles
          });
        } else {
          newDocumentFiles[fileIndex] = {
            fieldName: fieldName,
            files: acceptedFiles
          };
        }
        return newDocumentFiles;
      });
    }
  }, [acceptedFiles]);

  return (
    <Box>
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Stack
            sx={{ p: 4, borderStyle: 'dashed', borderColor: 'lightgray', borderWidth: 2 }}
            direction={'column'}
            spacing={spacing}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography>Drag & drop files here, or click below</Typography>
            <Button variant="outlined" startIcon={<CloudUploadIcon />}>
              Upload Files
            </Button>
          </Stack>
        </div>
        <aside>
          {files.length > 0 && !editPatient ? <Typography sx={{ mt: 1 }}>Selected Files:</Typography> : null}
          {files.length > 0 && editPatient ? <Typography sx={{ mt: 1, fontWeight: 600 }}>Files to Add:</Typography> : null}
          <ul>{files}</ul>
        </aside>
      </section>
    </Box>
  );
};

export default VideoUpload;
