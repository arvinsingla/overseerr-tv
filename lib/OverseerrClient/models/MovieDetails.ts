/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cast } from './Cast';
import type { Crew } from './Crew';
import type { ExternalIds } from './ExternalIds';
import type { Genre } from './Genre';
import type { MediaInfo } from './MediaInfo';
import type { ProductionCompany } from './ProductionCompany';
import type { RelatedVideo } from './RelatedVideo';
import type { SpokenLanguage } from './SpokenLanguage';
import type { WatchProviders } from './WatchProviders';
export type MovieDetails = {
    readonly id?: number;
    imdbId?: string;
    adult?: boolean;
    backdropPath?: string;
    posterPath?: string;
    budget?: number;
    genres?: Array<Genre>;
    homepage?: string;
    relatedVideos?: Array<RelatedVideo>;
    originalLanguage?: string;
    originalTitle?: string;
    overview?: string;
    popularity?: number;
    productionCompanies?: Array<ProductionCompany>;
    productionCountries?: Array<{
        iso_3166_1?: string;
        name?: string;
    }>;
    releaseDate?: string;
    releases?: {
        results?: Array<{
            iso_3166_1?: string;
            rating?: string | null;
            release_dates?: Array<{
                certification?: string;
                iso_639_1?: string | null;
                note?: string | null;
                release_date?: string;
                type?: number;
            }>;
        }>;
    };
    revenue?: number | null;
    runtime?: number;
    spokenLanguages?: Array<SpokenLanguage>;
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    voteAverage?: number;
    voteCount?: number;
    credits?: {
        cast?: Array<Cast>;
        crew?: Array<Crew>;
    };
    collection?: {
        id?: number;
        name?: string;
        posterPath?: string;
        backdropPath?: string;
    };
    externalIds?: ExternalIds;
    mediaInfo?: MediaInfo;
    watchProviders?: Array<WatchProviders>;
};

