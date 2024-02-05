import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Box,
} from '@mui/material';
import { useState } from 'react';
import styles from './NewCohortDialog.module.css';

export interface INewCohortDialog {
  sampleTextProp: string;
  openNewCohortDialog: boolean;
  handleNewCohortDialogClose: () => void;
  handleNewCohortDialogSave: (cohortLabel: string) => void;
}

const NewCohortDialog: React.FC<INewCohortDialog> = ({
  openNewCohortDialog,
  handleNewCohortDialogClose,
  handleNewCohortDialogSave,
}) => {
  const [cohortLabel, setCohortLabel] = useState<string>('');

  const handleSaveCohort = (): void => {
    handleNewCohortDialogSave(cohortLabel);
    setCohortLabel('');
  };

  return (
    <Box>
      <Dialog
        fullWidth
        open={openNewCohortDialog}
        onClose={handleNewCohortDialogClose}
      >
        <DialogTitle>Save your cohort</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cohort Label"
            type="text"
            fullWidth
            variant="standard"
            value={cohortLabel}
            onChange={(e) => {
              setCohortLabel(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewCohortDialogClose}>Cancel</Button>
          <Button onClick={handleSaveCohort}>SAVE</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewCohortDialog;
