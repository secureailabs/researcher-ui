/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataModelSeriesState } from './DataModelSeriesState';
import type { SeriesDataModelSchema } from './SeriesDataModelSchema';

export type GetDataModelSeries_Out = {
    name: string;
    description: string;
    series_schema: SeriesDataModelSchema;
    data_model_dataframe_id: string;
    id: string;
    creation_time?: string;
    organization_id: string;
    state: DataModelSeriesState;
};

