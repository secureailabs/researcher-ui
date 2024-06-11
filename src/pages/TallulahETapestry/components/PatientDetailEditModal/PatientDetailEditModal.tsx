import { useEffect, useState } from 'react';
import PatientImage from 'src/assets/images/users/avatar-3.png';
import { formatReceivedTimeFull } from 'src/utils/helper';
import {
  EtapestryDataService,
  FormDataService,
  FormMediaTypes,
  FormTemplatesService,
  GetMultipleFormTemplate_Out
} from 'src/tallulah-ts-client';
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
import { set } from 'react-hook-form';

export interface IPatientDetailEditModal {
  openModal: boolean;
  handleCloseModal: () => void;
  data: any;
  handleParentClose: () => void;
}

const PatientDetailEditModal: React.FC<IPatientDetailEditModal> = ({ openModal, handleCloseModal, data, handleParentClose }) => {
  const [sendNotification] = useNotification();

  const [tags, setTags] = useState<string>();
  const [notes, setNotes] = useState<string>();

  const [isLoading, setIsLoading] = useState(false);

  console.log('data: ', data);

  const updateETapestryData = async () => {
    setIsLoading(true);
    try {
      const res = await EtapestryDataService.updateEtapestryData(data.id, {
        notes: notes,
        tags: tags?.split(',').map((tag) => tag.trim()) || []
      });
      sendNotification({
        msg: 'Patient details updated successfully.',
        variant: 'success'
      });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleSubmitClicked = () => {
    updateETapestryData();
  };

  useEffect(() => {
    if (data) {
      // create comma separated tags from array
      if (data.tags) {
        setTags(data.tags.join(', '));
      }
      if (data.notes) {
        setNotes(data.notes);
      }
    }
  }, [data]);

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

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box className={styles.container}>
        {renderModalCardHeader}
        <Typography
          variant="h5"
          sx={{
            paddingLeft: '1rem'
          }}
        >
          Edit Details
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '1rem',
            bottom: '0',
            width: '100%'
          }}
        >
          <TextField
            name={'tags'}
            fullWidth
            className={styles.inputStyle}
            type="text"
            placeholder={'Tags'}
            required={false}
            variant="outlined"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            label={'Tags'}
          />

          <Typography>Notes</Typography>
          <TextField
            name={'notes'}
            fullWidth
            multiline
            rows={6}
            placeholder={'Notes'}
            required={false}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            sx={{
              width: '100%'
            }}
            value={notes}
          />

          {isLoading && (
            <Box
              className={styles.loading}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircularProgress />
            </Box>
          )}

          <Button variant="contained" color="primary" sx={{ margin: '1rem' }} fullWidth onClick={handleSubmitClicked}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientDetailEditModal;
