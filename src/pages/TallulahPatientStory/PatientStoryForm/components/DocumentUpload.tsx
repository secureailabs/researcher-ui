import { Box, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export interface IFile {
  url: string;
  name: string;
}

export interface IUploadMedia {
  spacing?: number;
  editPatient?: boolean;
}

const DocumentsUpload: React.FC<IUploadMedia> = ({ spacing, editPatient }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

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

export default DocumentsUpload;
