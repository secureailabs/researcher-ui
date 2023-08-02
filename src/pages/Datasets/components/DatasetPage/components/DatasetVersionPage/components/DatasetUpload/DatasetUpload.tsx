import Button from '@mui/material/Button';
import React, { useRef, ChangeEvent, useState } from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import CsvDisplay from './components/CsvDisplay/CsvDisplay';
import papaparse from 'papaparse';
import { useParams } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import { GetDataModelVersion_Out } from 'src/client';
import { validateFile } from './Validate';
import { uploadAndPublish } from './Utils';
import { DefaultService, UpdateDatasetVersion_In } from 'src/client';
import styles from './DatasetUpload.module.css';
import AppStripedDataGrid from 'src/components/AppStripedDataGrid';

export interface UploadProps {
  cell: {
    value: string;
  };
}

export type TFileInformation = {
  id: string;
  file: File | null;
  required: boolean;
  dataframeName: string;
  validationState: boolean;
};

export type TDatasetUploadProps = {
  refetch: () => void;
};

export function updateDatasetInfo(dataset_version_id: string, notes: string) {
  const datasetUpdate: UpdateDatasetVersion_In = {
    note: notes
  };
  DefaultService.updateDatasetVersion(dataset_version_id, datasetUpdate)
    .then(() => {
      console.log('Dataset updated', notes);
    })
    .catch((err) => {
      console.log('Dataset update failed! Error: ' + err);
    });
}

const UploadFile: React.FC<any> = ({
  cell: { value },
  currentFile,
  setCurrentFile,
  previewFile,
  processUploadedFile,
  showUploadButton
}) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  function handleSelectFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files;
    if (file?.length === 1) {
      setSelectedFile(file[0]);
      if (!currentFile) {
        setCurrentFile(file[0]);
        previewFile();
      }
      // call the validation function
      processUploadedFile(file[0], value);
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        mt: 1
      }}
    >
      <input type="file" ref={fileInputRef} accept="csv" style={{ display: 'none' }} onChange={handleSelectFile} />
      <Button onClick={handleButtonClick} disabled={!showUploadButton} variant="contained">
        Upload file
      </Button>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          wordBreak: 'break-all'
        }}
      >
        <Typography variant="caption" sx={{ mt: 1, mb: 1, fontStyle: 'italic', color: '#38855e' }}>
          {selectedFile?.name}
        </Typography>
      </Box>
    </Box>
  );
};

