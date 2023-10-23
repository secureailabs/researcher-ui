import { Box, Button } from '@mui/material';
import React, { useRef } from 'react';

const DocumentsUpload: React.FC<{ onFileSelect: (file: File | null) => void }> = ({ onFileSelect }) => {
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

export default DocumentsUpload;

