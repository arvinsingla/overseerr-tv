/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaInfo } from '../models/MediaInfo';
import type { PageInfo } from '../models/PageInfo';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MediaService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get media
     * Returns all media (can be filtered and limited) in a JSON object.
     * @param take
     * @param skip
     * @param filter
     * @param sort
     * @returns any Returned media
     * @throws ApiError
     */
    public getMedia(
        take?: number | null,
        skip?: number | null,
        filter?: 'all' | 'available' | 'partial' | 'allavailable' | 'processing' | 'pending' | null,
        sort: 'added' | 'modified' | 'mediaAdded' = 'added',
    ): CancelablePromise<{
        pageInfo?: PageInfo;
        results?: Array<MediaInfo>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/media',
            query: {
                'take': take,
                'skip': skip,
                'filter': filter,
                'sort': sort,
            },
        });
    }
    /**
     * Delete media item
     * Removes a media item. The `MANAGE_REQUESTS` permission is required to perform this action.
     * @param mediaId Media ID
     * @returns void
     * @throws ApiError
     */
    public deleteMedia(
        mediaId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/media/{mediaId}',
            path: {
                'mediaId': mediaId,
            },
        });
    }
    /**
     * Update media status
     * Updates a media item's status and returns the media in JSON format
     * @param mediaId Media ID
     * @param status New status
     * @param requestBody
     * @returns MediaInfo Returned media
     * @throws ApiError
     */
    public postMedia(
        mediaId: string,
        status: 'available' | 'partial' | 'processing' | 'pending' | 'unknown',
        requestBody?: {
            is4k?: boolean;
        },
    ): CancelablePromise<MediaInfo> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/media/{mediaId}/{status}',
            path: {
                'mediaId': mediaId,
                'status': status,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get watch data
     * Returns play count, play duration, and users who have watched the media.
     *
     * Requires the `ADMIN` permission.
     *
     * @param mediaId Media ID
     * @returns any Users
     * @throws ApiError
     */
    public getMediaWatchData(
        mediaId: string,
    ): CancelablePromise<{
        data?: {
            playCount7Days?: number;
            playCount30Days?: number;
            playCount?: number;
            users?: Array<User>;
        };
        data4k?: {
            playCount7Days?: number;
            playCount30Days?: number;
            playCount?: number;
            users?: Array<User>;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/media/{mediaId}/watch_data',
            path: {
                'mediaId': mediaId,
            },
        });
    }
}
