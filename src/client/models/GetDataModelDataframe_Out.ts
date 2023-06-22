/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataModelDataframeState } from './DataModelDataframeState';

export type GetDataModelDataframe_Out = {
    name: string;
    description: string;
    data_model_id: string;
    id: string;
    creation_time?: string;
    organization_id: string;
    state: DataModelDataframeState;
};

