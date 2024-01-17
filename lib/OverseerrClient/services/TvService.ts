/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Season } from '../models/Season';
import type { TvDetails } from '../models/TvDetails';
import type { TvResult } from '../models/TvResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TvService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get TV details
     * Returns full TV details in a JSON object.
     * @param tvId
     * @param language
     * @returns TvDetails TV details
     * @throws ApiError
     */
    public getTv(
        tvId: number,
        language?: string,
    ): CancelablePromise<TvDetails> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tv/{tvId}',
            path: {
                'tvId': tvId,
            },
            query: {
                'language': language,
            },
        });
    }
    /**
     * Get season details and episode list
     * Returns season details with a list of episodes in a JSON object.
     * @param tvId
     * @param seasonId
     * @param language
     * @returns Season TV details
     * @throws ApiError
     */
    public getTvSeason(
        tvId: number,
        seasonId: number,
        language?: string,
    ): CancelablePromise<Season> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tv/{tvId}/season/{seasonId}',
            path: {
                'tvId': tvId,
                'seasonId': seasonId,
            },
            query: {
                'language': language,
            },
        });
    }
    /**
     * Get recommended TV series
     * Returns list of recommended TV series based on the provided tvId in a JSON object.
     * @param tvId
     * @param page
     * @param language
     * @returns any List of TV series
     * @throws ApiError
     */
    public getTvRecommendations(
        tvId: number,
        page: number = 1,
        language?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        results?: Array<TvResult>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tv/{tvId}/recommendations',
            path: {
                'tvId': tvId,
            },
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Get similar TV series
     * Returns list of similar TV series based on the provided tvId in a JSON object.
     * @param tvId
     * @param page
     * @param language
     * @returns any List of TV series
     * @throws ApiError
     */
    public getTvSimilar(
        tvId: number,
        page: number = 1,
        language?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        results?: Array<TvResult>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tv/{tvId}/similar',
            path: {
                'tvId': tvId,
            },
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Get TV ratings
     * Returns ratings based on provided tvId in a JSON object.
     * @param tvId
     * @returns any Ratings returned
     * @throws ApiError
     */
    public getTvRatings(
        tvId: number,
    ): CancelablePromise<{
        title?: string;
        year?: number;
        url?: string;
        criticsScore?: number;
        criticsRating?: 'Rotten' | 'Fresh';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tv/{tvId}/ratings',
            path: {
                'tvId': tvId,
            },
        });
    }
}
