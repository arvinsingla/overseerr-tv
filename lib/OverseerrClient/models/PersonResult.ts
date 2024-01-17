/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MovieResult } from './MovieResult';
import type { TvResult } from './TvResult';
export type PersonResult = {
    id?: number;
    profilePath?: string;
    adult?: boolean;
    mediaType?: string;
    knownFor?: Array<(MovieResult | TvResult)>;
};

