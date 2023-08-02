import { IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Box, Button, Typography } from '@mui/material';
import styles from './DataModelSeriesForm.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { DataModelSeries, GetDataModelVersion_Out, SeriesDataModelType } from 'src/client';
import useNotification from 'src/hooks/useNotification';

export interface IDataModelSeriesForm {
  handleCloseModal: () => void;
  dataModelDataframeId: string;
  selectedColumn: DataModelSeries;
  mode: 'new' | 'edit';
  dataModelVersion: GetDataModelVersion_Out;
  setDataModelVersion: (dataModelVersion: GetDataModelVersion_Out) => void;
}

const DataModelSeriesForm: React.FC<IDataModelSeriesForm> = ({
  handleCloseModal,
  dataModelDataframeId,
  dataModelVersion,
  setDataModelVersion,
  selectedColumn,
  mode
}) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<SeriesDataModelType>(SeriesDataModelType.SERIES_DATA_MODEL_CATEGORICAL);
  const [values, setValues] = useState<string | null>(null);
  const [min, setMin] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);
  const [unit, setUnit] = useState<string | null>(null);
  const [resolution, setResolution] = useState<number | null>(null);
  const [sendNotification] = useNotification();

  const handleSaveDataModelSeries = async () => {
    // convert values from comma separated string to array
    const valuesArray = values?.split(',');
    const series: DataModelSeries = {
      id: selectedColumn.id,
      name: name,
      description: description,
      series_schema: {
        type: type,
        list_value: valuesArray,
        unit: unit ?? undefined,
        min: min ?? undefined,
        max: max ?? undefined,
        resolution: resolution ?? undefined
      }
    };

    // Get the data model dataframe from the data model version
    const dataModelDataframe = dataModelVersion.dataframes.find((df) => df.id === dataModelDataframeId);

    // Add the new series to the data model dataframe
    if (dataModelDataframe && dataModelDataframe.series) {
      // Remove the old series if it is an edit mode
      if (mode === 'edit') {
        const oldSeries = dataModelDataframe?.series.find((s) => s.id === selectedColumn.id);
        if (oldSeries) {
          const newSeries = dataModelDataframe.series.filter((s) => s.id !== oldSeries.id);
          dataModelDataframe.series = newSeries;
        }
      }

      const newDataModelDataframe = {
        ...dataModelDataframe,
        series: [...dataModelDataframe.series, series]
      };

      // Check if the series name is already in use
      const existingSeriesNames = dataModelDataframe.series.map((s) => s.name);
      if (mode === 'new' && existingSeriesNames.includes(name)) {
        sendNotification({
          msg: 'Series name already exists. Kindly choose a different name.',
          variant: 'error'
        });
        return;
      }

      // Update the data model version with the new data model dataframe
      const newDataModelVersion = {
        ...dataModelVersion,
        dataframes: dataModelVersion.dataframes.map((df) => {
          if (df.id === dataModelDataframeId) {
            return newDataModelDataframe;
          }
          return df;
        })
      };

      // Update the data model version in the state
      setDataModelVersion(newDataModelVersion);

      if (mode === 'new') {
        sendNotification({
          msg: 'Data Column Added Successfully',
          variant: 'success'
        });
      } else {
        sendNotification({
          msg: 'Data Column Updated Successfully',
          variant: 'success'
        });
      }
    } else {
      sendNotification({
        msg: 'Something went wrong',
        variant: 'error'
      });
    }
  };

  const handleSaveButtonClicked = async () => {
    try {
      const res = await handleSaveDataModelSeries();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedColumn && mode !== 'new') {
      setName(selectedColumn.name);
      setDescription(selectedColumn.description);
      setType(selectedColumn.series_schema.type);
      setValues(selectedColumn.series_schema.list_value?.join(',') ?? null);
      setMin(selectedColumn.series_schema.min ?? null);
      setMax(selectedColumn.series_schema.max ?? null);
      setUnit(selectedColumn.series_schema.unit ?? null);
      setResolution(selectedColumn.series_schema.resolution ?? null);
    }
  }, [selectedColumn, mode]);

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
        {mode === 'new' ? (
          <Typography variant="h5">Add DataModel Series</Typography>
        ) : (
          <Typography variant="h5">Edit DataModel Series</Typography>
        )}
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
            onChange={(e) => setType(e.target.value as SeriesDataModelType)}
          >
            {Object.values(SeriesDataModelType).map((type) => {
              return (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {type === 'SeriesDataModelCategorical' ? (
          <TextField
            id="values"
            label="Values"
            variant="outlined"
            className={styles.modalInput}
            onChange={(e) => setValues(e.target.value)}
          />
        ) : null}
        {type === 'SeriesDataModelInterval' ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '20px'
            }}
          >
            <TextField
              id="min"
              label="Min"
              variant="outlined"
              className={styles.modalInput}
              type="number"
              onChange={(e) => setMin(Number(e.target.value))}
            />
            <TextField
              id="Max"
              label="Max"
              variant="outlined"
              className={styles.modalInput}
              type="number"
              onChange={(e) => setMax(Number(e.target.value))}
            />
            <TextField id="unit" label="Unit" variant="outlined" className={styles.modalInput} onChange={(e) => setUnit(e.target.value)} />
            <TextField
              id="resolution"
              label="resolution"
              variant="outlined"
              className={styles.modalInput}
              type="number"
              onChange={(e) => setResolution(Number(e.target.value))}
            />
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
