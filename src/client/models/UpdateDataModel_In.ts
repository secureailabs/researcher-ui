/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataModelState } from './DataModelState';

export type UpdateDataModel_In = {
    /**
     * The data_model_dataframes to add to the data model
     */
    data_model_dataframe_to_add?: Array<string>;
    /**
     * The data_model_dataframes to remove from the data model
     */
    data_model_dataframe_to_remove?: Array<string>;
    /**
     * The state of the data model
     */
    state?: DataModelState;
};