const DatasetUpload: React.FC<TDatasetUploadProps> = ({ refetch }) => {
  // State to keep track of the validation state of the dataframes
  const [dataModelVersion, setDataModelVersion] = React.useState<GetDataModelVersion_Out | null>(null);
  const [rows, setRows] = useState<any>([]);
  const [dataframeState, setDataframeState] = React.useState<TFileInformation[]>([]);
  const [currentFile, setCurrentFile] = React.useState<File | null>(null);
  const [allFilesValidated, setAllFilesValidated] = React.useState(false);
  const [sample_csv_data, setSampleCsvData] = React.useState<Array<any>>([]);
  const [logs, setLogs] = React.useState<string>('Wait.. Fetching data model..');
  const { version } = useParams() as { version: string };
  const [showUploadButton, setShowUploadButton] = React.useState(true);
  const [value, setValue] = React.useState<string | null>(null);

  const [inputValue, setInputValue] = React.useState('');

  function addLogMessage(message: string) {
    setLogs((prev) => prev + '\n' + message);
  }

  // Function to fetch all the dataframes from the backend for the data federation
  async function fetchDataModel() {
    const datafederation = await DefaultService.getAllDataFederations();

    if (!datafederation?.data_federations?.[0].data_model_id) {
      setLogs('No data model found for the data federation.');
      return;
    }
    const datamodel = await DefaultService.getDataModelInfo(datafederation.data_federations[0].data_model_id);
    if (!datamodel || !datamodel.current_version_id) {
      setLogs('No data model found for the data federation.');
      return;
    }
    const datamodelVersion = await DefaultService.getDataModelVersion(datamodel.current_version_id);
    const data_frames_validation_state: TFileInformation[] = [];
    const dataframes: TFileInformation[] = [];

    for (const dataframe of datamodelVersion.dataframes) {
      // tracking validation state of the data
      const dataframeFileInfo: TFileInformation = {
        id: dataframe.id,
        dataframeName: dataframe.name,
        file: null,
        required: true,
        validationState: false
      };

      dataframes.push(dataframeFileInfo);

      // Assign the validation state for the data frame to be false
      data_frames_validation_state.push(dataframeFileInfo);
    }

    setRows(dataframes);
    // Set the data model and the validation state
    setDataframeState(data_frames_validation_state);

    // Set the data model
    setDataModelVersion(datamodelVersion);

    // Add a log message
    setLogs('Data model fetched successfully.');
    setTimeout(() => {
      setLogs('');
    }, 1000);
  }

  React.useEffect(() => {
    fetchDataModel();
  }, []);

  React.useEffect(() => {
    if (dataModelVersion) {
      // check if all the files are validated
      const allFilesValidated = dataframeState.every((dataframe) => dataframe.validationState === true);
      setAllFilesValidated(allFilesValidated);
    }
  }, [dataframeState, dataModelVersion]);

  React.useEffect(() => {
    previewFile();
  }, [currentFile]);

  function processUploadedFile(fileToProcess: File, dataframeName: string) {
    if (fileToProcess && dataModelVersion) {
      const dataframeDataModel = dataModelVersion.dataframes.find((dataframe) => dataframe.name === dataframeName);
      if (!dataframeDataModel) {
        addLogMessage('Dataframe ' + dataframeName + ' is not present in the data model. Ignoring the file.');
        return;
      }
      // Validate file
      validateFile(fileToProcess, dataframeDataModel, addLogMessage)
        .then((result) => {
          if (result === true) {
            addLogMessage('Validation of file ' + fileToProcess.name + ' success!');
            // Update the validation state of the dataframe
            const updatedDataframeState = dataframeState.map((dataframe) => {
              if (dataframe.dataframeName === dataframeName) {
                dataframe.file = fileToProcess;
                dataframe.validationState = true;
              }
              return dataframe;
            });
            setDataframeState(updatedDataframeState);
          } else {
            addLogMessage('Validation of file ' + fileToProcess.name + ' failed!');
            // Update the validation state of the dataframe
            const updatedDataframeState = dataframeState.map((dataframe) => {
              if (dataframe.dataframeName === dataframeName) {
                dataframe.file = fileToProcess;
                dataframe.validationState = false;
              }
              return dataframe;
            });
            setDataframeState(updatedDataframeState);
          }
        })
        .catch((error) => {
          addLogMessage('Unexpected validation failure for ' + fileToProcess.name + error.toString());
        });
    }
  }

  function previewFile() {
    const csv_lines: Array<string> = [];
    var i = 0;
    if (currentFile) {
      papaparse.parse(currentFile, {
        header: false,
        preview: 10,
        step: function (results: { data: any }) {
          let csv_line = '';
          for (const key in results.data) {
            if (csv_line !== '') {
              csv_line += ',';
            }
            csv_line += results.data[key];
          }
          csv_lines.push(csv_line);
          if (i === 9) {
            setSampleCsvData(csv_lines);
          }
          i++;
        }
      });
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerClassName: 'table--header',
      headerName: 'ID',
      flex: 2,
      valueGetter: (params: any) => {
        return params.row.id ? params.row.id : '--';
      }
    },
    {
      field: 'dataframeName',
      headerClassName: 'table--header',
      headerName: 'Dataframe',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row?.dataframeName ? `${params.row?.dataframeName}` : '--';
      }
    },
    {
      field: 'validationState',
      headerClassName: 'table--header',
      headerName: 'Validation Success',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row?.validationState ? `${params.row?.validationState.toString()}` : '--';
      }
    },
    {
      field: 'required',
      headerClassName: 'table--header',
      headerName: 'Required',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row?.required ? `${params.row?.required.toString()}` : '--';
      }
    },
    {
      field: 'fileName',
      headerClassName: 'table--header',
      headerName: 'File',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <UploadFile
            cell={{ value: params.row?.dataframeName }}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            processUploadedFile={processUploadedFile}
            previewFile={previewFile}
            showUploadButton={showUploadButton}
          />
        );
      }
    }
  ];

  const dataframeOptions = Array.from(dataframeState).map((dataframeInfo) => dataframeInfo.dataframeName);

  return (
    <Box sx={{ width: '100%' }} className={styles.container}>
      <Box
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <AppStripedDataGrid columns={columns} rows={rows} />
      </Box>
      {currentFile && (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            alignContent: 'center',
            mt: 5
          }}
        >
          <Typography variant="h4">Preview data</Typography>
          <Autocomplete
            sx={{ width: '15%', mx: 2 }}
            disablePortal
            id="dataframe-dropdown"
            options={dataframeOptions}
            renderInput={(params) => <TextField {...params} label={dataframeOptions[0]} />}
            onChange={(event, newValue) => {
              if (newValue != null) {
                const dataframe = Array.from(dataframeState).find((dataframe) => dataframe.dataframeName === newValue && dataframe.file);

                if (dataframe) {
                  setCurrentFile(dataframe.file);
                  setValue(newValue);
                }
              }
            }}
            value={value}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          mt: 2
        }}
      >
        {sample_csv_data.length ? <CsvDisplay csvData={sample_csv_data} /> : null}
      </Box>
      <br />
      {logs && (
        <>
          <Typography sx={{ pt: 2 }} variant="h3">
            Status
          </Typography>
          <pre style={{ fontSize: '1rem', lineHeight: '2rem' }}>{logs}</pre>
        </>
      )}
      {allFilesValidated && showUploadButton && (
        <Button
          onClick={() => {
            const fileList: Array<File> = [];
            dataframeState.forEach((dataframe) => {
              if (dataframe.file) {
                fileList.push(dataframe.file);
              }
            });
            setShowUploadButton(false);
            uploadAndPublish(version, fileList, addLogMessage, refetch);
          }}
          variant="contained"
        >
          Upload and Publish
        </Button>
      )}
    </Box>
  );
};

export default DatasetUpload;
