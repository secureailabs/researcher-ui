import { useEffect, useState } from 'react';
import PatientImage from 'src/assets/images/users/avatar-3.png';
import { formatReceivedTimeFull } from 'src/utils/helper';
import { FormDataService, FormMediaTypes } from 'src/tallulah-ts-client';
import styles from './PatientDetailEditModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import DeleteConfirmationModal from 'src/components/DeleteConfirmationModal';
import useNotification from 'src/hooks/useNotification';
import {
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Typography,
  CircularProgress,
  Divider,
  Modal
} from '@mui/material';

export interface IPatientDetailEditModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: any;
  handleParentClose: () => void;
  formDataId: string;
}

const PatientDetailEditModal: React.FC<IPatientDetailEditModal> = ({
  openModal,
  handleCloseModal,
  data,
  formDataId,
  handleParentClose
}) => {
  const [formData, setFormData] = useState<any>({ ...data });
  const [isLoading, setIsLoading] = useState(false);

  const [sendNotification] = useNotification();

  const handleFormDataChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    const newFormData = { ...formData };
    newFormData[name] = { ...newFormData[name], value: value };
    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await FormDataService.updateFormData(formDataId, { values: formData });
      handleCloseModal();
      handleParentClose();
    } catch (error) {
      console.log(error);
      sendNotification({
        msg: 'Failed to edit story',
        variant: 'error'
      });
    }
    setIsLoading(false);
  };

  const renderField = (fieldName: any, field: any) => {
    switch (field.type) {
      case 'TEXTAREA':
        return (
          <>
            <Typography>{field.label}</Typography>
            <TextField
              name={fieldName}
              defaultValue={field.value}
              fullWidth
              multiline
              rows={6}
              onChange={handleFormDataChange}
              sx={{
                width: '100%'
              }}
            />
          </>
        );
      case 'IMAGE':
      case 'FILE':
      case 'VIDEO':
        return null;
      default:
        return (
          <TextField
            name={fieldName}
            defaultValue={field.value}
            fullWidth
            className={styles.inputStyle}
            type="text"
            variant="outlined"
            onChange={handleFormDataChange}
            label={field.label}
          />
        );
    }
  };

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
          height: '700px',
          backgroundColor: '#fff',
          border: '2px solid orange'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            position: 'absolute',
            top: '0',
            right: '0'
          }}
        >
          <CloseIcon
            onClick={handleCloseModal}
            sx={{
              cursor: 'pointer'
            }}
          />
        </Box>

        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '1px solid #e0e0e0',
              padding: '1rem',
              width: '100%'
            }}
          >
            <Typography variant="h4" sx={{ margin: '1rem', textAlign: 'center' }}>
              Edit Patient
            </Typography>
          </Box>
          <Box
            sx={{
              padding: '1rem'
            }}
          >
            {Object.entries(data).map((field: any) => {
              return (
                <Box key={field[1].name} sx={{ margin: '1rem' }}>
                  {renderField(field[0], field[1])}
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            bottom: '0',
            width: '100%'
          }}
        >
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem'
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <Button variant="contained" color="primary" sx={{ margin: '1rem' }} fullWidth onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientDetailEditModal;
