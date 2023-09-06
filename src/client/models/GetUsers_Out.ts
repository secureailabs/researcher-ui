/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasicObjectInfo } from './BasicObjectInfo';
import type { UserRole } from './UserRole';

export type GetUsers_Out = {
    name: string;
    email: string;
    job_title: string;
    roles: Array<UserRole>;
    avatar?: string;
    id: string;
    organization: BasicObjectInfo;
};

