import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './EditResponseTemplate.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { RegisterResponseTemplate_In, ResponseTemplatesService } from 'src/tallulah-ts-client';

export interface IEditResponseTemplate {}

const EditResponseTemplate: React.FC<IEditResponseTemplate> = ({}) => {
  const [templateName, setTemplateName] = useState<string>('');
  const [templateSubject, setTemplateSubject] = useState<string>('');
  const [templateBody, setTemplateBody] = useState<string>('');

  const handleOnSaveClicked = async () => {
    const body: RegisterResponseTemplate_In = {
      name: templateName,
      subject: templateSubject,
      body: {
        contentType: 'text/html',
        content: templateBody
      }
    };
    try {
      const response = await ResponseTemplatesService.addNewResponseTemplate(body);
      console.log('response', response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={styles.container}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Typography variant="h5">Enter template details</Typography>
      </Box>
      <Box>
        <TextField
          className={styles.textField}
          label="Template Name"
          variant="outlined"
          fullWidth
          size="small"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
        <TextField
          className={styles.textField}
          label="Template Subject"
          variant="outlined"
          fullWidth
          size="small"
          value={templateSubject}
          onChange={(e) => setTemplateSubject(e.target.value)}
        />
        <ReactQuill theme="snow" value={templateBody} onChange={setTemplateBody} className={styles.textField} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        <Button fullWidth variant="contained" className={styles.button} onClick={handleOnSaveClicked}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditResponseTemplate;
