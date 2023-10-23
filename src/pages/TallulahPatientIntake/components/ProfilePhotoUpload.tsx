/*
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';

interface ProfilePictureUpload {
  onUpload: (file: File) => void;
}

const ProfilePictureUpload: React.FC<ProfilePictureUpload> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selected = files[0];
      setSelectedFile(selected);
      onUpload(selected);
    }
  };

  return (
    <Box>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={(fileInput) => (fileInput ? fileInput.click() : null)}
      />
      <Button onClick={() => document.querySelector('input[type="file"]')}>
        Upload Profile Picture
      </Button>
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </Box>
  );
};

export default ProfilePictureUpload;
*/

import { Box, Button } from '@mui/material';
import React, { useRef } from 'react';

const ProfilePictureUpload: React.FC<{ onFileSelect: (file: File | null) => void }> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      onFileSelect(selectedFile);
    }
  };

  return (
    <Box>
      <Button onClick={handleFileSelect} variant="outlined">Browse Files</Button>
      <input
        type="file"
        accept="*"
        style={{ display: 'none' }}
        ref={(input) => {
          fileInputRef.current = input;
        }}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default ProfilePictureUpload;

