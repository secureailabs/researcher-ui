import { DefaultService, OpenAPI, Body_upload_dataset } from 'src/datasetUpload';
import { updateDatasetInfo } from './DatasetUpload';
import { REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL } from 'src/config';

export function uploadAndPublish(
  dataset_version_id: string,
  selectedFiles: File[] | null,
  addLogMessage: (message: string) => void,
  refetch_data_version: () => void
) {
  let notes = '';
  OpenAPI.BASE = REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL;
  // if (!process.env.REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL) throw new Error('REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL not set');

  // OpenAPI.BASE = process.env.REACT_APP_SAIL_DATA_UPLOAD_SERVICE_URL;

  OpenAPI.TOKEN = localStorage.getItem('accessToken') || '';
  if (selectedFiles) {
    const file_blobs: Body_upload_dataset = {
      dataset_files: []
    };
    for (let i = 0; i < selectedFiles.length; i++) {
      addLogMessage('Uploading ' + selectedFiles[i].name + '...');
      notes = notes + 'Uploaded ' + selectedFiles[i].name + '\n';
      file_blobs.dataset_files.push(selectedFiles[i]);
    }
    DefaultService.uploadDataset(dataset_version_id, file_blobs)
      .then(() => {
        addLogMessage('Upload of all files success!');
        updateDatasetInfo(dataset_version_id, notes);
        setTimeout(() => {
          refetch_data_version();
        }, 2000);
      })
      .catch((err) => {
        addLogMessage('Upload of all files failed! Error: ' + err);
      });
  }
}
