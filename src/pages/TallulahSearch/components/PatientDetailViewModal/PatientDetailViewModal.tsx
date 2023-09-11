import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import styles from './PatientDetailViewModal.module.css';
import PatientImage from 'src/assets/images/users/sample-face-image-1.png';
import CloseIcon from '@mui/icons-material/Close';

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
                {data?._source.Age} years, {data?._source.ethnicity}, {data?._source.location}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem',
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

          <Box
            sx={{
              display: 'flex'
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
                data._source.consentStatus === 'GRANTED'
                  ? {
                      backgroundColor: '#439c5c'
                    }
                  : {},
                data._source.consentStatus === 'PENDING'
                  ? {
                      backgroundColor: '#c99a4f'
                    }
                  : {}
              ]}
            >
              <Typography variant="body1">Consent Details : {data?._source.consentStatus}</Typography>
            </Box>
          </Box>
          <Box className={styles.section1}>
            <Box>
              <Typography variant="body1" className={styles.label}>
                Related Disease
              </Typography>
              <Typography variant="body1" className={styles.value}>
                {data?._source.relatedDisease}
              </Typography>
            </Box>
          </Box>

          <Box className={styles.section1}>
            <Box>
              <Typography variant="body1" className={styles.label}>
                Outcome
              </Typography>
              <Typography variant="body1" className={styles.value}>
                {data?._source.outcome}
              </Typography>
            </Box>
          </Box>

          <Box className={styles.section1}>
            <Box>
              <Typography variant="body1" className={styles.label}>
                Life Story
              </Typography>
              <Typography variant="body1" className={styles.value}>
                {data?._source['Life Story']}
              </Typography>
            </Box>
          </Box>

          <Box className={styles.section1}>
            <Box>
              <Typography variant="body1" className={styles.label}>
                Insurance Access
              </Typography>
              <Typography variant="body1" className={styles.value}>
                {data?._source.insuranceAccess}
              </Typography>
            </Box>
          </Box>

          <Box className={styles.section2}>
            <Box>
              <Typography variant="body1" className={styles.label}>
                Additional Comments
              </Typography>
              <Typography variant="body1" className={styles.value}>
                {data?._source['Additional Documents_content'] || 'No additional comments'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientDetailViewModal;
