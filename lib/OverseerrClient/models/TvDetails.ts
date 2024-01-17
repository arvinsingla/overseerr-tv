/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cast } from './Cast';
import type { Crew } from './Crew';
import type { Episode } from './Episode';
import type { ExternalIds } from './ExternalIds';
import type { Genre } from './Genre';
import type { Keyword } from './Keyword';
import type { MediaInfo } from './MediaInfo';
import type { ProductionCompany } from './ProductionCompany';
import type { Season } from './Season';
import type { SpokenLanguage } from './SpokenLanguage';
import type { WatchProviders } from './WatchProviders';
export type TvDetails = {
    id?: number;
    backdropPath?: string;
    posterPath?: string;
    contentRatings?: {
        results?: Array<{
            iso_3166_1?: string;
            rating?: string;
        }>;
    };
    createdBy?: Array<{
        id?: number;
        name?: string;
        gender?: number;
        profilePath?: string | null;
    }>;
    episodeRunTime?: Array<number>;
    firstAirDate?: string;
    genres?: Array<Genre>;
    homepage?: string;
    inProduction?: boolean;
    languages?: Array<string>;
    lastAirDate?: string;
    lastEpisodeToAir?: Episode;
    name?: string;
    nextEpisodeToAir?: Episode;
    networks?: Array<ProductionCompany>;
    numberOfEpisodes?: number;
    numberOfSeason?: number;
    originCountry?: Array<string>;
    originalLanguage?: string;
    originalName?: string;
    overview?: string;
    popularity?: number;
    productionCompanies?: Array<ProductionCompany>;
    productionCountries?: Array<{
        iso_3166_1?: string;
        name?: string;
    }>;
    spokenLanguages?: Array<SpokenLanguage>;
    seasons?: Array<Season>;
    status?: string;
    tagline?: string;
    type?: string;
    voteAverage?: number;
    voteCount?: number;
    credits?: {
        cast?: Array<Cast>;
        crew?: Array<Crew>;
    };
    externalIds?: ExternalIds;
    keywords?: Array<Keyword>;
    mediaInfo?: MediaInfo;
    watchProviders?: Array<WatchProviders>;
};

