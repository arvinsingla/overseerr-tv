/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PublicService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Overseerr status
     * Returns the current Overseerr status in a JSON object.
     * @returns any Returned status
     * @throws ApiError
     */
    public getStatus(): CancelablePromise<{
        version?: string;
        commitTag?: string;
        updateAvailable?: boolean;
        commitsBehind?: number;
        restartRequired?: boolean;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/status',
        });
    }
    /**
     * Get application data volume status
     * For Docker installs, returns whether or not the volume mount was configured properly. Always returns true for non-Docker installs.
     * @returns any Application data volume status and path
     * @throws ApiError
     */
    public getStatusAppdata(): CancelablePromise<{
        appData?: boolean;
        appDataPath?: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/status/appdata',
        });
    }
}
