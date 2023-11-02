import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import styles from './PatientDetailViewModal.module.css';
import PatientImage from 'src/assets/images/users/sample-face-image-1.png';
import InstagramIcon from '@mui/icons-material/Instagram';
import CloseIcon from '@mui/icons-material/Close';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
export interface IPatientDetailViewModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: any;
}

const PatientDetailViewModal: React.FC<IPatientDetailViewModal> = ({ openModal, handleCloseModal, data }) => {
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          outline: 'none',
          width: '1000px',
          overflowY: 'scroll',
          height: '600px',
          backgroundColor: '#fff'
        }}
      >
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
            <IconButton aria-label="delete" onClick={handleCloseModal}>
              <CloseIcon
                sx={{
                  color: '#000',
                  fontSize: '2rem'
                }}
              />
            </IconButton>
          </Box>
          {/* Patient Details */}
          <Box className={styles.cardHeaderLayout}>
            <Box>
              <Typography variant="h6" className={styles.name}>
                {data?._source.Name}
              </Typography>
              <Typography variant="body1" className={styles.age}>
                Age : {data?._source.Age} years
                <Typography>Location : {data?._source.location}</Typography>
                <Typography>Disease Type : {data?._source.diseaseType}</Typography>
              </Typography>
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
              <Typography variant="body1" className={styles.value}>
                {data?._source['Life Story']}
              </Typography>
            </Box>
          </Box>

          <Box className={styles.section1}>
            <Box>
              <Typography variant="body1" className={styles.label}>
                Barrier to Care
              </Typography>
              <Typography variant="body1" className={styles.value}>
                {data?._source.barriersToCare}
              </Typography>
            </Box>
          </Box>

          <Box className={styles.section1}>
            <Box>
              <Typography variant="body1" className={styles.label}>
                Current Disease State
              </Typography>
              <Typography variant="body1" className={styles.value}>
                {data?._source.outcome}
              </Typography>
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
            </Box>
          </Box>

          <Box className={styles.section1}>
            <Box>
              <Typography variant="body1" className={styles.label}>
                Media
              </Typography>
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
              <Typography variant="body1" className={styles.value}>
                {data?._source.storyUsage}
              </Typography>
            </Box>
          </Box>

          <Box className={styles.section2}>
            <Box>
              <Typography variant="body1" className={styles.label}>
                Outbound Communication
              </Typography>
              <Typography variant="body1" className={styles.value}>
                {data?._source.outboundCommunication}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientDetailViewModal;
