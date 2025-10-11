/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductionCompany } from '../models/ProductionCompany';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TmdbService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Regions supported by TMDB
     * Returns a list of regions in a JSON object.
     * @returns any Results
     * @throws ApiError
     */
    public getRegions(): CancelablePromise<Array<{
        iso_3166_1?: string;
        english_name?: string;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/regions',
        });
    }
    /**
     * Languages supported by TMDB
     * Returns a list of languages in a JSON object.
     * @returns any Results
     * @throws ApiError
     */
    public getLanguages(): CancelablePromise<Array<{
        iso_639_1?: string;
        english_name?: string;
        name?: string;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/languages',
        });
    }
    /**
     * Get movie studio details
     * Returns movie studio details in a JSON object.
     * @param studioId
     * @returns ProductionCompany Movie studio details
     * @throws ApiError
     */
    public getStudio(
        studioId: number,
    ): CancelablePromise<ProductionCompany> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/studio/{studioId}',
            path: {
                'studioId': studioId,
            },
        });
    }
    /**
     * Get TV network details
     * Returns TV network details in a JSON object.
     * @param networkId
     * @returns ProductionCompany TV network details
     * @throws ApiError
     */
    public getNetwork(
        networkId: number,
    ): CancelablePromise<ProductionCompany> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/network/{networkId}',
            path: {
                'networkId': networkId,
            },
        });
    }
    /**
     * Get list of official TMDB movie genres
     * Returns a list of genres in a JSON array.
     * @param language
     * @returns any Results
     * @throws ApiError
     */
    public getGenresMovie(
        language?: string,
    ): CancelablePromise<Array<{
        id?: number;
        name?: string;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/genres/movie',
            query: {
                'language': language,
            },
        });
    }
    /**
     * Get list of official TMDB movie genres
     * Returns a list of genres in a JSON array.
     * @param language
     * @returns any Results
     * @throws ApiError
     */
    public getGenresTv(
        language?: string,
    ): CancelablePromise<Array<{
        id?: number;
        name?: string;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/genres/tv',
            query: {
                'language': language,
            },
        });
    }
    /**
     * Get backdrops of trending items
     * Returns a list of backdrop image paths in a JSON array.
     * @returns string Results
     * @throws ApiError
     */
    public getBackdrops(): CancelablePromise<Array<string>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/backdrops',
        });
    }
}
