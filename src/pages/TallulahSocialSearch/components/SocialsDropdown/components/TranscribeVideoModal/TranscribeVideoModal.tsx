import { Transcribe } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import useNotification from 'src/hooks/useNotification';
import STRUCTURED_DATA_RESULTS from 'src/pages/TallulahSocialSearch/structured_insights';

export interface ITranscribeModal {
  refetch: () => void;
  title: string;
  transcription: string;
}

const TranscribeVideoModal: React.FC<ITranscribeModal> = ({ refetch, title, transcription }) => {
  const [open, setOpen] = React.useState(false);
  const [showInsights, setShowInsights] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    refetch();
    setOpen(false);
  };
  const [sendNotification] = useNotification();
  const { handleSubmit } = useForm({
    mode: 'onSubmit'
  });

  const handleCopyTranscription = () => {
    sendNotification({
      msg: 'Transcription copied to clipboard',
      variant: 'success'
    });
    return;
  };

  const handleShowInsights = () => {
    setShowInsights(true);
    return;
  };

  const handleCopyInsights = () => {
    sendNotification({
      msg: 'Prompt results copied to clipboard',
      variant: 'success'
    });
    setTimeout(handleClose, 3000)
    return;
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    return;
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    borderColor: 'lightgrey',
    boxShadow: 24,
    p: 4
  };

  return (
    <Box>
      <Button onClick={handleOpen} type="submit" variant="contained">
        Extract Insights
      </Button>
      <Modal
        sx={{
          display: 'block',
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'lightgrey',
          overflow: 'scroll'
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="Modal popup for transcribing chosen video"
      >
        <Box sx={style} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack flexDirection={'row'} alignItems={'start'} justifyContent={'space-between'}>
            <Typography sx={{ pb: 1 }} variant="h5">
              Transcription for: {title}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Box sx={{ py: 1 }}>
            <TextField
              sx={{ mt: 1 }}
              defaultValue={transcription}
              maxRows={10}
              fullWidth
              multiline
              id="transcription"
              autoFocus
            />
          </Box>
          <Button onClick={handleCopyTranscription} type="submit" size='small' variant="contained" sx={{ mt: 2, mb: 4 }}>
            Copy Transcription
          </Button>
          <Typography variant="h5">
            Enter a prompt:
          </Typography>
          <Box sx={{ py: 2 }}>
            <TextField
              sx={{ mt: 1 }}
              defaultValue={''}
              maxRows={10}
              fullWidth
              multiline
              id="prompt"
              autoFocus
            />
          </Box>
          <Button onClick={handleShowInsights} type="submit" size='small' variant="contained" sx={{ mt: 2 }}>
            Extract Insights
          </Button>
          {showInsights && (
            <Box>
            <Box sx={{ py: 2 }}>
              <TextField
                sx={{ mt: 1 }}
                defaultValue={STRUCTURED_DATA_RESULTS.toString()}
                maxRows={10}
                fullWidth
                multiline
                id="insights"
                spellCheck='false'
                autoFocus
              />
            </Box>
            <Button onClick={handleCopyInsights} type="submit" size='small' variant="contained" sx={{ mt: 2 }}>
            Copy Results and Close
          </Button>
          </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default TranscribeVideoModal;
