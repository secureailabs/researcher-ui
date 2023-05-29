/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataModelState } from './DataModelState';

export type GetDataModel_Out = {
    name: string;
    description: string;
    id: string;
    creation_time?: string;
    organization_id: string;
    data_model_dataframes: Array<string>;
    state: DataModelState;
};

