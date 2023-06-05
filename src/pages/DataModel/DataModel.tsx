import { Box, Button, Drawer, Typography } from '@mui/material';
import styles from './DataModel.module.css';
import UtilityBar from './components/UtilityBar';
import { useState } from 'react';
import AddNewDataModel from './components/AddNewDataModel';

export interface IDataModel {
  sampleTextProp: string;
}

const DataModel: React.FC<IDataModel> = ({ sampleTextProp }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

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
        <Button variant="contained" color="primary" className={styles.addTableButton} onClick={() => setOpenDrawer(true)}>
          Add Table
        </Button>
      </Box>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { width: '50%', padding: '20px 0 0 20px' }
        }}
      >
        <AddNewDataModel />
      </Drawer>
    </Box>
  );
};

export default DataModel;
