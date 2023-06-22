/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataModelSeriesState } from './DataModelSeriesState';
import type { SeriesDataModelSchema } from './SeriesDataModelSchema';

export type UpdateDataModelSeries_In = {
    series_schema?: SeriesDataModelSchema;
    name?: string;
    description?: string;
    state?: DataModelSeriesState;
};

