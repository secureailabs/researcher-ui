/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasicObjectInfo } from './BasicObjectInfo';
import type { DatasetVersionState } from './DatasetVersionState';

export type GetDatasetVersion_Out = {
    dataset_id: string;
    description: string;
    name: string;
    id: string;
    dataset_version_created_time: string;
    organization: BasicObjectInfo;
    state: DatasetVersionState;
    note: string;
};

