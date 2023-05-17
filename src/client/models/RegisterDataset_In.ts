/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DatasetFormat } from './DatasetFormat';

export type RegisterDataset_In = {
    name: string;
    description: string;
    tags: string;
    format: DatasetFormat;
};

