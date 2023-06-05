import { Box, TextField, Typography } from '@mui/material';
import styles from './AddNewDataModel.module.css';

export interface IAddNewDataModel {}

const AddNewDataModel: React.FC<IAddNewDataModel> = () => {
  return (
    <Box sx={{ width: '100%' }} className={styles.container}>
      <Typography variant="h4" component="h4">
        Add New Data Model
      </Typography>
      <Box>
        <Box className={styles.inputContainer}>
          <TextField id="table-name" label="Table Name" variant="outlined" className={styles.input} />
          <TextField multiline rows={2} id="description" label="Description" variant="outlined" className={styles.input} />
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewDataModel;
