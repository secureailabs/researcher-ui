/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_dataset } from '../models/Body_upload_dataset';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Upload Dataset
     * Upload new data to File Share
     * @param datasetVersionId Dataset Version Id
     * @param formData
     * @returns any Dataset Id
     * @throws ApiError
     */
    public static uploadDataset(
        datasetVersionId: string,
        formData: Body_upload_dataset,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/upload-dataset',
            query: {
                'dataset_version_id': datasetVersionId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
