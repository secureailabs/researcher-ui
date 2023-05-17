/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserAccountState } from './UserAccountState';
import type { UserRole } from './UserRole';

export type UpdateUser_In = {
    job_title: string;
    role: UserRole;
    account_state: UserAccountState;
    avatar: string;
};

