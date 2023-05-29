/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login } from '../models/Body_login';
import type { DatasetEncryptionKey_Out } from '../models/DatasetEncryptionKey_Out';
import type { GetDataFederation_Out } from '../models/GetDataFederation_Out';
import type { GetDataModel_Out } from '../models/GetDataModel_Out';
import type { GetDataModelDataframe_Out } from '../models/GetDataModelDataframe_Out';
import type { GetDataModelSeries_Out } from '../models/GetDataModelSeries_Out';
import type { GetDataset_Out } from '../models/GetDataset_Out';
import type { GetDatasetVersion_Out } from '../models/GetDatasetVersion_Out';
import type { GetDatasetVersionConnectionString_Out } from '../models/GetDatasetVersionConnectionString_Out';
import type { GetInvite_Out } from '../models/GetInvite_Out';
import type { GetMultipleDataFederation_Out } from '../models/GetMultipleDataFederation_Out';
import type { GetMultipleDataModel_Out } from '../models/GetMultipleDataModel_Out';
import type { GetMultipleDataModelDataframe_Out } from '../models/GetMultipleDataModelDataframe_Out';
import type { GetMultipleDataModelSeries_Out } from '../models/GetMultipleDataModelSeries_Out';
import type { GetMultipleDataset_Out } from '../models/GetMultipleDataset_Out';
import type { GetMultipleDatasetVersion_Out } from '../models/GetMultipleDatasetVersion_Out';
import type { GetMultipleInvite_Out } from '../models/GetMultipleInvite_Out';
import type { GetMultipleOrganizations_Out } from '../models/GetMultipleOrganizations_Out';
import type { GetMultipleSecureComputationNode_Out } from '../models/GetMultipleSecureComputationNode_Out';
import type { GetMultipleUsers_Out } from '../models/GetMultipleUsers_Out';
import type { GetOrganizations_Out } from '../models/GetOrganizations_Out';
import type { GetSecureComputationNode_Out } from '../models/GetSecureComputationNode_Out';
import type { GetUsers_Out } from '../models/GetUsers_Out';
import type { LoginSuccess_Out } from '../models/LoginSuccess_Out';
import type { PatchInvite_In } from '../models/PatchInvite_In';
import type { QueryResult } from '../models/QueryResult';
import type { RefreshToken_In } from '../models/RefreshToken_In';
import type { RegisterDataFederation_In } from '../models/RegisterDataFederation_In';
import type { RegisterDataFederation_Out } from '../models/RegisterDataFederation_Out';
import type { RegisterDataModel_In } from '../models/RegisterDataModel_In';
import type { RegisterDataModel_Out } from '../models/RegisterDataModel_Out';
import type { RegisterDataModelDataframe_In } from '../models/RegisterDataModelDataframe_In';
import type { RegisterDataModelDataframe_Out } from '../models/RegisterDataModelDataframe_Out';
import type { RegisterDataModelSeries_In } from '../models/RegisterDataModelSeries_In';
import type { RegisterDataModelSeries_Out } from '../models/RegisterDataModelSeries_Out';
import type { RegisterDataset_In } from '../models/RegisterDataset_In';
import type { RegisterDataset_Out } from '../models/RegisterDataset_Out';
import type { RegisterDatasetVersion_In } from '../models/RegisterDatasetVersion_In';
import type { RegisterDatasetVersion_Out } from '../models/RegisterDatasetVersion_Out';
import type { RegisterOrganization_In } from '../models/RegisterOrganization_In';
import type { RegisterOrganization_Out } from '../models/RegisterOrganization_Out';
import type { RegisterSecureComputationNode_In } from '../models/RegisterSecureComputationNode_In';
import type { RegisterSecureComputationNode_Out } from '../models/RegisterSecureComputationNode_Out';
import type { RegisterUser_In } from '../models/RegisterUser_In';
import type { RegisterUser_Out } from '../models/RegisterUser_Out';
import type { UpdateDataFederation_In } from '../models/UpdateDataFederation_In';
import type { UpdateDataModel_In } from '../models/UpdateDataModel_In';
import type { UpdateDataModelDataframe_In } from '../models/UpdateDataModelDataframe_In';
import type { UpdateDataModelSeries_In } from '../models/UpdateDataModelSeries_In';
import type { UpdateDataset_In } from '../models/UpdateDataset_In';
import type { UpdateDatasetVersion_In } from '../models/UpdateDatasetVersion_In';
import type { UpdateOrganization_In } from '../models/UpdateOrganization_In';
import type { UpdateSecureComputationNode_In } from '../models/UpdateSecureComputationNode_In';
import type { UpdateUser_In } from '../models/UpdateUser_In';
import type { UserInfo_Out } from '../models/UserInfo_Out';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Audit Incidents Query
     * query by logQL
     * @param label
     * @param userId query events related to a specific user id
     * @param dataId query events related to a specific data id
     * @param start starting timestamp of the query range
     * @param end ending timestamp of the query range
     * @param limit query events number limit
     * @param step query events time interval
     * @param direction query events order
     * @returns QueryResult audit log by stream
     * @throws ApiError
     */
    public static auditIncidentsQuery(
        label: string,
        userId?: string,
        dataId?: string,
        start?: number,
        end?: number,
        limit?: number,
        step?: string,
        direction?: string,
    ): CancelablePromise<QueryResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/audit-logs',
            query: {
                'label': label,
                'user_id': userId,
                'data_id': dataId,
                'start': start,
                'end': end,
                'limit': limit,
                'step': step,
                'direction': direction,
            },
            errors: {
                403: `Unauthorized`,
                404: `Organization not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Login For Access Token
     * User login with email and password
     * @param formData
     * @returns LoginSuccess_Out Successful Response
     * @throws ApiError
     */
    public static login(
        formData: Body_login,
    ): CancelablePromise<LoginSuccess_Out> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                401: `Incorrect username or password`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Refresh For Access Token
     * Refresh the JWT token for the user
     * @param requestBody
     * @returns LoginSuccess_Out Successful Response
     * @throws ApiError
     */
    public static getRefreshToken(
        requestBody: RefreshToken_In,
    ): CancelablePromise<LoginSuccess_Out> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/refresh-token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Could not validate credentials.`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Current User Info
     * Get the current user information
     * @returns UserInfo_Out The current user information
     * @throws ApiError
     */
    public static getCurrentUserInfo(): CancelablePromise<UserInfo_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me',
            errors: {
                404: `User not found`,
            },
        });
    }

    /**
     * Unlock User Account
     * Unlock the user account
     * @param userId The user id to unlock the account for
     * @returns void
     * @throws ApiError
     */
    public static unlockUserAccount(
        userId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/unlock-account/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                404: `User not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Organizations
     * Get list of all the organizations
     * @returns GetMultipleOrganizations_Out List of organizations
     * @throws ApiError
     */
    public static getAllOrganizations(): CancelablePromise<GetMultipleOrganizations_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organizations',
        });
    }

    /**
     * Register Organization
     * Register new organization and the admin user
     * @param requestBody
     * @returns RegisterOrganization_Out Organization Id
     * @throws ApiError
     */
    public static registerOrganization(
        requestBody: RegisterOrganization_In,
    ): CancelablePromise<RegisterOrganization_Out> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/organizations',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `User already registered`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Organization
     * Get the information about a organization
     * @param organizationId UUID of the requested organization
     * @returns GetOrganizations_Out Successful Response
     * @throws ApiError
     */
    public static getOrganization(
        organizationId: string,
    ): CancelablePromise<GetOrganizations_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organizations/{organization_id}',
            path: {
                'organization_id': organizationId,
            },
            errors: {
                404: `Organization not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Organization
     * Update organization information
     * @param organizationId UUID of the requested organization
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateOrganization(
        organizationId: string,
        requestBody: UpdateOrganization_In,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/organizations/{organization_id}',
            path: {
                'organization_id': organizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Unauthorized`,
                404: `Organization not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Soft Delete Organization
     * Disable the organization and all the users
     * @param organizationId UUID of the organization to be deleted
     * @returns void
     * @throws ApiError
     */
    public static softDeleteOrganization(
        organizationId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/organizations/{organization_id}',
            path: {
                'organization_id': organizationId,
            },
            errors: {
                403: `Unauthorized`,
                404: `Organization not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Users
     * Get all users in the organization
     * @param organizationId UUID of the organization
     * @returns GetMultipleUsers_Out Successful Response
     * @throws ApiError
     */
    public static getUsers(
        organizationId: string,
    ): CancelablePromise<GetMultipleUsers_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organizations/{organization_id}/users',
            path: {
                'organization_id': organizationId,
            },
            errors: {
                403: `Unauthorized`,
                404: `User organization not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Register User
     * Add new user to organization
     * @param organizationId UUID of the organization to add the user to
     * @param requestBody
     * @returns RegisterUser_Out Successful Response
     * @throws ApiError
     */
    public static registerUser(
        organizationId: string,
        requestBody: RegisterUser_In,
    ): CancelablePromise<RegisterUser_Out> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/organizations/{organization_id}/users',
            path: {
                'organization_id': organizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Unauthorized`,
                409: `User already exists`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get User
     * Get information about a user
     * @param organizationId UUID of the organization
     * @param userId UUID of the user
     * @returns GetUsers_Out Successful Response
     * @throws ApiError
     */
    public static getUser(
        organizationId: string,
        userId: string,
    ): CancelablePromise<GetUsers_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organizations/{organization_id}/users/{user_id}',
            path: {
                'organization_id': organizationId,
                'user_id': userId,
            },
            errors: {
                404: `User not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update User Info
     * Update user information.
     * Only organization admin can update the user role and account state for a user.
     * Only the account owner can update the job title and avatar.
     * @param organizationId UUID of the organization
     * @param userId UUID of the user
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateUserInfo(
        organizationId: string,
        userId: string,
        requestBody: UpdateUser_In,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/organizations/{organization_id}/users/{user_id}',
            path: {
                'organization_id': organizationId,
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Unauthorized`,
                404: `User not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Soft Delete User
     * Soft Delete user
     * @param organizationId UUID of the organization
     * @param userId UUID of the user
     * @returns void
     * @throws ApiError
     */
    public static softDeleteUser(
        organizationId: string,
        userId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/organizations/{organization_id}/users/{user_id}',
            path: {
                'organization_id': organizationId,
                'user_id': userId,
            },
            errors: {
                403: `Unauthorized`,
                404: `User not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Data Federations
     * Get list of all the data federations
     * @param dataSubmitterId UUID of Data Submitter in the data federation
     * @param researcherId UUID of Researcher in the data federation
     * @param datasetId UUID of Dataset in the data federation
     * @returns GetMultipleDataFederation_Out List of data federations
     * @throws ApiError
     */
    public static getAllDataFederations(
        dataSubmitterId?: string,
        researcherId?: string,
        datasetId?: string,
    ): CancelablePromise<GetMultipleDataFederation_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data-federations',
            query: {
                'data_submitter_id': dataSubmitterId,
                'researcher_id': researcherId,
                'dataset_id': datasetId,
            },
            errors: {
                403: `Access denied`,
                404: `Organization not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Register Data Federation
     * Register new data federation
     * @param requestBody
     * @returns RegisterDataFederation_Out DataFederation Id
     * @throws ApiError
     */
    public static registerDataFederation(
        requestBody: RegisterDataFederation_In,
    ): CancelablePromise<RegisterDataFederation_Out> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/data-federations',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Data Federation
     * Get the information about a data federation
     * @param dataFederationId UUID of the data federation
     * @returns GetDataFederation_Out Successful Response
     * @throws ApiError
     */
    public static getDataFederation(
        dataFederationId: string,
    ): CancelablePromise<GetDataFederation_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data-federations/{data_federation_id}',
            path: {
                'data_federation_id': dataFederationId,
            },
            errors: {
                404: `DataFederation not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Data Federation
     * Update data federation information
     * @param dataFederationId UUID of the data federation
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateDataFederation(
        dataFederationId: string,
        requestBody: UpdateDataFederation_In,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data-federations/{data_federation_id}',
            path: {
                'data_federation_id': dataFederationId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Unauthorized`,
                404: `DataFederation not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Soft Delete Data Federation
     * Disable the data federation
     * @param dataFederationId UUID of the data federation to be deprovisioned
     * @returns void
     * @throws ApiError
     */
    public static softDeleteDataFederation(
        dataFederationId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/data-federations/{data_federation_id}',
            path: {
                'data_federation_id': dataFederationId,
            },
            errors: {
                403: `Unauthorized`,
                404: `DataFederation not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Add Data Model
     * Add a data model to a data federation
     * @param dataFederationId UUID of the data federation
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static addDataModel(
        dataFederationId: string,
        requestBody: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/data-federations/{data_federation_id}',
            path: {
                'data_federation_id': dataFederationId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The data model already exists`,
                404: `DataFederation not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Invite Researcher
     * Invite a researcher to join a data federation
     * @param dataFederationId UUID of the data federation
     * @param researcherOrganizationId UUID of the researcher organization to be invited
     * @returns void
     * @throws ApiError
     */
    public static inviteResearcher(
        dataFederationId: string,
        researcherOrganizationId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data-federations/{data_federation_id}/researcher/{researcher_organization_id}',
            path: {
                'data_federation_id': dataFederationId,
                'researcher_organization_id': researcherOrganizationId,
            },
            errors: {
                404: `DataFederation not found`,
                422: `Validation Error`,
                510: `The command or option is not supported by the SMTP server`,
                554: `Server unexpectedly disconnected or an attempt is made to use the SMTP instance before connecting it to a server`,
            },
        });
    }

    /**
     * Register Researcher
     * Automatically add a researcher to the data federation, bypassing an invite path
     * @param dataFederationId UUID of the data federation
     * @param researcherOrganizationId UUID of the researcher organization to be added
     * @returns void
     * @throws ApiError
     */
    public static registerResearcher(
        dataFederationId: string,
        researcherOrganizationId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/data-federations/{data_federation_id}/researcher/{researcher_organization_id}',
            path: {
                'data_federation_id': dataFederationId,
                'researcher_organization_id': researcherOrganizationId,
            },
            errors: {
                404: `DataFederation not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Invite Data Submitter
     * Invite a data submitter to join a data federation
     * @param dataFederationId UUID of the data federation
     * @param dataSubmitterOrganizationId UUID of the data submitter organization to be invited
     * @returns void
     * @throws ApiError
     */
    public static inviteDataSubmitter(
        dataFederationId: string,
        dataSubmitterOrganizationId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data-federations/{data_federation_id}/data-submitter/{data_submitter_organization_id}',
            path: {
                'data_federation_id': dataFederationId,
                'data_submitter_organization_id': dataSubmitterOrganizationId,
            },
            errors: {
                404: `DataFederation not found`,
                422: `Validation Error`,
                510: `The command or option is not supported by the SMTP server`,
                554: `Server unexpectedly disconnected or an attempt is made to use the SMTP instance before connecting it to a server`,
            },
        });
    }

    /**
     * Register Data Submitter
     * Automatically add a data submitter to the data federation, bypassing an invite path
     * @param dataFederationId UUID of the data federation
     * @param dataSubmitterOrganizationId UUID of the data submitter organization to be invited
     * @returns void
     * @throws ApiError
     */
    public static registerDataSubmitter(
        dataFederationId: string,
        dataSubmitterOrganizationId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/data-federations/{data_federation_id}/data-submitter/{data_submitter_organization_id}',
            path: {
                'data_federation_id': dataFederationId,
                'data_submitter_organization_id': dataSubmitterOrganizationId,
            },
            errors: {
                404: `DataFederation not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Invites
     * Get list of all the pending invites received. Only ADMIN roles have access.
     * @param organizationId UUID of the organization for which to list all the invited
     * @returns GetMultipleInvite_Out List of pending invites received
     * @throws ApiError
     */
    public static getAllInvites(
        organizationId: string,
    ): CancelablePromise<GetMultipleInvite_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data-federations/{organization_id}/invites',
            path: {
                'organization_id': organizationId,
            },
            errors: {
                401: `Unauthorised`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Invite
     * Get the information about an invite
     * @param organizationId UUID of the invired organization
     * @param inviteId UUID of the invite to be fetched
     * @returns GetInvite_Out Successful Response
     * @throws ApiError
     */
    public static getInvite(
        organizationId: string,
        inviteId: string,
    ): CancelablePromise<GetInvite_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data-federations/{organization_id}/invites/{invite_id}',
            path: {
                'organization_id': organizationId,
                'invite_id': inviteId,
            },
            errors: {
                401: `Unauthorised`,
                404: `Invite not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Accept Or Reject Invite
     * Accept or reject an invite
     * @param organizationId UUID of the invited organization
     * @param inviteId UUID of the invite to be approved to rejected
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static acceptOrRejectInvite(
        organizationId: string,
        inviteId: string,
        requestBody: PatchInvite_In,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/data-federations/{organization_id}/invites/{invite_id}',
            path: {
                'organization_id': organizationId,
                'invite_id': inviteId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorised`,
                404: `Invite not found`,
                410: `Invite expired`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Add Dataset
     * Add a dataset to a data federation
     * @param dataFederationId UUID of the Data federation to which the dataset is being added
     * @param datasetId UUID of the dataset that is being added to the data federation
     * @returns void
     * @throws ApiError
     */
    public static addDataset(
        dataFederationId: string,
        datasetId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data-federations/{data_federation_id}/datasets/{dataset_id}',
            path: {
                'data_federation_id': dataFederationId,
                'dataset_id': datasetId,
            },
            errors: {
                401: `Unauthorised`,
                404: `Unauthorised`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Remove Dataset
     * Remove a dataset from a data federation
     * @param dataFederationId UUID of the Data federation from which the dataset is being removed
     * @param datasetId UUID of the dataset that is being removed from the data federation
     * @returns void
     * @throws ApiError
     */
    public static removeDataset(
        dataFederationId: string,
        datasetId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/data-federations/{data_federation_id}/datasets/{dataset_id}',
            path: {
                'data_federation_id': dataFederationId,
                'dataset_id': datasetId,
            },
            errors: {
                404: `Unauthorised`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Existing Dataset Key
     * Return a dataset encryption key by either retrieving and unwrapping
     * @param dataFederationId UUID of the Data federation to which the dataset belongs
     * @param datasetId UUID of the dataset for which the key is being requested
     * @returns DatasetEncryptionKey_Out Successful Response
     * @throws ApiError
     */
    public static getExistingDatasetKey(
        dataFederationId: string,
        datasetId: string,
    ): CancelablePromise<DatasetEncryptionKey_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data-federations/{data_federation_id}/dataset_key/{dataset_id}',
            path: {
                'data_federation_id': dataFederationId,
                'dataset_id': datasetId,
            },
            errors: {
                404: `Unauthorised`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Dataset Key
     * Return a dataset encryption key by either retrieving and unwrapping, or creating
     * @param dataFederationId UUID of the Data federation to which the dataset belongs
     * @param datasetId UUID of the dataset for which the key is being requested
     * @param createIfNotFound
     * @returns DatasetEncryptionKey_Out Successful Response
     * @throws ApiError
     */
    public static getDatasetKey(
        dataFederationId: string,
        datasetId: string,
        createIfNotFound: boolean = true,
    ): CancelablePromise<DatasetEncryptionKey_Out> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/data-federations/{data_federation_id}/dataset_key/{dataset_id}',
            path: {
                'data_federation_id': dataFederationId,
                'dataset_id': datasetId,
            },
            query: {
                'create_if_not_found': createIfNotFound,
            },
            errors: {
                404: `Unauthorised`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Datasets
     * Get list of all the datasets for the current organization
     * @returns GetMultipleDataset_Out List of datasets
     * @throws ApiError
     */
    public static getAllDatasets(): CancelablePromise<GetMultipleDataset_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/datasets',
            errors: {
                404: `Organization not found`,
            },
        });
    }

    /**
     * Register Dataset
     * Register new dataset
     * @param requestBody
     * @returns RegisterDataset_Out Dataset Id
     * @throws ApiError
     */
    public static registerDataset(
        requestBody: RegisterDataset_In,
    ): CancelablePromise<RegisterDataset_Out> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/datasets',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Dataset
     * Get the information about a dataset
     * @param datasetId UUID of the dataset being fetched
     * @returns GetDataset_Out Successful Response
     * @throws ApiError
     */
    public static getDataset(
        datasetId: string,
    ): CancelablePromise<GetDataset_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/datasets/{dataset_id}',
            path: {
                'dataset_id': datasetId,
            },
            errors: {
                404: `Organization not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Dataset
     * Update dataset information
     * @param datasetId UUID of the dataset being updated
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateDataset(
        datasetId: string,
        requestBody: UpdateDataset_In,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/datasets/{dataset_id}',
            path: {
                'dataset_id': datasetId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Unauthorized`,
                404: `Dataset not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Soft Delete Dataset
     * Disable the dataset
     * @param datasetId UUID of the dataset being soft deleted
     * @returns void
     * @throws ApiError
     */
    public static softDeleteDataset(
        datasetId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/datasets/{dataset_id}',
            path: {
                'dataset_id': datasetId,
            },
            errors: {
                403: `Unauthorized`,
                404: `Dataset not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Dataset Versions
     * Get list of all the dataset-versions for the dataset
     * @param datasetId UUID of the dataset
     * @returns GetMultipleDatasetVersion_Out List of dataset-versions for the dataset
     * @throws ApiError
     */
    public static getAllDatasetVersions(
        datasetId: string,
    ): CancelablePromise<GetMultipleDatasetVersion_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dataset-versions',
            query: {
                'dataset_id': datasetId,
            },
            errors: {
                404: `Organization not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Register Dataset Version
     * Register new dataset-version
     * @param requestBody
     * @returns RegisterDatasetVersion_Out Dataset Version Id
     * @throws ApiError
     */
    public static registerDatasetVersion(
        requestBody: RegisterDatasetVersion_In,
    ): CancelablePromise<RegisterDatasetVersion_Out> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/dataset-versions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Dataset not found`,
                404: `Organization not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Dataset Version
     * Get the information about a dataset
     * @param datasetVersionId UUID of the dataset version
     * @returns GetDatasetVersion_Out Successful Response
     * @throws ApiError
     */
    public static getDatasetVersion(
        datasetVersionId: string,
    ): CancelablePromise<GetDatasetVersion_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dataset-versions/{dataset_version_id}',
            path: {
                'dataset_version_id': datasetVersionId,
            },
            errors: {
                404: `Dataset version not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Dataset Version
     * Update dataset information
     * @param datasetVersionId UUID of the dataset version
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateDatasetVersion(
        datasetVersionId: string,
        requestBody: UpdateDatasetVersion_In,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/dataset-versions/{dataset_version_id}',
            path: {
                'dataset_version_id': datasetVersionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Dataset not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Soft Delete Dataset Version
     * Disable a dataset version
     * @param datasetVersionId UUID of the dataset version
     * @returns void
     * @throws ApiError
     */
    public static softDeleteDatasetVersion(
        datasetVersionId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/dataset-versions/{dataset_version_id}',
            path: {
                'dataset_version_id': datasetVersionId,
            },
            errors: {
                403: `Unauthorized`,
                404: `Dataset not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Dataset Version Connection String
     * Get the write only connection string for the dataset version upload
     * @param datasetVersionId UUID of the dataset version
     * @returns GetDatasetVersionConnectionString_Out Successful Response
     * @throws ApiError
     */
    public static getDatasetVersionConnectionString(
        datasetVersionId: string,
    ): CancelablePromise<GetDatasetVersionConnectionString_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/dataset-versions/{dataset_version_id}/connection-string',
            path: {
                'dataset_version_id': datasetVersionId,
            },
            errors: {
                404: `Dataset version not found`,
                409: `Dataset version is not in ENCRYPTING state. Cannot get the connection string.`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Secure Computation Nodes
     * Get list of all the secure_computation_node for the current user
     * @returns GetMultipleSecureComputationNode_Out List of secure_computation_nodes
     * @throws ApiError
     */
    public static getAllSecureComputationNodes(): CancelablePromise<GetMultipleSecureComputationNode_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/secure-computation-node',
            errors: {
                404: `Dataset version not found`,
            },
        });
    }

    /**
     * Register Secure Computation Node
     * Provision data federation SCNs
     * @param requestBody
     * @returns RegisterSecureComputationNode_Out SCN information
     * @throws ApiError
     */
    public static registerSecureComputationNode(
        requestBody: RegisterSecureComputationNode_In,
    ): CancelablePromise<RegisterSecureComputationNode_Out> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/secure-computation-node',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Organization must be one of the the data federation researcher`,
                404: `Data Federation not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Secure Computation Node
     * Get the information about a secure computation node
     * @param secureComputationNodeId UUID of Secure Computation Node
     * @returns GetSecureComputationNode_Out Successful Response
     * @throws ApiError
     */
    public static getSecureComputationNode(
        secureComputationNodeId: string,
    ): CancelablePromise<GetSecureComputationNode_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/secure-computation-node/{secure_computation_node_id}',
            path: {
                'secure_computation_node_id': secureComputationNodeId,
            },
            errors: {
                404: `Secure Computation Node not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Secure Computation Node
     * Update secure computation node information
     * @param secureComputationNodeId UUID of Secure Computation Node
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateSecureComputationNode(
        secureComputationNodeId: string,
        requestBody: UpdateSecureComputationNode_In,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/secure-computation-node/{secure_computation_node_id}',
            path: {
                'secure_computation_node_id': secureComputationNodeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Access denied`,
                404: `Secure Computation Node not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Deprovision Secure Computation Node
     * Deprovision SCN
     * @param secureComputationNodeId
     * @returns void
     * @throws ApiError
     */
    public static deprovisionSecureComputationNode(
        secureComputationNodeId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/secure-computation-node/{secure_computation_node_id}',
            path: {
                'secure_computation_node_id': secureComputationNodeId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Register Dataset
     * Drop the database
     * @returns void
     * @throws ApiError
     */
    public static dropDatabase(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/database',
        });
    }

    /**
     * Get All Data Model Info
     * Get all data model
     * @returns GetMultipleDataModel_Out All Data model information for the current organization
     * @throws ApiError
     */
    public static getAllDataModelInfo(): CancelablePromise<GetMultipleDataModel_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data-models',
        });
    }

    /**
     * Register Data Model
     * Register a new data model
     * @param requestBody
     * @returns RegisterDataModel_Out Data model Id
     * @throws ApiError
     */
    public static registerDataModel(
        requestBody: RegisterDataModel_In,
    ): CancelablePromise<RegisterDataModel_Out> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/data-models',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Data Model Info
     * Get data model
     * @param dataModelId Data model Id
     * @returns GetDataModel_Out Data model information and list of SCNs
     * @throws ApiError
     */
    public static getDataModelInfo(
        dataModelId: string,
    ): CancelablePromise<GetDataModel_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data-models/{data_model_id}',
            path: {
                'data_model_id': dataModelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Data Model
     * Soft delete data model
     * @param dataModelId Data model Id to delete
     * @returns void
     * @throws ApiError
     */
    public static deleteDataModel(
        dataModelId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/data-models/{data_model_id}',
            path: {
                'data_model_id': dataModelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Data Model
     * Update data model to add or remove data frames
     * @param dataModelId Data model Id to update
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateDataModel(
        dataModelId: string,
        requestBody: UpdateDataModel_In,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/data-models/{data_model_id}',
            path: {
                'data_model_id': dataModelId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Data Model Dataframe Info
     * Get all data model dataframe SCNs
     * @returns GetMultipleDataModelDataframe_Out All Data model dataframe information for the current organization or data model
     * @throws ApiError
     */
    public static getAllDataModelDataframeInfo(): CancelablePromise<GetMultipleDataModelDataframe_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data-models-dataframes',
        });
    }

    /**
     * Register Data Model Dataframe
     * Provision data federation SCNs
     * @param requestBody
     * @returns RegisterDataModelDataframe_Out Data model dataframe Id and list of SCNs
     * @throws ApiError
     */
    public static registerDataModelDataframe(
        requestBody: RegisterDataModelDataframe_In,
    ): CancelablePromise<RegisterDataModelDataframe_Out> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/data-models-dataframes',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Data Model Dataframe Info
     * Get data model dataframe
     * @param dataModelDataframeId Data model dataframe Id
     * @returns GetDataModelDataframe_Out Data model dataframe information and list of SCNs
     * @throws ApiError
     */
    public static getDataModelDataframeInfo(
        dataModelDataframeId: string,
    ): CancelablePromise<GetDataModelDataframe_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data-models-dataframes/{data_model_dataframe_id}',
            path: {
                'data_model_dataframe_id': dataModelDataframeId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Data Model Dataframe
     * Soft delete data model dataframe
     * @param dataModelDataframeId Data model dataframe Id to delete
     * @returns void
     * @throws ApiError
     */
    public static deleteDataModelDataframe(
        dataModelDataframeId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/data-models-dataframes/{data_model_dataframe_id}',
            path: {
                'data_model_dataframe_id': dataModelDataframeId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Data Model Dataframe
     * Update data model dataframe
     * @param dataModelDataframeId Data model dataframe Id
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateDataModelDataframe(
        dataModelDataframeId: string,
        requestBody: UpdateDataModelDataframe_In,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/data-models-dataframes/{data_model_dataframe_id}',
            path: {
                'data_model_dataframe_id': dataModelDataframeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get All Data Model Series Info
     * Get all data model series SCNs
     * @returns GetMultipleDataModelSeries_Out All Data model series information for the current organization or data model
     * @throws ApiError
     */
    public static getAllDataModelSeriesInfo(): CancelablePromise<GetMultipleDataModelSeries_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data-models-series',
        });
    }

    /**
     * Register Data Model Series
     * Register a new data model series
     * @param requestBody
     * @returns RegisterDataModelSeries_Out Data model series Id
     * @throws ApiError
     */
    public static registerDataModelSeries(
        requestBody: RegisterDataModelSeries_In,
    ): CancelablePromise<RegisterDataModelSeries_Out> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/data-models-series',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Data Model Series Info
     * Get data model series
     * @param dataModelSeriesId Data model series Id
     * @returns GetDataModelSeries_Out Data model series information and list of SCNs
     * @throws ApiError
     */
    public static getDataModelSeriesInfo(
        dataModelSeriesId: string,
    ): CancelablePromise<GetDataModelSeries_Out> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/data-models-series/{data_model_series_id}',
            path: {
                'data_model_series_id': dataModelSeriesId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Data Model Series
     * Update data model series
     * @param dataModelSeriesId Data model series Id
     * @param requestBody
     * @returns GetDataModelSeries_Out Data model series information
     * @throws ApiError
     */
    public static updateDataModelSeries(
        dataModelSeriesId: string,
        requestBody: UpdateDataModelSeries_In,
    ): CancelablePromise<GetDataModelSeries_Out> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/data-models-series/{data_model_series_id}',
            path: {
                'data_model_series_id': dataModelSeriesId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Data Model Series
     * Soft delete data model series
     * @param dataModelSeriesId Data model series Id to delete
     * @returns void
     * @throws ApiError
     */
    public static deleteDataModelSeries(
        dataModelSeriesId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/data-models-series/{data_model_series_id}',
            path: {
                'data_model_series_id': dataModelSeriesId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
