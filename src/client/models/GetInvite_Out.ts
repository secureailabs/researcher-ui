/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasicObjectInfo } from './BasicObjectInfo';
import type { InviteState } from './InviteState';
import type { InviteType } from './InviteType';

export type GetInvite_Out = {
    id: string;
    data_federation: BasicObjectInfo;
    inviter_user: BasicObjectInfo;
    inviter_organization: BasicObjectInfo;
    state: InviteState;
    created_time: string;
    expiry_time: string;
    type: InviteType;
};

