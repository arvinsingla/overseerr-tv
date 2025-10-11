/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaRequest } from '../models/MediaRequest';
import type { PageInfo } from '../models/PageInfo';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class RequestService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get all requests
     * Returns all requests if the user has the `ADMIN` or `MANAGE_REQUESTS` permissions. Otherwise, only the logged-in user's requests are returned.
     *
     * If the `requestedBy` parameter is specified, only requests from that particular user ID will be returned.
     *
     * @param take
     * @param skip
     * @param filter
     * @param sort
     * @param requestedBy
     * @returns any Requests returned
     * @throws ApiError
     */
    public getRequest(
        take?: number | null,
        skip?: number | null,
        filter?: 'all' | 'approved' | 'available' | 'pending' | 'processing' | 'unavailable' | 'failed' | null,
        sort: 'added' | 'modified' = 'added',
        requestedBy?: number | null,
    ): CancelablePromise<{
        pageInfo?: PageInfo;
        results?: Array<MediaRequest>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/request',
            query: {
                'take': take,
                'skip': skip,
                'filter': filter,
                'sort': sort,
                'requestedBy': requestedBy,
            },
        });
    }
    /**
     * Create new request
     * Creates a new request with the provided media ID and type. The `REQUEST` permission is required.
     *
     * If the user has the `ADMIN` or `AUTO_APPROVE` permissions, their request will be auomatically approved.
     *
     * @param requestBody
     * @returns MediaRequest Succesfully created the request
     * @throws ApiError
     */
    public postRequest(
        requestBody: {
            mediaType: 'movie' | 'tv';
            mediaId: number;
            tvdbId?: number;
            seasons?: (Array<number> | 'all');
            is4k?: boolean;
            serverId?: number;
            profileId?: number;
            rootFolder?: string;
            languageProfileId?: number;
            userId?: number | null;
        },
    ): CancelablePromise<MediaRequest> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/request',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Gets request counts
     * Returns the number of pending and approved requests.
     *
     * @returns any Request counts returned
     * @throws ApiError
     */
    public getRequestCount(): CancelablePromise<{
        total?: number;
        movie?: number;
        tv?: number;
        pending?: number;
        approved?: number;
        declined?: number;
        processing?: number;
        available?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/request/count',
        });
    }
    /**
     * Get MediaRequest
     * Returns a specific MediaRequest in a JSON object.
     * @param requestId Request ID
     * @returns MediaRequest Succesfully returns request
     * @throws ApiError
     */
    public getRequest1(
        requestId: string,
    ): CancelablePromise<MediaRequest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/request/{requestId}',
            path: {
                'requestId': requestId,
            },
        });
    }
    /**
     * Update MediaRequest
     * Updates a specific media request and returns the request in a JSON object. Requires the `MANAGE_REQUESTS` permission.
     * @param requestId Request ID
     * @param requestBody
     * @returns MediaRequest Succesfully updated request
     * @throws ApiError
     */
    public putRequest(
        requestId: string,
        requestBody: {
            mediaType: 'movie' | 'tv';
            seasons?: Array<number>;
            is4k?: boolean;
            serverId?: number;
            profileId?: number;
            rootFolder?: string;
            languageProfileId?: number;
            userId?: number | null;
        },
    ): CancelablePromise<MediaRequest> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/request/{requestId}',
            path: {
                'requestId': requestId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete request
     * Removes a request. If the user has the `MANAGE_REQUESTS` permission, any request can be removed. Otherwise, only pending requests can be removed.
     * @param requestId Request ID
     * @returns void
     * @throws ApiError
     */
    public deleteRequest(
        requestId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/request/{requestId}',
            path: {
                'requestId': requestId,
            },
        });
    }
    /**
     * Retry failed request
     * Retries a request by resending requests to Sonarr or Radarr.
     *
     * Requires the `MANAGE_REQUESTS` permission or `ADMIN`.
     *
     * @param requestId Request ID
     * @returns MediaRequest Retry triggered
     * @throws ApiError
     */
    public postRequestRetry(
        requestId: string,
    ): CancelablePromise<MediaRequest> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/request/{requestId}/retry',
            path: {
                'requestId': requestId,
            },
        });
    }
    /**
     * Update a request's status
     * Updates a request's status to approved or declined. Also returns the request in a JSON object.
     *
     * Requires the `MANAGE_REQUESTS` permission or `ADMIN`.
     *
     * @param requestId Request ID
     * @param status New status
     * @returns MediaRequest Request status changed
     * @throws ApiError
     */
    public postRequest1(
        requestId: string,
        status: 'approve' | 'decline',
    ): CancelablePromise<MediaRequest> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/request/{requestId}/{status}',
            path: {
                'requestId': requestId,
                'status': status,
            },
        });
    }
}
