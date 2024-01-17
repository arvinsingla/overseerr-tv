/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Company } from '../models/Company';
import type { Genre } from '../models/Genre';
import type { Keyword } from '../models/Keyword';
import type { MovieResult } from '../models/MovieResult';
import type { Network } from '../models/Network';
import type { PersonResult } from '../models/PersonResult';
import type { ProductionCompany } from '../models/ProductionCompany';
import type { SpokenLanguage } from '../models/SpokenLanguage';
import type { TvResult } from '../models/TvResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SearchService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Search for movies, TV shows, or people
     * Returns a list of movies, TV shows, or people a JSON object.
     * @param query
     * @param page
     * @param language
     * @returns any Results
     * @throws ApiError
     */
    public getSearch(
        query: string,
        page: number = 1,
        language?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        results?: Array<(MovieResult | TvResult | PersonResult)>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/search',
            query: {
                'query': query,
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Search for keywords
     * Returns a list of TMDB keywords matching the search query
     * @param query
     * @param page
     * @returns any Results
     * @throws ApiError
     */
    public getSearchKeyword(
        query: string,
        page: number = 1,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        results?: Array<Keyword>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/search/keyword',
            query: {
                'query': query,
                'page': page,
            },
        });
    }
    /**
     * Search for companies
     * Returns a list of TMDB companies matching the search query. (Will not return origin country)
     * @param query
     * @param page
     * @returns any Results
     * @throws ApiError
     */
    public getSearchCompany(
        query: string,
        page: number = 1,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        results?: Array<Company>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/search/company',
            query: {
                'query': query,
                'page': page,
            },
        });
    }
    /**
     * Discover movies
     * Returns a list of movies in a JSON object.
     * @param page
     * @param language
     * @param genre
     * @param studio
     * @param keywords
     * @param sortBy
     * @param primaryReleaseDateGte
     * @param primaryReleaseDateLte
     * @param withRuntimeGte
     * @param withRuntimeLte
     * @param voteAverageGte
     * @param voteAverageLte
     * @param voteCountGte
     * @param voteCountLte
     * @param watchRegion
     * @param watchProviders
     * @returns any Results
     * @throws ApiError
     */
    public getDiscoverMovies(
        page: number = 1,
        language?: string,
        genre?: string,
        studio?: number,
        keywords?: string,
        sortBy?: string,
        primaryReleaseDateGte?: string,
        primaryReleaseDateLte?: string,
        withRuntimeGte?: number,
        withRuntimeLte?: number,
        voteAverageGte?: number,
        voteAverageLte?: number,
        voteCountGte?: number,
        voteCountLte?: number,
        watchRegion?: string,
        watchProviders?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        results?: Array<MovieResult>;
    }> {
        console.log('inside SearchService', this.httpRequest.request)
        return this.httpRequest.request({
            method: 'GET',
            url: '/discover/movies',
            query: {
                'page': page,
                'language': language,
                'genre': genre,
                'studio': studio,
                'keywords': keywords,
                'sortBy': sortBy,
                'primaryReleaseDateGte': primaryReleaseDateGte,
                'primaryReleaseDateLte': primaryReleaseDateLte,
                'withRuntimeGte': withRuntimeGte,
                'withRuntimeLte': withRuntimeLte,
                'voteAverageGte': voteAverageGte,
                'voteAverageLte': voteAverageLte,
                'voteCountGte': voteCountGte,
                'voteCountLte': voteCountLte,
                'watchRegion': watchRegion,
                'watchProviders': watchProviders,
            },
        });
    }
    /**
     * Discover movies by genre
     * Returns a list of movies based on the provided genre ID in a JSON object.
     * @param genreId
     * @param page
     * @param language
     * @returns any Results
     * @throws ApiError
     */
    public getDiscoverMoviesGenre(
        genreId: string,
        page: number = 1,
        language?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        genre?: Genre;
        results?: Array<MovieResult>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/discover/movies/genre/{genreId}',
            path: {
                'genreId': genreId,
            },
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Discover movies by original language
     * Returns a list of movies based on the provided ISO 639-1 language code in a JSON object.
     * @param language
     * @param page
     * @param language
     * @returns any Results
     * @throws ApiError
     */
    public getDiscoverMoviesLanguage(
        language: string,
        page: number = 1,
        // language?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        language?: SpokenLanguage;
        results?: Array<MovieResult>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/discover/movies/language/{language}',
            path: {
                'language': language,
            },
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Discover movies by studio
     * Returns a list of movies based on the provided studio ID in a JSON object.
     * @param studioId
     * @param page
     * @param language
     * @returns any Results
     * @throws ApiError
     */
    public getDiscoverMoviesStudio(
        studioId: string,
        page: number = 1,
        language?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        studio?: ProductionCompany;
        results?: Array<MovieResult>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/discover/movies/studio/{studioId}',
            path: {
                'studioId': studioId,
            },
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Upcoming movies
     * Returns a list of movies in a JSON object.
     * @param page
     * @param language
     * @returns any Results
     * @throws ApiError
     */
    public getDiscoverMoviesUpcoming(
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
            url: '/discover/movies/upcoming',
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Discover TV shows
     * Returns a list of TV shows in a JSON object.
     * @param page
     * @param language
     * @param genre
     * @param network
     * @param keywords
     * @param sortBy
     * @param firstAirDateGte
     * @param firstAirDateLte
     * @param withRuntimeGte
     * @param withRuntimeLte
     * @param voteAverageGte
     * @param voteAverageLte
     * @param voteCountGte
     * @param voteCountLte
     * @param watchRegion
     * @param watchProviders
     * @returns any Results
     * @throws ApiError
     */
    public getDiscoverTv(
        page: number = 1,
        language?: string,
        genre?: string,
        network?: number,
        keywords?: string,
        sortBy?: string,
        firstAirDateGte?: string,
        firstAirDateLte?: string,
        withRuntimeGte?: number,
        withRuntimeLte?: number,
        voteAverageGte?: number,
        voteAverageLte?: number,
        voteCountGte?: number,
        voteCountLte?: number,
        watchRegion?: string,
        watchProviders?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        results?: Array<TvResult>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/discover/tv',
            query: {
                'page': page,
                'language': language,
                'genre': genre,
                'network': network,
                'keywords': keywords,
                'sortBy': sortBy,
                'firstAirDateGte': firstAirDateGte,
                'firstAirDateLte': firstAirDateLte,
                'withRuntimeGte': withRuntimeGte,
                'withRuntimeLte': withRuntimeLte,
                'voteAverageGte': voteAverageGte,
                'voteAverageLte': voteAverageLte,
                'voteCountGte': voteCountGte,
                'voteCountLte': voteCountLte,
                'watchRegion': watchRegion,
                'watchProviders': watchProviders,
            },
        });
    }
    /**
     * Discover TV shows by original language
     * Returns a list of TV shows based on the provided ISO 639-1 language code in a JSON object.
     * @param language
     * @param page
     * @param language
     * @returns any Results
     * @throws ApiError
     */
    public getDiscoverTvLanguage(
        language: string,
        page: number = 1,
        // language?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        language?: SpokenLanguage;
        results?: Array<TvResult>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/discover/tv/language/{language}',
            path: {
                'language': language,
            },
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Discover TV shows by genre
     * Returns a list of TV shows based on the provided genre ID in a JSON object.
     * @param genreId
     * @param page
     * @param language
     * @returns any Results
     * @throws ApiError
     */
    public getDiscoverTvGenre(
        genreId: string,
        page: number = 1,
        language?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        genre?: Genre;
        results?: Array<TvResult>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/discover/tv/genre/{genreId}',
            path: {
                'genreId': genreId,
            },
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Discover TV shows by network
     * Returns a list of TV shows based on the provided network ID in a JSON object.
     * @param networkId
     * @param page
     * @param language
     * @returns any Results
     * @throws ApiError
     */
    public getDiscoverTvNetwork(
        networkId: string,
        page: number = 1,
        language?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        network?: Network;
        results?: Array<TvResult>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/discover/tv/network/{networkId}',
            path: {
                'networkId': networkId,
            },
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Discover Upcoming TV shows
     * Returns a list of upcoming TV shows in a JSON object.
     * @param page
     * @param language
     * @returns any Results
     * @throws ApiError
     */
    public getDiscoverTvUpcoming(
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
            url: '/discover/tv/upcoming',
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Trending movies and TV
     * Returns a list of movies and TV shows in a JSON object.
     * @param page
     * @param language
     * @returns any Results
     * @throws ApiError
     */
    public getDiscoverTrending(
        page: number = 1,
        language?: string,
    ): CancelablePromise<{
        page?: number;
        totalPages?: number;
        totalResults?: number;
        results?: Array<(MovieResult | TvResult | PersonResult)>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/discover/trending',
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Get movies from keyword
     * Returns list of movies based on the provided keyword ID a JSON object.
     * @param keywordId
     * @param page
     * @param language
     * @returns any List of movies
     * @throws ApiError
     */
    public getDiscoverKeywordMovies(
        keywordId: number,
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
            url: '/discover/keyword/{keywordId}/movies',
            path: {
                'keywordId': keywordId,
            },
            query: {
                'page': page,
                'language': language,
            },
        });
    }
    /**
     * Get genre slider data for movies
     * Returns a list of genres with backdrops attached
     * @param language
     * @returns any Genre slider data returned
     * @throws ApiError
     */
    public getDiscoverGenresliderMovie(
        language?: string,
    ): CancelablePromise<Array<{
        id?: number;
        backdrops?: Array<string>;
        name?: string;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/discover/genreslider/movie',
            query: {
                'language': language,
            },
        });
    }
    /**
     * Get genre slider data for TV series
     * Returns a list of genres with backdrops attached
     * @param language
     * @returns any Genre slider data returned
     * @throws ApiError
     */
    public getDiscoverGenresliderTv(
        language?: string,
    ): CancelablePromise<Array<{
        id?: number;
        backdrops?: Array<string>;
        name?: string;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/discover/genreslider/tv',
            query: {
                'language': language,
            },
        });
    }
    /**
     * Get the Plex watchlist.
     * @param page
     * @returns any Watchlist data returned
     * @throws ApiError
     */
    public getDiscoverWatchlist(
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
            url: '/discover/watchlist',
            query: {
                'page': page,
            },
        });
    }
}
