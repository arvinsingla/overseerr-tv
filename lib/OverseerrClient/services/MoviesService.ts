/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MovieDetails } from '../models/MovieDetails';
import type { MovieResult } from '../models/MovieResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MoviesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get movie details
     * Returns full movie details in a JSON object.
     * @param movieId
     * @param language
     * @returns MovieDetails Movie details
     * @throws ApiError
     */
    public getMovie(
        movieId: number,
        language?: string,
    ): CancelablePromise<MovieDetails> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/movie/{movieId}',
            path: {
                'movieId': movieId,
            },
            query: {
                'language': language,
            },
        });
    }
    /**
     * Get recommended movies
     * Returns list of recommended movies based on provided movie ID in a JSON object.
     * @param movieId
     * @param page
     * @param language
     * @returns any List of movies
     * @throws ApiError
     */
    public getMovieRecommendations(
        movieId: number,
        page: number = 1,
        language?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        results?: Array<MovieResult>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/movie/{movieId}/recommendations',
            path: {
                'movieId': movieId,
            },
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Get similar movies
     * Returns list of similar movies based on the provided movieId in a JSON object.
     * @param movieId
     * @param page
     * @param language
     * @returns any List of movies
     * @throws ApiError
     */
    public getMovieSimilar(
        movieId: number,
        page: number = 1,
        language?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        results?: Array<MovieResult>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/movie/{movieId}/similar',
            path: {
                'movieId': movieId,
            },
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Get movie ratings
     * Returns ratings based on the provided movieId in a JSON object.
     * @param movieId
     * @returns any Ratings returned
     * @throws ApiError
     */
    public getMovieRatings(
        movieId: number,
    ): CancelablePromise<{
        title?: string;
        year?: number;
        url?: string;
        criticsScore?: number;
        criticsRating?: 'Rotten' | 'Fresh' | 'Certified Fresh';
        audienceScore?: number;
        audienceRating?: 'Spilled' | 'Upright';
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/movie/{movieId}/ratings',
            path: {
                'movieId': movieId,
            },
        });
    }
    /**
     * Get RT and IMDB movie ratings combined
     * Returns ratings from RottenTomatoes and IMDB based on the provided movieId in a JSON object.
     * @param movieId
     * @returns any Ratings returned
     * @throws ApiError
     */
    public getMovieRatingscombined(
        movieId: number,
    ): CancelablePromise<{
        rt?: {
            title?: string;
            year?: number;
            url?: string;
            criticsScore?: number;
            criticsRating?: 'Rotten' | 'Fresh' | 'Certified Fresh';
            audienceScore?: number;
            audienceRating?: 'Spilled' | 'Upright';
        };
        imdb?: {
            title?: string;
            url?: string;
            criticsScore?: number;
        };
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/movie/{movieId}/ratingscombined',
            path: {
                'movieId': movieId,
            },
        });
    }
}
