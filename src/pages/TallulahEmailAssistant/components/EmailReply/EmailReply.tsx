import { Box, Button, Dialog, Icon, IconButton, TextField, Typography } from '@mui/material';
import styles from './EmailReply.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ResponseTemplateSelection from '../ResponseTemplateSelection';

export interface IEmailReply {}

const EmailReply: React.FC<IEmailReply> = ({}) => {
  const [toField, setToField] = useState<string>('2 selected emails');
  const [emailSubject, setEmailSubject] = useState<string>('');
  const [emailBody, setEmailBody] = useState<string>('');
  const [isTemplateSelectionModalOpen, setIsTemplateSelectionModalOpen] = useState<boolean>(false);

  return (
    <Box className={styles.container}>
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          padding: '10px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6">New Message</Typography>
        <Box>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          padding: '20px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}
        >
          <TextField
            label="To"
            variant="outlined"
            fullWidth
            size="small"
            InputProps={{
              readOnly: true
            }}
            value={toField}
            sx={{
              flex: 3
            }}
          />
          <Button
            sx={{
              flex: 1
            }}
          >
            View selected emails
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px',
            width: '100%'
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setIsTemplateSelectionModalOpen(true);
            }}
          >
            Choose from response templates
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px',
            width: '100%'
          }}
        >
          <Typography variant="h6">OR</Typography>
        </Box>
        <Box>
          <TextField
            className={styles.textField}
            label="Subject"
            variant="outlined"
            fullWidth
            size="small"
            value={emailSubject}
            onChange={(e) => {
              setEmailSubject(e.target.value);
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
          <ReactQuill theme="snow" value={emailBody} onChange={setEmailBody} className={styles.textField} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            marginTop: '40px'
          }}
        >
          <Button variant="outlined" fullWidth sx={{ marginTop: '20px' }}>
            Cancel
          </Button>
          <Button variant="contained" fullWidth sx={{ marginTop: '20px', marginLeft: '10px' }}>
            Send
          </Button>
        </Box>
      </Box>
      <Dialog
        open={isTemplateSelectionModalOpen}
        onClose={() => {
          setIsTemplateSelectionModalOpen(false);
        }}
      >
        <ResponseTemplateSelection
          setEmailBody={setEmailBody}
          setEmailSubject={setEmailSubject}
          setIsTemplateSelectionModalOpen={setIsTemplateSelectionModalOpen}
        />
      </Dialog>
    </Box>
  );
};

export default EmailReply;
