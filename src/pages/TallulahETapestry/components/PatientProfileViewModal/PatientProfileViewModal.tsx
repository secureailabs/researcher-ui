import { useEffect, useState } from 'react';
import { Box, Button, Menu, MenuItem, Modal, Typography } from '@mui/material';
import styles from './PatientProfileViewModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import useNotification from 'src/hooks/useNotification';
import { GetETapestryData_Out, GetPatientProfile_Out } from 'src/tallulah-ts-client';

export interface IPatientProfileViewModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: GetETapestryData_Out;
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

  const { defined_values, ...restAccounts } = data.account;
  type AccountKey = keyof typeof restAccounts;

  const renderModalCardContent = (
    <Box className={styles.container}>
      {Object.entries(restAccounts).map(([key]) => {
        const accountKey = key as AccountKey;
        if (key === 'defined_values') {
          return null;
        }
        return (
          <Box
            sx={{
              marginTop: '1rem'
            }}
          >
            <Typography variant="h6" className={styles.label}>
              {key}
            </Typography>
            <Typography variant="body1" className={styles.value}>
              {restAccounts[accountKey] || 'N/A'}
            </Typography>
          </Box>
        );
      })}
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
