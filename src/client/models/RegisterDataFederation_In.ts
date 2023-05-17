/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataFederationDataFormat } from './DataFederationDataFormat';

export type RegisterDataFederation_In = {
    name: string;
    description: string;
    data_format: DataFederationDataFormat;
    data_model_id?: string;
};

