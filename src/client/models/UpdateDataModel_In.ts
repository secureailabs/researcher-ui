/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataModelState } from './DataModelState';

export type UpdateDataModel_In = {
    /**
     * The state of the data model
     */
    state?: DataModelState;
    /**
     * The name of the data model
     */
    name?: string;
    /**
     * The description of the data model
     */
    description?: string;
};

