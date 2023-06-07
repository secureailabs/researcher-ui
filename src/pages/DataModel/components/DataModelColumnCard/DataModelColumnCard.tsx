import { Box, Grid, IconButton, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import styles from './DataModelColumnCard.module.css';
import DeleteConfirmationModal from 'src/components/DeleteConfirmationModal';
import { useState } from 'react';

export interface IDataModelColumnCard {
  columnData: any;
  handleEditClicked: (columnData: any) => void;
  handleDeleteClicked: (columnData: any) => void;
}

const DataModelColumnCard: React.FC<IDataModelColumnCard> = ({ columnData, handleEditClicked, handleDeleteClicked }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    handleDeleteClicked(columnData);
    setOpenDeleteModal(false);
  };

  return (
    <Box className={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                flex: 2
              }}
            >
              <Typography variant="body1" component="p">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 'bold'
                  }}
                >
                  Name
                </Typography>
                {columnData.name}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                textAlign: 'right'
              }}
            >
              <IconButton
                aria-label="delete"
                onClick={() => {
                  handleEditClicked(columnData);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => {
                  handleOpenDeleteModal();
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" component="p">
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold'
              }}
            >
              Description
            </Typography>
            {columnData.description}
          </Typography>
        </Grid>
        {Object.keys(columnData.series_schema).map((key) => {
          if (['list_values', 'min', 'max', 'resolution', 'type', 'unit'].includes(key) && columnData.series_schema[key] !== null) {
            return (
              <Grid item xs={6}>
                <Typography variant="body1" component="p">
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}
                  >
                    {key}
                  </Typography>
                  {columnData.series_schema[key]}
                </Typography>
              </Grid>
            );
          }
        })}
      </Grid>
      <DeleteConfirmationModal
        openDeleteModal={openDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default DataModelColumnCard;
