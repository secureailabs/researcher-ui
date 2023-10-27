import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './EditResponseTemplate.module.css';

export interface IEditResponseTemplate {}

const EditResponseTemplate: React.FC<IEditResponseTemplate> = ({}) => {
  return (
    <Box className={styles.container}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Typography variant="h5">Enter template details</Typography>
      </Box>
      <Box>
        <TextField className={styles.textField} label="Template Name" variant="outlined" fullWidth size="small" />
        <TextField className={styles.textField} label="Template Subject" variant="outlined" fullWidth size="small" />
        <TextField className={styles.textField} label="Template Body" variant="outlined" fullWidth multiline rows={20} size="small" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        <Button fullWidth variant="contained" className={styles.button}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditResponseTemplate;
