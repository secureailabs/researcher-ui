import React, { useRef, ChangeEvent } from 'react';
import { Box, Button } from '@mui/material';
import papaparse from 'papaparse';
import { useParams } from 'react-router-dom';
import { SeriesDataModelSchema } from 'src/client';
import { validateFile } from '../../Validate';

export interface UploadProps {
  cell: {
    value: string;
  };
}

export type TFileInformation = {
  file: File | null;
  required: boolean;
  dataframeName: string;
  dataframeId: string;
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

const UploadCell: React.FC<UploadProps> = ({ cell: { value } }) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [currentFile, setCurrentFile] = React.useState<File | null>(null);
  const [sample_csv_data, setSampleCsvData] = React.useState<Array<any>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  const [dataModel, setDataModel] = React.useState<TDataModel | null>(null);
  const [dataframeState, setDataframeState] = React.useState<
    TFileInformation[]
  >([]);
  const [logs, setLogs] = React.useState<string>(
    'Wait.. Fetching data model..'
  );
  const { version } = useParams() as { version: string };
  const [showUploadButton, setShowUploadButton] = React.useState(true);

  function addLogMessage(message: string) {
    setLogs((prev) => prev + '\n' + message);
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
      // Validate the file
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
    let i = 0;
    currentFile
      ? papaparse.parse(currentFile, {
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
      : null;
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
      >
        Browse
      </Button>
      <Box style={{ marginLeft: '1rem' }}>{selectedFile?.name}</Box>
    </Box>
  );
};
