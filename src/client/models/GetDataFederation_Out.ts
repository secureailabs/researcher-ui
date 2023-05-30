/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasicObjectInfo } from './BasicObjectInfo';
import type { DataFederationDataFormat } from './DataFederationDataFormat';
import type { DataFederationState } from './DataFederationState';

export type GetDataFederation_Out = {
    name: string;
    description: string;
    data_format: DataFederationDataFormat;
    data_model_id?: string;
    id: string;
    creation_time?: string;
    organization: BasicObjectInfo;
    state: DataFederationState;
    data_submitter_organizations: Array<BasicObjectInfo>;
    research_organizations: Array<BasicObjectInfo>;
    datasets: Array<BasicObjectInfo>;
    data_submitter_organizations_invites_id?: Array<string>;
    research_organizations_invites_id?: Array<string>;
};

