/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserRole } from './UserRole';

export type RegisterOrganization_In = {
    name: string;
    description: string;
    avatar?: string;
    admin_name: string;
    admin_job_title: string;
    admin_email: string;
    admin_password: string;
    admin_avatar?: string;
    admin_roles: Array<UserRole>;
};

