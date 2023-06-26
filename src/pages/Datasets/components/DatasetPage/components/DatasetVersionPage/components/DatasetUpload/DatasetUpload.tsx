import Button from '@mui/material/Button';
import React, { useRef, ChangeEvent, useState } from 'react';
import { Box } from '@mui/material';
import CsvDisplay from './components/CsvDisplay/CsvDisplay';
import papaparse from 'papaparse';
import { useParams } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import DataGridTable from 'src/components/datagrid';
import { SeriesDataModelSchema } from 'src/client';
import { validateFile } from './Validate';
import { uploadAndPublish } from './Utils';
import { DefaultService, UpdateDatasetVersion_In } from 'src/client';


export interface UploadProps {
  cell: {
    value: string;
  };
}

export type TFileInformation = {
  file: File | null;
  required: boolean;
  dataframeName: string;
  id: string;
  validationState: boolean;
};

export type TDataFrameDataModel = {
  type: string;
  data_frame_name: string;
  data_frame_data_model_id: string;
  list_series_data_model: SeriesDataModelSchema[];
};

export type TDataModel = {
  data_model_id: string;
  data_model_name: string;
  data_model_dataframes: TDataFrameDataModel[];
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

const DatasetUpload: React.FC<TDatasetUploadProps> = ({ refetch }) => {
  // State to keep track of the validation state of the dataframes
  const [dataModel, setDataModel] = React.useState<TDataModel | null>(null);
  const [rows, setRows] = useState<any>([]);
  const [dataframeState, setDataframeState] = React.useState<
    TFileInformation[]
  >([]);
  const [currentFile, setCurrentFile] = React.useState<File | null>(null);
  const [allFilesValidated, setAllFilesValidated] = React.useState(false);
  const [sample_csv_data, setSampleCsvData] = React.useState<Array<any>>([]);
  const [logs, setLogs] = React.useState<string>(
    'Wait.. Fetching data model..'
  );
  const { version } = useParams() as { version: string };
  const [showUploadButton, setShowUploadButton] = React.useState(true);

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
    const datamodel = await DefaultService.getDataModelInfo(
      datafederation.data_federations[0].data_model_id
    );

    const data_model: TDataModel = {
      data_model_id: datamodel.id,
      data_model_name: datamodel.name,
      data_model_dataframes: []
    };

    const data_frames_validation_state: TFileInformation[] = [];

    const dataframes = [];

    for (const dataframe_id of datamodel.data_model_dataframes) {
      const dataframe = await DefaultService.getDataModelDataframeInfo(
        dataframe_id
      );

      // tracking validation state of the data
      const dataframeFileInfo: TFileInformation = {
        id: dataframe.id,
        dataframeName: dataframe.name,
        file: null,
        required: true,
        validationState: false
      };

      dataframes.push(dataframeFileInfo);

      // Create a data frame data model object
      const data_frame_data_model: TDataFrameDataModel = {
        data_frame_name: dataframe.name,
        data_frame_data_model_id: dataframe.id,
        type: dataframe.name,
        list_series_data_model: []
      };

      // Fetch the data model series info
      const promises = dataframe.data_model_series.map(async (seriesId) => {
        const seriesInfo = await DefaultService.getDataModelSeriesInfo(
          seriesId
        );
        data_frame_data_model.list_series_data_model.push(
          seriesInfo.series_schema
        );
      });
      await Promise.all(promises);

      // Add the data frame data model object to the data model object
      data_model.data_model_dataframes.push(data_frame_data_model);

      // Assign the validation state for the data frame to be false
      data_frames_validation_state.push(dataframeFileInfo);
    }

    setRows(dataframes);
    console.log(dataframes, 'dataframes');
    // Set the data model and the validation state
    setDataframeState(data_frames_validation_state);

    // Set the data model
    setDataModel(data_model);

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
    validateFiles();
  }, [dataframeState]);

  /* React.useEffect(() => {
     previewFile();
   }, [currentFile]); */

  function validateFiles() {
    if (dataModel) {
      // check if all the files are validated
      const allFilesValidated = dataframeState.every(
        (dataframe) => dataframe.validationState === true
      );
      setAllFilesValidated(allFilesValidated);
    }
  }

  function processUploadedFile(fileToProcess: File, dataframeName: string) {
    if (fileToProcess && dataModel) {
      const dataframeDataModel = dataModel.data_model_dataframes.find(
        (dataframe) => dataframe.data_frame_name === dataframeName
      );
      if (!dataframeDataModel) {
        addLogMessage(
          'Dataframe ' +
          dataframeName +
          ' is not present in the data model. Ignoring the file.'
        );
        return;
      }
      // Validate file
      validateFile(fileToProcess, dataframeDataModel, addLogMessage)
        .then((result) => {
          if (result === true) {
            addLogMessage(
              'Validation of file ' + fileToProcess.name + ' success!'
            );
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
            addLogMessage(
              'Validation of file ' + fileToProcess.name + ' failed!'
            );
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
          addLogMessage(
            'Unexpected validation failure for ' +
            fileToProcess.name +
            error.toString()
          );
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
            if (csv_line != '') {
              csv_line += ',';
            }
            csv_line += results.data[key];
          }
          csv_lines.push(csv_line);
          if (i == 9) {
            setSampleCsvData(csv_lines);
          }
          i++;
        }
      })
    }
  }

  const UploadFile: React.FC<UploadProps> = ({ cell: { value } }) => {
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
      <Box display="flex" flexWrap="nowrap">
        <input
          type="file"
          ref={fileInputRef}
          accept="csv"
          style={{ display: 'none' }}
          onChange={handleSelectFile}
        />
        <Button
          onClick={handleButtonClick}
          disabled={!showUploadButton}
          variant="contained"
        >
          Browse
        </Button>
        <Box style={{ marginLeft: '1rem' }}>{selectedFile?.name}</Box>
      </Box>
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerClassName: 'id',
      headerName: 'ID',
      flex: 2,
      valueGetter: (params: any) => {
        return params.row.id ? params.row.id : '--';
      },
    },
    {
      field: 'dataframeName',
      headerClassName: 'dataframeName',
      headerName: 'Dataframe',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row?.dataframeName ? `${params.row?.dataframeName}` : '--';
      }
    },
    {
      field: 'validationState',
      headerClassName: 'validationState',
      headerName: 'Validation Success',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row?.validationState ? `${params.row?.validationState.toString()}` : '--';
      }
    },
    {
      field: 'required',
      headerClassName: 'required',
      headerName: 'Required',
      flex: 1,
      valueGetter: (params: any) => {
        return params.row?.required ? `${params.row?.required.toString()}` : '--';
      }
    },
    {
      field: 'fileName',
      headerClassName: 'fileName',
      headerName: 'File',
      flex: 1,
      renderCell: (params: any) => (
        <UploadFile cell={params.row?.dataframeName} />
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', p: '1rem' }}>
      <DataGridTable
        columns={columns}
        rows={rows}
      />
    </Box>
  );
};

export default DatasetUpload;
