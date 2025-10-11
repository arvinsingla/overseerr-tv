/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SonarrSeries = {
    title?: string;
    sortTitle?: string;
    seasonCount?: number;
    status?: string;
    overview?: string;
    network?: string;
    airTime?: string;
    images?: Array<{
        coverType?: string;
        url?: string;
    }>;
    remotePoster?: string;
    seasons?: Array<{
        seasonNumber?: number;
        monitored?: boolean;
    }>;
    year?: number;
    path?: string;
    profileId?: number;
    languageProfileId?: number;
    seasonFolder?: boolean;
    monitored?: boolean;
    useSceneNumbering?: boolean;
    runtime?: number;
    tvdbId?: number;
    tvRageId?: number;
    tvMazeId?: number;
    firstAired?: string;
    lastInfoSync?: string | null;
    seriesType?: string;
    cleanTitle?: string;
    imdbId?: string;
    titleSlug?: string;
    certification?: string;
    genres?: Array<string>;
    tags?: Array<string>;
    added?: string;
    ratings?: Array<{
        votes?: number;
        value?: number;
    }>;
    qualityProfileId?: number;
    id?: number | null;
    rootFolderPath?: string | null;
    addOptions?: Array<{
        ignoreEpisodesWithFiles?: boolean | null;
        ignoreEpisodesWithoutFiles?: boolean | null;
        searchForMissingEpisodes?: boolean | null;
    }>;
};

