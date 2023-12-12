import { Box, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const thumbsContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
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
  boxSizing: 'border-box',
};

const thumbInner: React.CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img: React.CSSProperties = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const highlightedImg: React.CSSProperties = {
  ...img,
  border: '3px solid orange', // border to highlight the first photo
};

interface CustomFile extends File {
  preview: string;
}

export interface ProfilePictureUploadProps {
  spacing?: number;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({spacing}) => {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const filesWithPreview = acceptedFiles.map((file) => {
        const customFile: CustomFile = file as CustomFile;
        customFile.preview = URL.createObjectURL(file);
        return customFile;
      });
      setFiles(filesWithPreview);
    },
  });

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

  return (
    <Box>
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Stack sx={{ p: 4, borderStyle: 'dashed', borderColor: 'lightgray', borderWidth: 2}}
            direction={'column'} spacing={spacing} justifyContent={"center"} alignItems={"center"}>
            <Typography>Drag & drop photos here, or click below</Typography>
            <Button variant="outlined" startIcon={<AddPhotoAlternateIcon />} >Upload Photos</Button>
          </Stack>
        </div>
        {files.length > 0 ? <Typography sx={{mt:1}}>Selected Photos:</Typography> : null}
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    </Box>
  );
}

export default ProfilePictureUpload;
