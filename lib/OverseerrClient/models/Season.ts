/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Episode } from './Episode';
export type Season = {
    id?: number;
    airDate?: string | null;
    episodeCount?: number;
    name?: string;
    overview?: string;
    posterPath?: string;
    seasonNumber?: number;
    episodes?: Array<Episode>;
};

