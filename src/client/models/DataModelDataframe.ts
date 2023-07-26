/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataModelSeries } from './DataModelSeries';

export type DataModelDataframe = {
  id: string;
  name: string;
  description: string;
  series: Array<DataModelSeries>;
};
