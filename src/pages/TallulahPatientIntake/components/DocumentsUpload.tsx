import { Box, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export interface IFile {
  url: string,
  name: string,
}

const DocumentsUpload: React.FC = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
      const files = acceptedFiles.map(file => (
        <li key={file.name}>
          {file.name} - {file.size} bytes
        </li>
      ));

  return (
    <Box>
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Stack sx={{ p: 4, borderStyle: 'dashed', borderColor: 'lightgray', borderWidth: 2 }}
            direction={'column'} spacing={3} justifyContent={"center"} alignItems={"center"}>
            <Typography>Drag & drop files here, or click below</Typography>
            <Button variant="outlined" startIcon={<CloudUploadIcon />} >Upload Files</Button>
          </Stack>
        </div>
        <aside>
        {files.length > 0 ? <Typography sx={{mt:1}}>Selected Files:</Typography> : null}
        <ul>{files}</ul>
      </aside> 
      </section>
    </Box>
  );
}

export default DocumentsUpload;

