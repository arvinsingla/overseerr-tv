/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlexLibrary } from './PlexLibrary';
export type PlexSettings = {
    readonly name: string;
    readonly machineId: string;
    ip: string;
    port: number;
    useSsl?: boolean | null;
    readonly libraries?: Array<PlexLibrary>;
    webAppUrl?: string | null;
};

