/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Keyword } from '../models/Keyword';
import type { WatchProviderDetails } from '../models/WatchProviderDetails';
import type { WatchProviderRegion } from '../models/WatchProviderRegion';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class OtherService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get keyword
     * Returns a single keyword in JSON format.
     *
     * @param keywordId
     * @returns Keyword Keyword returned
     * @throws ApiError
     */
    public getKeyword(
        keywordId: number,
    ): CancelablePromise<Keyword> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/keyword/{keywordId}',
            path: {
                'keywordId': keywordId,
            },
        });
    }
    /**
     * Get watch provider regions
     * Returns a list of all available watch provider regions.
     *
     * @returns WatchProviderRegion Watch provider regions returned
     * @throws ApiError
     */
    public getWatchprovidersRegions(): CancelablePromise<Array<WatchProviderRegion>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/watchproviders/regions',
        });
    }
    /**
     * Get watch provider movies
     * Returns a list of all available watch providers for movies.
     *
     * @param watchRegion
     * @returns WatchProviderDetails Watch providers for movies returned
     * @throws ApiError
     */
    public getWatchprovidersMovies(
        watchRegion: string,
    ): CancelablePromise<Array<WatchProviderDetails>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/watchproviders/movies',
            query: {
                'watchRegion': watchRegion,
            },
        });
    }
    /**
     * Get watch provider series
     * Returns a list of all available watch providers for series.
     *
     * @param watchRegion
     * @returns WatchProviderDetails Watch providers for series returned
     * @throws ApiError
     */
    public getWatchprovidersTv(
        watchRegion: string,
    ): CancelablePromise<Array<WatchProviderDetails>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/watchproviders/tv',
            query: {
                'watchRegion': watchRegion,
            },
        });
    }
}
