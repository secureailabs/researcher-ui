/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * An enumeration.
 */
export enum SecureComputationNodeState {
    REQUESTED = 'REQUESTED',
    CREATING = 'CREATING',
    INITIALIZING = 'INITIALIZING',
    WAITING_FOR_DATA = 'WAITING_FOR_DATA',
    FAILED = 'FAILED',
    READY = 'READY',
    IN_USE = 'IN_USE',
    DELETED = 'DELETED',
    DELETING = 'DELETING',
    DELETE_FAILED = 'DELETE_FAILED',
}
