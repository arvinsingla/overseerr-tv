/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SonarrSettings = {
    readonly id?: number;
    name: string;
    hostname: string;
    port: number;
    apiKey: string;
    useSsl: boolean;
    baseUrl?: string;
    activeProfileId: number;
    activeProfileName: string;
    activeDirectory: string;
    activeLanguageProfileId?: number;
    activeAnimeProfileId?: number | null;
    activeAnimeLanguageProfileId?: number | null;
    activeAnimeProfileName?: string | null;
    activeAnimeDirectory?: string | null;
    is4k: boolean;
    enableSeasonFolders: boolean;
    isDefault: boolean;
    externalUrl?: string;
    syncEnabled?: boolean;
    preventSearch?: boolean;
};

