/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaInfo } from '../models/MediaInfo';
import type { MediaRequest } from '../models/MediaRequest';
import type { PageInfo } from '../models/PageInfo';
import type { User } from '../models/User';
import type { UserSettingsNotifications } from '../models/UserSettingsNotifications';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Plex users
     * Returns a list of Plex users in a JSON array.
     *
     * Requires the `MANAGE_USERS` permission.
     *
     * @returns any Plex users
     * @throws ApiError
     */
    public getSettingsPlexUsers(): CancelablePromise<Array<{
        id?: string;
        title?: string;
        username?: string;
        email?: string;
        thumb?: string;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/plex/users',
        });
    }
    /**
     * Get logged-in user
     * Returns the currently logged-in user.
     * @returns User Object containing the logged-in user in JSON
     * @throws ApiError
     */
    public getAuthMe(): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/me',
        });
    }
    /**
     * Send a reset password email
     * Sends a reset password email to the email if the user exists
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public postAuthResetPassword(
        requestBody: {
            email: string;
        },
    ): CancelablePromise<{
        status?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/reset-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Reset the password for a user
     * Resets the password for a user if the given guid is connected to a user
     * @param guid
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public postAuthResetPassword1(
        guid: string,
        requestBody: {
            password: string;
        },
    ): CancelablePromise<{
        status?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/reset-password/{guid}',
            path: {
                'guid': guid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all users
     * Returns all users in a JSON object.
     * @param take
     * @param skip
     * @param sort
     * @returns any A JSON array of all users
     * @throws ApiError
     */
    public getUser(
        take?: number | null,
        skip?: number | null,
        sort: 'created' | 'updated' | 'requests' | 'displayname' = 'created',
    ): CancelablePromise<{
        pageInfo?: PageInfo;
        results?: User;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user',
            query: {
                'take': take,
                'skip': skip,
                'sort': sort,
            },
        });
    }
    /**
     * Create new user
     * Creates a new user. Requires the `MANAGE_USERS` permission.
     *
     * @param requestBody
     * @returns User The created user
     * @throws ApiError
     */
    public postUser(
        requestBody: {
            email?: string;
            username?: string;
            permissions?: number;
        },
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update batch of users
     * Update users with given IDs with provided values in request `body.settings`. You cannot update users' Plex tokens through this request.
     *
     * Requires the `MANAGE_USERS` permission.
     *
     * @param requestBody
     * @returns User Successfully updated user details
     * @throws ApiError
     */
    public putUser(
        requestBody: {
            ids?: Array<number>;
            permissions?: number;
        },
    ): CancelablePromise<Array<User>> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Import all users from Plex
     * Fetches and imports users from the Plex server. If a list of Plex IDs is provided in the request body, only the specified users will be imported. Otherwise, all users will be imported.
     *
     * Requires the `MANAGE_USERS` permission.
     *
     * @param requestBody
     * @returns User A list of the newly created users
     * @throws ApiError
     */
    public postUserImportFromPlex(
        requestBody?: {
            plexIds?: Array<string>;
        },
    ): CancelablePromise<Array<User>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/import-from-plex',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Register a web push /user/registerPushSubscription
     * Registers a web push subscription for the logged-in user
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public postUserRegisterPushSubscription(
        requestBody: {
            endpoint: string;
            auth: string;
            p256dh: string;
        },
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/registerPushSubscription',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get user by ID
     * Retrieves user details in a JSON object. Requires the `MANAGE_USERS` permission.
     *
     * @param userId
     * @returns User Users details in JSON
     * @throws ApiError
     */
    public getUser1(
        userId: number,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Update a user by user ID
     * Update a user with the provided values. You cannot update a user's Plex token through this request.
     *
     * Requires the `MANAGE_USERS` permission.
     *
     * @param userId
     * @param requestBody
     * @returns User Successfully updated user details
     * @throws ApiError
     */
    public putUser1(
        userId: number,
        requestBody: User,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/user/{userId}',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete user by ID
     * Deletes the user with the provided userId. Requires the `MANAGE_USERS` permission.
     * @param userId
     * @returns User User successfully deleted
     * @throws ApiError
     */
    public deleteUser(
        userId: number,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/user/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Get requests for a specific user
     * Retrieves a user's requests in a JSON object.
     *
     * @param userId
     * @param take
     * @param skip
     * @returns any User's requests returned
     * @throws ApiError
     */
    public getUserRequests(
        userId: number,
        take?: number | null,
        skip?: number | null,
    ): CancelablePromise<{
        pageInfo?: PageInfo;
        results?: Array<MediaRequest>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/{userId}/requests',
            path: {
                'userId': userId,
            },
            query: {
                'take': take,
                'skip': skip,
            },
        });
    }
    /**
     * Get quotas for a specific user
     * Returns quota details for a user in a JSON object. Requires `MANAGE_USERS` permission if viewing other users.
     *
     * @param userId
     * @returns any User quota details in JSON
     * @throws ApiError
     */
    public getUserQuota(
        userId: number,
    ): CancelablePromise<{
        movie?: {
            days?: number;
            limit?: number;
            used?: number;
            remaining?: number;
            restricted?: boolean;
        };
        tv?: {
            days?: number;
            limit?: number;
            used?: number;
            remaining?: number;
            restricted?: boolean;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/{userId}/quota',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Get the Plex watchlist for a specific user
     * Retrieves a user's Plex Watchlist in a JSON object.
     *
     * @param userId
     * @param page
     * @returns any Watchlist data returned
     * @throws ApiError
     */
    public getUserWatchlist(
        userId: number,
        page: number = 1,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        results?: Array<{
            tmdbId?: number;
            ratingKey?: string;
            type?: string;
            title?: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/{userId}/watchlist',
            path: {
                'userId': userId,
            },
            query: {
                'page': page,
            },
        });
    }
    /**
     * Get general settings for a user
     * Returns general settings for a specific user. Requires `MANAGE_USERS` permission if viewing other users.
     * @param userId
     * @returns any User general settings returned
     * @throws ApiError
     */
    public getUserSettingsMain(
        userId: number,
    ): CancelablePromise<{
        username?: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/{userId}/settings/main',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Update general settings for a user
     * Updates and returns general settings for a specific user. Requires `MANAGE_USERS` permission if editing other users.
     * @param userId
     * @param requestBody
     * @returns any Updated user general settings returned
     * @throws ApiError
     */
    public postUserSettingsMain(
        userId: number,
        requestBody: {
            username?: string | null;
        },
    ): CancelablePromise<{
        username?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/{userId}/settings/main',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get password page informatiom
     * Returns important data for the password page to function correctly. Requires `MANAGE_USERS` permission if viewing other users.
     * @param userId
     * @returns any User password page information returned
     * @throws ApiError
     */
    public getUserSettingsPassword(
        userId: number,
    ): CancelablePromise<{
        hasPassword?: boolean;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/{userId}/settings/password',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Update password for a user
     * Updates a user's password. Requires `MANAGE_USERS` permission if editing other users.
     * @param userId
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public postUserSettingsPassword(
        userId: number,
        requestBody: {
            currentPassword?: string | null;
            newPassword: string;
        },
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/{userId}/settings/password',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get notification settings for a user
     * Returns notification settings for a specific user. Requires `MANAGE_USERS` permission if viewing other users.
     * @param userId
     * @returns UserSettingsNotifications User notification settings returned
     * @throws ApiError
     */
    public getUserSettingsNotifications(
        userId: number,
    ): CancelablePromise<UserSettingsNotifications> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/{userId}/settings/notifications',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Update notification settings for a user
     * Updates and returns notification settings for a specific user. Requires `MANAGE_USERS` permission if editing other users.
     * @param userId
     * @param requestBody
     * @returns UserSettingsNotifications Updated user notification settings returned
     * @throws ApiError
     */
    public postUserSettingsNotifications(
        userId: number,
        requestBody: UserSettingsNotifications,
    ): CancelablePromise<UserSettingsNotifications> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/{userId}/settings/notifications',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get permission settings for a user
     * Returns permission settings for a specific user. Requires `MANAGE_USERS` permission if viewing other users.
     * @param userId
     * @returns any User permission settings returned
     * @throws ApiError
     */
    public getUserSettingsPermissions(
        userId: number,
    ): CancelablePromise<{
        permissions?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/{userId}/settings/permissions',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * Update permission settings for a user
     * Updates and returns permission settings for a specific user. Requires `MANAGE_USERS` permission if editing other users.
     * @param userId
     * @param requestBody
     * @returns any Updated user general settings returned
     * @throws ApiError
     */
    public postUserSettingsPermissions(
        userId: number,
        requestBody: {
            permissions: number;
        },
    ): CancelablePromise<{
        permissions?: number;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/{userId}/settings/permissions',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get watch data
     * Returns play count, play duration, and recently watched media.
     *
     * Requires the `ADMIN` permission to fetch results for other users.
     *
     * @param userId
     * @returns any Users
     * @throws ApiError
     */
    public getUserWatchData(
        userId: number,
    ): CancelablePromise<{
        recentlyWatched?: Array<MediaInfo>;
        playCount?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/{userId}/watch_data',
            path: {
                'userId': userId,
            },
        });
    }
}
