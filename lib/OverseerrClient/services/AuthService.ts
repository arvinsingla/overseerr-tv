/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
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
     * Sign in using a Plex token
     * Takes an `authToken` (Plex token) to log the user in. Generates a session cookie for use in further requests. If the user does not exist, and there are no other users, then a user will be created with full admin privileges. If a user logs in with access to the main Plex server, they will also have an account created, but without any permissions.
     * @param requestBody
     * @returns User OK
     * @throws ApiError
     */
    public postAuthPlex(
        requestBody: {
            authToken: string;
        },
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/plex',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Sign in using a local account
     * Takes an `email` and a `password` to log the user in. Generates a session cookie for use in further requests.
     * @param requestBody
     * @returns User OK
     * @throws ApiError
     */
    public postAuthLocal(
        requestBody: {
            email: string;
            password: string;
        },
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/local',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Sign out and clear session cookie
     * Completely clear the session cookie and associated values, effectively signing the user out.
     * @returns any OK
     * @throws ApiError
     */
    public postAuthLogout(): CancelablePromise<{
        status?: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/logout',
        });
    }
}
