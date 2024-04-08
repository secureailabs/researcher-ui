import { useEffect, useState } from 'react';
import { Box, Button, Menu, MenuItem, Modal, Typography } from '@mui/material';
import styles from './PatientProfileViewModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import useNotification from 'src/hooks/useNotification';
import { GetPatientProfile_Out } from 'src/tallulah-ts-client';

export interface IPatientProfileViewModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: GetPatientProfile_Out;
  handleRefresh: () => void;
}

const mediaTypes = ['FILE', 'IMAGE', 'VIDEO'];

const convertTagsStringToArray = (tags: string | undefined) => {
  if (!tags) return [];
  return tags.split(',');
};

const PatientProfileViewModal: React.FC<IPatientProfileViewModal> = ({ openModal, handleCloseModal, data, handleRefresh }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');

  const [mediaDetails, setMediaDetails] = useState<any>({});

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const [sendNotification] = useNotification();

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const renderModalCardHeader = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem'
      }}
    >
      <CloseIcon
        onClick={handleCloseModal}
        sx={{
          cursor: 'pointer'
        }}
      />
    </Box>
  );

  const renderModalCardContent = (
    <Box className={styles.container}>
      <Box>
        <Typography variant="h6" className={styles.label}>
          Name
        </Typography>
        <Typography variant="body1">{data.name}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Age
        </Typography>
        <Typography variant="body1">{data.age}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Primary cancer diagnosis
        </Typography>
        <Typography variant="body1">{data.primary_cancer_diagnosis || 'N/A'}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Social worker name
        </Typography>
        <Typography variant="body1">{data.social_worker_name || 'N/A'}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Social worker organization
        </Typography>
        <Typography variant="body1">{data.social_worker_organization || 'N/A'}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Date of diagnosis
        </Typography>
        <Typography variant="body1">{data.date_of_diagnosis || 'N/A'}</Typography>
      </Box>
      {data.guardians &&
        data.guardians.length > 0 &&
        data.guardians.map((guardian: any) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '2rem',
              marginTop: '1rem'
            }}
          >
            <Box>
              <Typography variant="h6" className={styles.label}>
                Guardian Name
              </Typography>
              <Typography variant="body1">{guardian.name}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" className={styles.label}>
                Relationship
              </Typography>
              <Typography variant="body1">{guardian.relationship}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" className={styles.label}>
                Contact
              </Typography>
              <Typography variant="body1">{guardian.phone}</Typography>
            </Box>
          </Box>
        ))}
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Household details
        </Typography>
        <Typography variant="body1">{data.household_details || 'N/A'}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Family net income
        </Typography>
        <Typography variant="body1">{data.family_net_monthly_income || 'N/A'}</Typography>
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="h6" className={styles.label}>
          Address
        </Typography>
        <Typography variant="body1">{data.address || 'N/A'}</Typography>
      </Box>
    </Box>
  );

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
          height: '90%',
          backgroundColor: '#fff'
        }}
      >
        {renderModalCardHeader}
        {renderModalCardContent}
      </Box>
    </Modal>
  );
};

export default PatientProfileViewModal;
