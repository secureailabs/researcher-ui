/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataModelSeries } from './DataModelSeries';

export type DataModelDataframe = {
    name: string;
    description: string;
    series?: Array<DataModelSeries>;
};

