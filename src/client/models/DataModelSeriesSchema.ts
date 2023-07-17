/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SeriesDataModelType } from './SeriesDataModelType';

export type DataModelSeriesSchema = {
    type: SeriesDataModelType;
    series_name: string;
    list_value?: Array<string>;
    unit?: string;
    min?: number;
    max?: number;
    resolution?: number;
};

