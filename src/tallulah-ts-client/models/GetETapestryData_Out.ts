/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountInfo } from './AccountInfo';
import type { ETapestryDataState } from './ETapestryDataState';

export type GetETapestryData_Out = {
    repository_id: string;
    account: AccountInfo;
    state?: ETapestryDataState;
    notes?: string;
    tags?: Array<string>;
    photos?: Array<string>;
    videos?: Array<string>;
    id: string;
    creation_time?: string;
};
