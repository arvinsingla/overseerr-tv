import { OverseerrClient, MovieDetails, MovieResult, TvDetails, TvResult } from './OverseerrClient'
import { MediaType } from './types'

export interface WatchlistPage {
	page: number
	totalPages: number
	totalResults: number
	results: (MovieResult | TvResult)[]
}

// The watchlist endpoint returns thin items ({ tmdbId, ratingKey, mediaType, title })
// with no poster, overview, or mediaInfo. This module hydrates each item from the
// movie/tv detail endpoints so it can render in a MediaList.
// Note: the generated client types this response with a `type` field, but the
// server actually sends `mediaType`. The OpenAPI spec is stale on this endpoint.
export async function fetchWatchlistPage(client: OverseerrClient, page: number = 1): Promise<WatchlistPage> {
	const watchlist = await client.search.getDiscoverWatchlist(page)
	const items = watchlist.results ?? []
	const hydrated = await Promise.all(items.map((item) => hydrateWatchlistItem(client, item)))
	return {
		page: watchlist.page ?? page,
		totalPages: watchlist.totalPages ?? 1,
		totalResults: watchlist.totalResults ?? items.length,
		results: hydrated.filter((item): item is MovieResult | TvResult => item !== null),
	}
}

async function hydrateWatchlistItem(
	client: OverseerrClient,
	item: { tmdbId?: number, mediaType?: string, type?: string },
): Promise<MovieResult | TvResult | null> {
	const mediaType = item.mediaType ?? item.type
	if (!item.tmdbId) {
		return null
	}
	try {
		if (mediaType === MediaType.movie) {
			return movieDetailsToResult(item.tmdbId, await client.movies.getMovie(item.tmdbId))
		}
		if (mediaType === MediaType.tv || mediaType === 'show') {
			return tvDetailsToResult(item.tmdbId, await client.tv.getTv(item.tmdbId))
		}
	} catch {
		// If a title does not resolve, drop it and keep the rest of the page
	}
	return null
}

function movieDetailsToResult(tmdbId: number, details: MovieDetails): MovieResult {
	return {
		id: details.id ?? tmdbId,
		mediaType: MediaType.movie,
		title: details.title ?? '',
		originalTitle: details.originalTitle,
		posterPath: details.posterPath,
		backdropPath: details.backdropPath,
		overview: details.overview,
		popularity: details.popularity,
		voteAverage: details.voteAverage,
		voteCount: details.voteCount,
		releaseDate: details.releaseDate,
		originalLanguage: details.originalLanguage,
		mediaInfo: details.mediaInfo,
	}
}

function tvDetailsToResult(tmdbId: number, details: TvDetails): TvResult {
	return {
		id: details.id ?? tmdbId,
		mediaType: MediaType.tv,
		name: details.name,
		originalName: details.originalName,
		posterPath: details.posterPath,
		backdropPath: details.backdropPath,
		overview: details.overview,
		popularity: details.popularity,
		voteAverage: details.voteAverage,
		voteCount: details.voteCount,
		firstAirDate: details.firstAirDate,
		originalLanguage: details.originalLanguage,
		mediaInfo: details.mediaInfo,
	}
}
