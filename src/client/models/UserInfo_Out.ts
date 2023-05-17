/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasicObjectInfo } from './BasicObjectInfo';
import type { UserRole } from './UserRole';

export type UserInfo_Out = {
    name: string;
    email: string;
    job_title: string;
    role: UserRole;
    avatar?: string;
    id: string;
    organization: BasicObjectInfo;
};

