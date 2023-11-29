import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './EditResponseTemplate.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { GetResponseTemplate_Out, RegisterResponseTemplate_In, ResponseTemplatesService } from 'src/tallulah-ts-client';
import useNotification from 'src/hooks/useNotification';

export interface IEditResponseTemplate {
  initialData?: GetResponseTemplate_Out;
  setIsModalOpen: (isOpen: boolean) => void;
  handleRefresh: () => void;
}

const EditResponseTemplate: React.FC<IEditResponseTemplate> = ({ initialData, setIsModalOpen, handleRefresh }) => {
  const [templateName, setTemplateName] = useState<string>(initialData ? initialData.name : '');
  const [templateSubject, setTemplateSubject] = useState<string>(initialData && initialData.subject ? initialData.subject : '');
  const [templateBody, setTemplateBody] = useState<string>(initialData && initialData.body?.content ? initialData.body.content : '');
  const [isEditMode, setIsEditMode] = useState<boolean>(initialData ? true : false);
  const [sendNotification] = useNotification();

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
      handleRefresh();
      sendNotification({
        msg: 'Template added successfully',
        variant: 'success'
      });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnEditClicked = async () => {
    const body = {
      subject: templateSubject,
      body: {
        contentType: 'text/html',
        content: templateBody
      }
    };
    try {
      const response = await ResponseTemplatesService.updateResponseTemplate(initialData!._id, body);
      handleRefresh();
      sendNotification({
        msg: 'Template modified successfully',
        variant: 'success'
      });
      setIsModalOpen(false);
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
        <Button fullWidth variant="contained" className={styles.button} onClick={isEditMode ? handleOnEditClicked : handleOnSaveClicked}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditResponseTemplate;
