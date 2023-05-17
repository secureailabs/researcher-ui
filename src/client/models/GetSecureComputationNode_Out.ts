/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasicObjectInfo } from './BasicObjectInfo';
import type { DatasetBasicInformation } from './DatasetBasicInformation';
import type { SecureComputationNodeState } from './SecureComputationNodeState';

export type GetSecureComputationNode_Out = {
    id: string;
    data_federation: BasicObjectInfo;
    datasets: Array<DatasetBasicInformation>;
    researcher?: BasicObjectInfo;
    researcher_user: string;
    timestamp: string;
    state: SecureComputationNodeState;
    detail?: string;
    ipaddress?: string;
};

