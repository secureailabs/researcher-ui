import { Box, Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import styles from '../../TallulahSearch/components/PatientDetailViewModal/PatientDetailViewModal.module.css'
import PatientImage from 'src/assets/images/users/sample-face-image-1.png';
import useNotification from 'src/hooks/useNotification';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';


export interface ISearchDetailViewModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: any;
}

const SavedSearchDetailModal: React.FC<ISearchDetailViewModal> = ({ openModal, handleCloseModal, data }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [sendNotification] = useNotification();
  const navigate = useNavigate();

  const onSubmit = () => {
    sendNotification({
      msg: 'Patient story has been saved',
      variant: 'success'
    });
    setTimeout(handleCloseModal, 1000)
    setEditing((v) => !v);
    return;
  };

  const changeEditMode = () => {
    setEditing((v) => !v);
  };


  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          padding: '10px',
          outline: 'none',
          width: '600px',
          height: '300px'
        }}
      >
        <Box className={styles.container}>
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              justifyContent: 'flex-end',
              backgroundColor: '#fff',
              top: '5px',
              right: '0px'
            }}
          >
            <Box style={{ position: 'sticky' }} width='100%'>
              <Stack sx={{ mt: 0.5 }} flexDirection={'row'} alignItems={'self-end'} justifyContent={'flex-start'}>

                <IconButton aria-label="delete" onClick={handleCloseModal}>
                  <CloseIcon
                    sx={{
                      color: '#000',
                      fontSize: '2rem'
                    }}
                  />
                </IconButton>
              </Stack>
            </Box>
          </Box>
          {/* Patient Details */}
          <Box className={styles.cardHeaderLayout}>
            <Box>
              <Typography variant="h6" className={styles.name} sx={{ mt: -2, mb: 4 }}>
                {data.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  marginTop: '1rem',
                }}
                className={styles.section1}
              >
                {data.tags.map((tag: string) => (
                  <Box className={styles.tag}>{tag}</Box>
                ))}
              </Box>
              <Typography variant="body1" className={styles.age} sx={{ mt: 4, mb: 6 }}>
                Alert Frequency: {data.alert_frequency}
              </Typography>
            </Box>
          </Box>
          {editing && <Stack flexDirection={'row'} >
            <Button sx={{ marginRight: 1, maxHeight: 30 }} color='success' variant='contained' onClick={onSubmit}>Save & Close</Button>
            <Button sx={{ maxHeight: 30 }} color='error' variant='contained' onClick={() => setEditing((v) => !v)}>Cancel</Button></Stack>}
          {!editing && <Stack flexDirection={'row'} > 
            <Button sx={{ mb: 1, marginRight: 1, maxHeight: 30, borderColor:'#4c78af' }} variant='outlined' size='extraSmall' onClick={() => setEditing((v) => !v)}>Edit</Button>
            <Button sx={{ mb: 1, marginRight: 1, maxHeight: 30, borderColor:'#4c78af' }} variant='outlined' size='extraSmall' onClick={() => navigate(`/tallulah-find-stories/${data.name}`)}>Run Search</Button></Stack>}
        </Box>
      </Box>
    </Modal>

  );
};

export default SavedSearchDetailModal;
