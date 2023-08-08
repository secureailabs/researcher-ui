/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserAccountState } from './UserAccountState';
import type { UserRole } from './UserRole';

export type UpdateUser_In = {
    job_title?: string;
    roles?: Array<UserRole>;
    account_state?: UserAccountState;
    avatar?: string;
};

