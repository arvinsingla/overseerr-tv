/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RadarrSettings } from '../models/RadarrSettings';
import type { ServiceProfile } from '../models/ServiceProfile';
import type { SonarrSeries } from '../models/SonarrSeries';
import type { SonarrSettings } from '../models/SonarrSettings';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ServiceService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get non-sensitive Radarr server list
     * Returns a list of Radarr server IDs and names in a JSON object.
     * @returns RadarrSettings Request successful
     * @throws ApiError
     */
    public getServiceRadarr(): CancelablePromise<Array<RadarrSettings>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/service/radarr',
        });
    }
    /**
     * Get Radarr server quality profiles and root folders
     * Returns a Radarr server's quality profile and root folder details in a JSON object.
     * @param radarrId
     * @returns any Request successful
     * @throws ApiError
     */
    public getServiceRadarr1(
        radarrId: number,
    ): CancelablePromise<{
        server?: RadarrSettings;
        profiles?: ServiceProfile;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/service/radarr/{radarrId}',
            path: {
                'radarrId': radarrId,
            },
        });
    }
    /**
     * Get non-sensitive Sonarr server list
     * Returns a list of Sonarr server IDs and names in a JSON object.
     * @returns SonarrSettings Request successful
     * @throws ApiError
     */
    public getServiceSonarr(): CancelablePromise<Array<SonarrSettings>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/service/sonarr',
        });
    }
    /**
     * Get Sonarr server quality profiles and root folders
     * Returns a Sonarr server's quality profile and root folder details in a JSON object.
     * @param sonarrId
     * @returns any Request successful
     * @throws ApiError
     */
    public getServiceSonarr1(
        sonarrId: number,
    ): CancelablePromise<{
        server?: SonarrSettings;
        profiles?: ServiceProfile;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/service/sonarr/{sonarrId}',
            path: {
                'sonarrId': sonarrId,
            },
        });
    }
    /**
     * Get series from Sonarr
     * Returns a list of series returned by searching for the name in Sonarr.
     * @param tmdbId
     * @returns SonarrSeries Request successful
     * @throws ApiError
     */
    public getServiceSonarrLookup(
        tmdbId: number,
    ): CancelablePromise<Array<SonarrSeries>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/service/sonarr/lookup/{tmdbId}',
            path: {
                'tmdbId': tmdbId,
            },
        });
    }
}
