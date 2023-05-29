/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SeriesDataModelSchema = {
    type: string;
    series_name: string;
    series_data_model_id: string;
    list_value?: Array<string>;
    unit?: string;
    min?: number;
    max?: number;
    resolution?: number;
};

