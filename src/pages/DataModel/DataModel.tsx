import { Box, Button, Typography } from '@mui/material';
import styles from './DataModel.module.css';
import UtilityBar from './components/UtilityBar';

export interface IDataModel {
  sampleTextProp: string;
}

const DataModel: React.FC<IDataModel> = ({ sampleTextProp }) => {
  return (
    <Box sx={{ width: '100%' }} className={styles.container}>
      <Typography variant="h4" component="h4">
        Data Model
      </Typography>
      <UtilityBar />
      <Box className={styles.bodyContainer}>
        <Typography variant="body1" component="p">
          No tables have been added to your datamodel
        </Typography>
        <Button variant="contained" color="primary" className={styles.addTableButton}>
          Add Table
        </Button>
      </Box>
    </Box>
  );
};

export default DataModel;
