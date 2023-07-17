/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasicObjectInfo } from './BasicObjectInfo';
import type { DataModelState } from './DataModelState';

export type GetDataModel_Out = {
    name: string;
    description: string;
    tags?: Array<string>;
    id: string;
    creation_time?: string;
    maintainer_organization: BasicObjectInfo;
    current_version_id?: string;
    state: DataModelState;
};

