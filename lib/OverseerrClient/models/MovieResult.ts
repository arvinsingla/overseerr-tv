/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaInfo } from './MediaInfo';
export type MovieResult = {
    id: number;
    mediaType: string;
    popularity?: number;
    posterPath?: string;
    backdropPath?: string;
    voteCount?: number;
    voteAverage?: number;
    genreIds?: Array<number>;
    overview?: string;
    originalLanguage?: string;
    title: string;
    originalTitle?: string;
    releaseDate?: string;
    adult?: boolean;
    video?: boolean;
    mediaInfo?: MediaInfo;
};

