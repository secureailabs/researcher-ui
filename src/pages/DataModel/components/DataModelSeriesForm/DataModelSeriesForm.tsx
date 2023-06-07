import { IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Box, Button, Typography } from '@mui/material';
import styles from './DataModelSeriesForm.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import uuid from 'react-uuid';
import { DataModelDataframeState, DefaultService } from 'src/client';

export interface IDataModelSeriesForm {
  handleCloseModal: () => void;
  dataModelId: string;
  handleSuccessfulSave: () => void;
}

const DataModelSeriesTypeEnums = [
  'SeriesDataModelCategorical',
  'SeriesDataModelDate',
  'SeriesDataModelDateTime',
  'SeriesDataModelInterval',
  'SeriesDataModelUnique'
];

const DataModelSeriesForm: React.FC<IDataModelSeriesForm> = ({ handleCloseModal, dataModelId, handleSuccessfulSave }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [values, setValues] = useState<string>('');
  const [min, setMin] = useState<number | ''>('');
  const [max, setMax] = useState<number | ''>('');
  const [unit, setUnit] = useState<string>('');
  const [resolution, setResolution] = useState<number | ''>('');

  const handleSaveDataModelSeries = async () => {
    const newUUID = uuid();
    const series_schema: any = {
      type,
      series_name: name,
      series_data_model_id: uuid()
    };

    const properties = {
      list_value: values,
      unit,
      min,
      max,
      resolution
    };

    for (const [key, value] of Object.entries(properties)) {
      if (value) {
        series_schema[key] = value;
      }
    }

    const res = await DefaultService.registerDataModelSeries({
      name,
      description,
      series_schema
    });

    return res;
  };

  const handleUpdateDataModelDataframe = async (dataModelSeriesId: string) => {
    const requestBody = {
      data_model_series_to_add: [dataModelSeriesId],
      state: DataModelDataframeState.ACTIVE
    };
    const res = await DefaultService.updateDataModelDataframe(dataModelId, requestBody);
    return res;
  };

  const handleSaveButtonClicked = async () => {
    try {
      const res = await handleSaveDataModelSeries();
      const finalRes = await handleUpdateDataModelDataframe(res.id);
      handleSuccessfulSave();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        p: 2,
        pb: 4,
        px: 4
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h5">Add DataModel Series</Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: 0,
          right: 0,
          transform: 'translate(50%, -50%)',
          bgcolor: 'background.paper',
          border: '1px solid #f5f5f5',
          borderRadius: '50%'
        }}
      >
        <IconButton aria-label="close" onClick={handleCloseModal}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <TextField
          id="column-name"
          label="Column Name"
          variant="outlined"
          className={styles.modalInput}
          onChange={(e) => setName(e.target.value as string)}
          value={name}
        />
        <TextField
          multiline
          rows={2}
          id="description"
          label="Description"
          variant="outlined"
          className={styles.modalInput}
          onChange={(e) => setDescription(e.target.value as string)}
          value={description}
        />
        <FormControl fullWidth className={styles.modalInput}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value as string)}
          >
            {DataModelSeriesTypeEnums.map((type) => {
              return (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {type === 'SeriesDataModelCategorical' ? (
          <TextField id="values" label="Values" variant="outlined" className={styles.modalInput} />
        ) : null}
        {type === 'SeriesDataModelInterval' ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '20px'
            }}
          >
            <TextField id="min" label="Min" variant="outlined" className={styles.modalInput} type="number" />
            <TextField id="Max" label="Max" variant="outlined" className={styles.modalInput} type="number" />
            <TextField id="unit" label="Unit" variant="outlined" className={styles.modalInput} />
            <TextField id="resolution" label="resolution" variant="outlined" className={styles.modalInput} type="number" />
          </Box>
        ) : null}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          mt: 5
        }}
      >
        <Button
          variant="contained"
          color="primary"
          className={styles.modalButton}
          sx={{
            width: '200px',
            marginLeft: '1rem'
          }}
          onClick={handleSaveButtonClicked}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          className={styles.modalButton}
          sx={{
            width: '100px'
          }}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default DataModelSeriesForm;
