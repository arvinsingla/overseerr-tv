/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaRequest } from './MediaRequest';
export type MediaInfo = {
    readonly id?: number;
    readonly tmdbId?: number;
    readonly tvdbId?: number | null;
    /**
     * Availability of the media. 1 = `UNKNOWN`, 2 = `PENDING`, 3 = `PROCESSING`, 4 = `PARTIALLY_AVAILABLE`, 5 = `AVAILABLE`
     */
    status?: number;
    readonly requests?: Array<MediaRequest>;
    readonly createdAt?: string;
    readonly updatedAt?: string;
};

