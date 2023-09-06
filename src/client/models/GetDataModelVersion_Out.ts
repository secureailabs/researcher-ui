/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataModelDataframe } from './DataModelDataframe';
import type { DataModelVersionBasicInfo } from './DataModelVersionBasicInfo';
import type { DataModelVersionState } from './DataModelVersionState';

export type GetDataModelVersion_Out = {
    name: string;
    description: string;
    data_model_id: string;
    previous_version_id?: string;
    id: string;
    creation_time?: string;
    last_save_time?: string;
    commit_time?: string;
    commit_message?: string;
    organization_id: string;
    user_id: string;
    dataframes: Array<DataModelDataframe>;
    state: DataModelVersionState;
    revision_history?: Array<DataModelVersionBasicInfo>;
};

