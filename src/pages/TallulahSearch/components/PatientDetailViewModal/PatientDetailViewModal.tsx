import { Box, Button, FormControlLabel, IconButton, Modal, Stack, Typography, styled } from '@mui/material';
import styles from './PatientDetailViewModal.module.css';
import PatientImage from 'src/assets/images/users/sample-face-image-1.png';
import InstagramIcon from '@mui/icons-material/Instagram';
import CloseIcon from '@mui/icons-material/Close';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { useState } from 'react';
import Editext from 'react-editext';
import ProfilePictureUpload from 'src/pages/TallulahPatientIntake/components/ProfilePhotoUpload';
import DocumentsUpload from 'src/pages/TallulahPatientIntake/components/DocumentsUpload';
import useNotification from 'src/hooks/useNotification';
import { useForm } from 'react-hook-form';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export interface IPatientDetailViewModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: any;
}

const PatientDetailViewModal: React.FC<IPatientDetailViewModal> = ({ openModal, handleCloseModal, data }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [sendNotification] = useNotification();
  const { handleSubmit } = useForm();
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const age: string = data?._source.Age + ' years';
  const location: string = data?._source.location;
  const diseaseType: string = data?._source.diseaseType;

  const onSave = (val: any) => {
    if (val.toLowerCase().includes('golf')) {
      data._source.Comments = 'John likes to play golf';
    }
  };

  const onSubmit = () => {
    onSave('golf');
    sendNotification({
      msg: 'Patient story has been saved',
      variant: 'success'
    });
    setTimeout(handleCloseModal, 1000)
    setEditing((v) => !v);
    return;
  };

  const StyledEdiText = styled(Editext)`
  button {
    border-radius: 5px;
  }
  button[editext="edit-button"] {
    color: #fff;
    background: #fff;
    width: 10px;
    border: none;
  }
  button[editext="save-button"] {
    background: #fff;
    color: #fff;
    border-color: #fff;
    &:hover {
      background: #fff;
      color: #fff;
    }
  }
  button[editext="cancel-button"] {
    color: #fff;
    background: #fff;
    border-color: #fff;
    &:hover {
      color: #fff;
      background: #fff;
    }
  }
  input, textarea {
    border-radius: 5px;
    font-size: 14px;
    font-weight: 400;
    font-style: italic;
  }
  div[editext="view-container"], div[editext="edit-container"] {
    padding-right: 15px;
    margin-bottom: 5px;
    border-radius: 5px;
}
`

  return (
    <Box>
      <Box
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          outline: 'none',
          width: '1000px',
          height: '600px',
        }}
      >
        <Dialog open={openModal} onClose={handleCloseModal} scroll={'paper'}>
          <DialogTitle id="scroll-dialog-title"></DialogTitle>
          <DialogContent>
            <Box className={styles.container}>
              <Box
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  top: '5px',
                  right: '0px'
                }}
              >
                <Box style={{ position: 'sticky' }} width='100%'>
                  <Stack sx={{ mt: 0.5 }} flexDirection={'row'} alignItems={'self-end'} justifyContent={'flex-start'}>
                    {editing && <Stack flexDirection={'row'} >
                      <Button sx={{ marginRight: 1, maxHeight: 30 }} color='success' variant='contained' onClick={onSubmit}>Save & Close</Button>
                      <Button sx={{ maxHeight: 30 }} color='error' variant='contained' onClick={() => setEditing((v) => !v)}>Cancel</Button></Stack>}
                    {!editing && <Button sx={{ mb: 1, marginRight: 1, justifyContent: 'flex-end', maxHeight: 30 }} variant='contained' size='extraSmall' onClick={() => setEditing((v) => !v)}>Enter Edit Mode</Button>}
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
                  <StyledEdiText
                    type='text'
                    value={data?._source.Name}
                    editing={editing}
                    viewProps={{
                      className: `${styles.name}`,
                    }}
                    saveButtonContent="Save"
                    cancelButtonContent="Cancel"
                    onSave={onSave}></StyledEdiText>
                  <Stack flexDirection={'row'} justifyContent={'flex-start'} textAlign={'center'} alignItems={'baseline'}>
                    <Typography sx={{ marginRight: 1 }} variant="body1" className={styles.age}>
                      Age:
                    </Typography>
                    <StyledEdiText
                      type='text'
                      value={age}
                      editing={editing}
                      viewProps={{
                        className: `${styles.age}`,
                      }}
                      saveButtonContent="Save"
                      cancelButtonContent="Cancel"
                      onSave={onSave}></StyledEdiText>
                  </Stack>
                  <Stack flexDirection={'row'} justifyContent={'flex-start'} textAlign={'center'} alignItems={'baseline'}>
                    <Typography sx={{ marginRight: 1 }} variant="body1" className={styles.age}>
                      Location:
                    </Typography>
                    <StyledEdiText
                      type='text'
                      value={location}
                      editing={editing}
                      viewProps={{
                        className: `${styles.age}`,
                      }}
                      saveButtonContent="Save"
                      cancelButtonContent="Cancel"
                      onSave={onSave}></StyledEdiText>
                  </Stack>
                  <Stack flexDirection={'row'} justifyContent={'flex-start'} textAlign={'center'} alignItems={'baseline'}>
                    <Typography sx={{ marginRight: 1 }} variant="body1" className={styles.age}>
                      Disease Type:
                    </Typography>
                    <StyledEdiText
                      type='text'
                      value={diseaseType}
                      editing={editing}
                      viewProps={{
                        className: `${styles.age}`,
                      }}
                      saveButtonContent="Save"
                      cancelButtonContent="Cancel"
                      onSave={onSave}></StyledEdiText>
                    <Stack />
                  </Stack>
                  <Box
                    sx={{
                      display: 'flex',
                      marginTop: '1rem'
                    }}
                  >
                    <Box
                      sx={[
                        {
                          alignSelf: 'flex-start',
                          padding: '0.2rem 1rem',
                          color: '#fff',
                          fontWeight: 'bold'
                        },
                        data._source.consentStatus.includes('Granted')
                          ? {
                            backgroundColor: '#439c5c'
                          }
                          : {},
                        data._source.consentStatus.includes('Pending')
                          ? {
                            backgroundColor: '#c99a4f'
                          }
                          : {}
                      ]}
                    >
                      <Typography variant="body1">Consent To Use : {data?._source.consentStatus}</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginTop: '1rem'
                    }}
                  >
                    {data?._source.Tags.map((tag: string) => (
                      <Box className={styles.tag}>{tag}</Box>
                    ))}
                  </Box>
                </Box>
                <Box>
                  {/* display image  */}
                  <img src={require(`src/assets/images/users/${data._source.imageName}`)} alt="Patient Image" className={styles.image} />
                </Box>
              </Box>
              <Box className={styles.section1}>
                <Box>
                  <Typography variant="body1" className={styles.label}>
                    Journey
                  </Typography>
                  <StyledEdiText
                    type='textarea'
                    value={data?._source['Life Story']}
                    editing={editing}
                    viewContainerClassName={styles.journeyEditButtons}
                    viewProps={{
                      className: `${styles.value}`,
                    }}
                    saveButtonContent="Save"
                    cancelButtonContent="Cancel"
                    onSave={onSave}
                    inputProps={{
                      className: 'textarea',
                      placeholder: 'Type your content here',
                      style: {
                        outline: 'none',
                        minWidth: '100%',
                        marginBottom: '1rem',
                      },
                      rows: 10
                    }}></StyledEdiText>
                </Box>
              </Box>
              <Box className={styles.section1}>
                <Box>
                  <Typography variant="body1" className={styles.label}>
                    Barrier to Care
                  </Typography>
                  <StyledEdiText
                    type='text'
                    value={data?._source.barriersToCare}
                    editing={editing}
                    viewProps={{
                      className: `${styles.value}`,
                    }}
                    saveButtonContent="Save"
                    cancelButtonContent="Cancel"
                    onSave={onSave}></StyledEdiText>
                </Box>
              </Box>
              <Box className={styles.section1}>
                <Box>
                  <Typography variant="body1" className={styles.label}>
                    Current Disease State
                  </Typography>
                  <StyledEdiText
                    type='text'
                    value={data?._source.outcome}
                    editing={editing}
                    viewProps={{
                      className: `${styles.value}`,
                    }}
                    saveButtonContent="Save"
                    cancelButtonContent="Cancel"
                    onSave={onSave}></StyledEdiText>
                </Box>
              </Box>
              <Box className={styles.section1}>
                <Box>
                  <Typography variant="body1" className={styles.label}>
                    Important Dates:
                  </Typography>
                  <Typography variant="body1" className={styles.value}>
                    {data?._source.firstSymptomsDate} - Date of first symptoms
                  </Typography>
                  <Typography variant="body1" className={styles.value}>
                    {data?._source.diagnosisDate} - Date of diagnosis
                  </Typography>
                </Box>
              </Box>
              <Box className={styles.section1}>
                <Box>
                  <Typography variant="body1" className={styles.label}>
                    Tone
                  </Typography>
                  <Typography variant="body1" className={styles.value}>
                    {data?._source.tone}
                  </Typography>
                </Box>
              </Box>
              <Box className={styles.section1}>
                <Box>
                  <Typography variant="body1" className={styles.label}>
                    Social Media
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex'
                    }}
                  >
                    <IconButton aria-label="delete">
                      <InstagramIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <FacebookIcon />
                    </IconButton>
                  </Box>
                  {editing &&
                    <Button variant='outlined'>Add Social Media Account</Button>}
                </Box>
              </Box>
              <Box className={styles.section1}>
                <Box>
                  <Typography variant="body1" className={styles.label}>
                    Media
                  </Typography>
                  {editing &&
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ mt: 1, mb: 2 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>Upload profile picture:</Typography>
                        <ProfilePictureUpload spacing={1} />
                      </Box>
                      <Box sx={{ mt: 1, mb: 2 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>Upload additional documents:</Typography>
                        <DocumentsUpload spacing={1} editPatient={true} />
                      </Box>
                    </Box>}
                  <Box
                    sx={{
                      display: 'flex',
                      marginTop: '1rem',
                      gap: '1rem'
                    }}
                  >
                    {data._source.media1 ? (
                      <img src={require(`src/assets/images/${data._source.media1}`)} alt="Patient Image" className={styles.mediaImage} />
                    ) : null}
                    {data._source.media2 ? (
                      <img src={require(`src/assets/images/${data._source.media2}`)} alt="Patient Image" className={styles.mediaImage} />
                    ) : null}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex'
                    }}
                  >
                    <Box
                      sx={{
                        padding: '0.5rem',
                        display: 'flex',
                        gap: '1rem'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <IconButton aria-label="delete">
                          <DocumentScannerIcon />
                        </IconButton>
                        <Typography variant="body1" className={styles.link}>
                          {data?._source.documentName}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <IconButton aria-label="delete">
                          <DocumentScannerIcon />
                        </IconButton>
                        <Typography variant="body1" className={styles.link}>
                          {data?._source.documentName2}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className={styles.section1}>
                <Box>
                  <Typography variant="body1" className={styles.label}>
                    Story Usage
                  </Typography>
                  <StyledEdiText
                    type='text'
                    value={data?._source.storyUsage}
                    editing={editing}
                    viewProps={{
                      className: `${styles.value}`,
                    }}
                    saveButtonContent="Save"
                    cancelButtonContent="Cancel"
                    onSave={onSave}></StyledEdiText>
                </Box>
              </Box>
              <Box>
                <Box className={styles.section1}>
                  <Typography variant="body1" className={styles.label}>
                    Outbound Communication
                  </Typography>
                  <StyledEdiText
                    type='text'
                    value={data?._source.outboundCommunication}
                    editing={editing}
                    viewProps={{
                      className: `${styles.value}`,
                    }}
                    saveButtonContent="Save"
                    cancelButtonContent="Cancel"
                    onSave={onSave}></StyledEdiText>
                </Box>
                <Box className={styles.section2}>
                  <Typography variant="body1" className={styles.label}>
                    Notes
                  </Typography>
                  <StyledEdiText
                    type='text'
                    value={data?._source.Comments}
                    editing={editing}
                    viewProps={{
                      className: `${styles.value}`,
                    }}
                    saveButtonContent="Save"
                    cancelButtonContent="Cancel"
                    onSave={onSave}></StyledEdiText>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default PatientDetailViewModal;
