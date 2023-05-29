/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasicObjectInfo } from './BasicObjectInfo';
import type { DatasetFormat } from './DatasetFormat';
import type { DatasetState } from './DatasetState';

export type GetDataset_Out = {
    name: string;
    description: string;
    tags: string;
    format: DatasetFormat;
    id: string;
    creation_time?: string;
    organization: BasicObjectInfo;
    state: DatasetState;
    note?: string;
};

