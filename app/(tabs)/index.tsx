import { ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MediaList from '@/components/MediaList/MediaList';
import HorizontalCategoryList, { Category } from "@/components/HorizontalCategoryList/HorizontalCategoryList";
import MoreListItem from '@/components/MoreListItem/MoreListItem';
import { useScale } from '@/hooks/useScale';
import useAppStore from '@/lib/store';
import { DEFAULT_REFETCH_INTERVAL } from "@/lib/constants";
import { MediaType } from '@/lib/types';
import { MovieResult, PersonResult, TvResult } from '@/lib/OverseerrClient';
import { studios, networks } from '@/lib/maps'
import movieGenres from '@/lib/movieGenres.json'
import tvGenres from '@/lib/tvGenres.json'

export default function DiscoveryScreen() {
	const { client } = useAppStore()
  const styles = useDiscoveryScreenStyles()
	const router = useRouter()

	// Discovery screen data fetching
  const {isSuccess: trendingSuccess, data: trendingData } = useQuery({
    queryKey: ['trending'],
    queryFn: () => client?.search.getDiscoverTrending(),
		refetchInterval: DEFAULT_REFETCH_INTERVAL
  })
  const {isSuccess: popularMoviesSuccess, data: popularMoviesData } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: () => client?.search.getDiscoverMovies(),
		refetchInterval: DEFAULT_REFETCH_INTERVAL
  })
  const {isSuccess: popularTvSuccess, data: popularTvData } = useQuery({
    queryKey: ['popular-tv'],
    queryFn: () => client?.search.getDiscoverTv(),
		refetchInterval: DEFAULT_REFETCH_INTERVAL
  })
  const {isSuccess: upcomingMoviesSuccess, data: upcomingMoviesData } = useQuery({
    queryKey: ['upcoming-movies'],
    queryFn: () => client?.search.getDiscoverMoviesUpcoming(),
		refetchInterval: DEFAULT_REFETCH_INTERVAL
  })
  const {isSuccess: upcomingTvSuccess, data: upcomingTvData } = useQuery({
    queryKey: ['upcoming-tv'],
    queryFn: () => client?.search.getDiscoverTvUpcoming(),
		refetchInterval: DEFAULT_REFETCH_INTERVAL
  })

 	if (!client) {
		return <ActivityIndicator size="large" style={{ paddingTop: 30 }} />
	}

	// Query functions to pass to media list screens
	const trendingScreenQueryFn = (page: number) => {
		return client?.search.getDiscoverTrending(page)
	}
	const moviePopularScreenQueryFn = (page: number) => {
		return client?.search.getDiscoverMovies(page)
	}
	const movieUpcomingScreenQueryFn = (page: number) => {
		return client?.search.getDiscoverMoviesUpcoming(page)
	}
	const tvPopularScreenQueryFn = (page: number) => {
		return client?.search.getDiscoverTv(page)
	}
	const tvUpcomingScreenQueryFn = (page: number) => {
		return client?.search.getDiscoverTvUpcoming(page)
	}

	// onPress handlers
	const handlePressMedia = (item: MovieResult | TvResult | PersonResult) => {
		switch(item.mediaType) {
			case MediaType.movie:
				// @ts-ignore
				// Alert.alert('Test', `The current value for item.id is ${item.id}.	`)
				router.navigate(`movie/${item.id}`)
				break
			case MediaType.tv:
				// @ts-ignore
				router.navigate(`tv/${item.id}`)
				break
			case MediaType.person:
				// @ts-ignore
				router.navigate(`person/${item.id}`)
				break
			default:
				break
		}
	}
	const handlePressTvGenre = (category: Category) => {
		// router.navigate(`tv-genre/${category.id}`)
	}
	const handlePressNetwork = (category: Category) => {
		// router.navigate('Network', { category })
	}
	const handlePressMovieGenre = (category: Category) => {
		// router.navigate('MovieGenre', { category })
	}
	const handlePressStudio = (category: Category) => {
		// router.navigate('Studio', { category })
	}
	const handlePressTrending = () => {
		// return router.navigate('MediaList', {
		// 	title: 'Trending',
		// 	cacheKey: 'trending-screen',
		// 	fetchFn: trendingScreenQueryFn
		// })
	}
	const handlePressMoviePopular = () => {
		// return router.navigate('MediaList', {
		// 	title: 'Popular Movies',
		// 	cacheKey: 'popular-movies-screen',
		// 	fetchFn: moviePopularScreenQueryFn
		// })
	}
	const handlePressMovieUpcoming = () => {
		// return router.navigate('MediaList', {
		// 	title: 'Upcoming Movies',
		// 	cacheKey: 'upcoming-movies-screen',
		// 	fetchFn: movieUpcomingScreenQueryFn
		// })
	}
	const handlePressTvPopular = () => {
		// return router.navigate('MediaList', {
		// 	title: 'Popular Series',
		// 	cacheKey: 'popular-tv-screen',
		// 	fetchFn: tvPopularScreenQueryFn
		// })
	}
	const handlePressTvUpcoming = () => {
		// return router.navigate('MediaList', {
		// 	title: 'Upcoming Series',
		// 	cacheKey: 'upcoming-tv-screen',
		// 	fetchFn: tvUpcomingScreenQueryFn
		// })
	}

	return (
    <ParallaxScrollView>
			{trendingSuccess &&
				<ThemedView>
					<ThemedText style={[styles.title]}>Trending</ThemedText>
					<MediaList
						media={trendingData?.results || []}
						onPress={handlePressMedia}
						isHorizontal={true}
						footer={<MoreListItem onPress={handlePressTrending} />}
					/>
				</ThemedView>
			}
			{popularMoviesSuccess &&
				<ThemedView>
					<ThemedText style={[styles.title]}>Popular Movies</ThemedText>
					<MediaList
						media={popularMoviesData?.results || []}
						onPress={handlePressMedia}
						isHorizontal={true}
						footer={<MoreListItem onPress={handlePressMoviePopular} />}
					/>
				</ThemedView>
			}
			<ThemedView>
				<ThemedText style={[styles.title]}>Movie Genres</ThemedText>
				<HorizontalCategoryList categories={movieGenres} onPress={handlePressMovieGenre} />
			</ThemedView>
			{upcomingMoviesSuccess &&
				<ThemedView>
					<ThemedText style={[styles.title]}>Upcoming Movies</ThemedText>
					<MediaList
						media={upcomingMoviesData?.results || []}
						onPress={handlePressMedia}
						isHorizontal={true}
						footer={<MoreListItem onPress={handlePressMovieUpcoming} />}
					/>
				</ThemedView>
			}
			<ThemedView>
				<ThemedText style={[styles.title]}>Studios</ThemedText>
				<HorizontalCategoryList categories={studios} isLogo={true} onPress={handlePressStudio} />
			</ThemedView>
			{popularTvSuccess &&
				<ThemedView>
					<ThemedText style={[styles.title]}>Popular Series</ThemedText>
					<MediaList
						media={popularTvData?.results || []}
						onPress={handlePressMedia}
						isHorizontal={true}
						footer={<MoreListItem onPress={handlePressTvPopular} />}
					/>
				</ThemedView>
			}
			<ThemedView>
				<ThemedText style={styles.title}>Series Genres</ThemedText>
				<HorizontalCategoryList categories={tvGenres} onPress={handlePressTvGenre} />
			</ThemedView>
			{upcomingTvSuccess &&
				<ThemedView>
					<ThemedText style={[styles.title]}>Upcoming Series</ThemedText>
					<MediaList
						media={upcomingTvData?.results || []}
						onPress={handlePressMedia}
						isHorizontal={true}
						footer={<MoreListItem onPress={handlePressTvUpcoming} />}
					/>
				</ThemedView>
			}
			<ThemedView>
				<ThemedText style={[styles.title]}>Networks</ThemedText>
				<HorizontalCategoryList categories={networks} isLogo={true} onPress={handlePressNetwork} />
			</ThemedView>
    </ParallaxScrollView>
  );
}

const useDiscoveryScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
		title: {
			marginBottom: 5 * scale,
			fontWeight: '600',
		},
  });
};
