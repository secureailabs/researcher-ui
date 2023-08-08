/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataModelState } from './DataModelState';

export type UpdateDataModel_In = {
    /**
     * The state of the data model
     */
    state?: DataModelState;
    /**
     * The name of the data model
     */
    name?: string;
    /**
     * The description of the data model
     */
    description?: string;
    /**
     * The current version id of the data model
     */
    current_version_id?: string;
    current_editor_id?: string;
    current_editor_organization_id?: string;
};

