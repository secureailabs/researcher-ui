/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataModelSeriesSchema } from './DataModelSeriesSchema';

export type DataModelSeries = {
    id?: string;
    name: string;
    description: string;
    series_schema: DataModelSeriesSchema;
};

