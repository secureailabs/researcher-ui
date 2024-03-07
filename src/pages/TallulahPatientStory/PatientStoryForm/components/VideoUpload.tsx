import { Box, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { TVideoUpload } from '../PatientStoryForm';
import { Dropzone, FileMosaic } from '@dropzone-ui/react';

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
  const [files, setFiles] = useState<any[]>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

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

  const updateFiles = (incommingFiles: any) => {
    setFiles(incommingFiles);
  };

  return (
    <Box>
      <section className="container">
        <Dropzone onChange={updateFiles} value={files} accept="video/*" footer={false} label="Upload video here">
          {files.map((file) => (
            <FileMosaic {...file} preview />
          ))}
        </Dropzone>
      </section>
    </Box>
  );
};

export default VideoUpload;
