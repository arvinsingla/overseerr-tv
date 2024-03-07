import { View, ScrollView, StyleSheet, SafeAreaView, Text, ActivityIndicator, useColorScheme } from "react-native";
import { useQuery } from '@tanstack/react-query'
import { useNavigation } from "@react-navigation/native";
import { MovieResult, PersonResult, TvResult } from '../../lib/OverseerrClient'
import useAppStore from "../../lib/store";
import HorizontalCategoryList, { Category } from "../../components/HorizontalCategoryList/HorizontalCategoryList";
import { studios, networks } from '../../lib/maps'
import { DEFAULT_REFETCH_INTERVAL } from "../../lib/constants";
import movieGenres from '../../lib/movieGenres.json'
import tvGenres from '../../lib/tvGenres.json'
import MediaList from "../../components/MediaList/MediaList";
import { getTheme } from "../../lib/theme";
import { MediaType } from "../../lib/types";
import MoreListItem from "../../components/MoreListItem/MoreListItem";

function DiscoveryScreen(): JSX.Element {
  const navigation = useNavigation()
  const { client } = useAppStore()
	const scheme = useColorScheme()
	const theme = getTheme(scheme)

  if (!client) {
		return <ActivityIndicator size="large" style={{ paddingTop: 30 }} />
  }

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
				navigation.navigate('Movie', { item })
				break
			case MediaType.tv:
				// @ts-ignore
				navigation.navigate('Tv', { item })
				break
			case MediaType.person:
				// @ts-ignore
				navigation.navigate('Person', { item })
				break
			default:
				break
		}
	}
  const handlePressTvGenre = (category: Category) => {
    navigation.navigate('TvGenre', { category })
  }
  const handlePressNetwork = (category: Category) => {
    navigation.navigate('Network', { category })
  }
  const handlePressMovieGenre = (category: Category) => {
    navigation.navigate('MovieGenre', { category })
  }
  const handlePressStudio = (category: Category) => {
    navigation.navigate('Studio', { category })
  }
	const handlePressTrending = () => navigation.navigate('MediaList', {
		title: 'Trending',
		cacheKey: 'trending-screen',
		fetchFn: trendingScreenQueryFn
	})
	const handlePressMoviePopular = () => navigation.navigate('MediaList', {
		title: 'Popular Movies',
		cacheKey: 'popular-movies-screen',
		fetchFn: moviePopularScreenQueryFn
	})
	const handlePressMovieUpcoming = () => navigation.navigate('MediaList', {
		title: 'Upcoming Movies',
		cacheKey: 'upcoming-movies-screen',
		fetchFn: movieUpcomingScreenQueryFn
	})
	const handlePressTvPopular = () => navigation.navigate('MediaList', {
		title: 'Popular Series',
		cacheKey: 'popular-tv-screen',
		fetchFn: tvPopularScreenQueryFn
	})
	const handlePressTvUpcoming = () => navigation.navigate('MediaList', {
		title: 'Upcoming Series',
		cacheKey: 'trending-screen',
		fetchFn: tvUpcomingScreenQueryFn
	})

  return (
      <SafeAreaView>
        <ScrollView style={style.wrapper}>
          {trendingSuccess &&
            <View style={style.list}>
              <Text style={[style.title, theme.title]}>Trending</Text>
              <MediaList
                media={trendingData?.results || []}
                onPress={handlePressMedia}
                isHorizontal={true}
								footer={<MoreListItem onPress={handlePressTrending} />}
              />
            </View>
          }
          {popularMoviesSuccess &&
            <View style={style.list}>
              <Text style={[style.title, theme.title]}>Popular Movies</Text>
              <MediaList
                media={popularMoviesData?.results || []}
                onPress={handlePressMedia}
                isHorizontal={true}
								footer={<MoreListItem onPress={handlePressMoviePopular} />}
              />
            </View>
          }
          <View style={style.list}>
            <Text style={[style.title, theme.title]}>Movie Genres</Text>
            <HorizontalCategoryList categories={movieGenres} onPress={handlePressMovieGenre} />
          </View>
          {upcomingMoviesSuccess &&
            <View style={style.list}>
              <Text style={[style.title, theme.title]}>Upcoming Movies</Text>
              <MediaList
                media={upcomingMoviesData?.results || []}
                onPress={handlePressMedia}
                isHorizontal={true}
								footer={<MoreListItem onPress={handlePressMovieUpcoming} />}
              />
            </View>
          }
          <View style={style.list}>
            <Text style={[style.title, theme.title]}>Studios</Text>
            <HorizontalCategoryList categories={studios} isLogo={true} onPress={handlePressStudio} />
          </View>
          {popularTvSuccess &&
            <View style={style.list}>
              <Text style={[style.title, theme.title]}>Popular Series</Text>
              <MediaList
                media={popularTvData?.results || []}
                onPress={handlePressMedia}
                isHorizontal={true}
								footer={<MoreListItem onPress={handlePressTvPopular} />}
              />
            </View>
          }
          <View style={style.list}>
            <Text style={style.title}>Series Genres</Text>
            <HorizontalCategoryList categories={tvGenres} onPress={handlePressTvGenre} />
          </View>
          {upcomingTvSuccess &&
            <View style={style.list}>
              <Text style={[style.title, theme.title]}>Upcoming Series</Text>
              <MediaList
                media={upcomingTvData?.results || []}
                onPress={handlePressMedia}
                isHorizontal={true}
								footer={<MoreListItem onPress={handlePressTvUpcoming} />}
              />
            </View>
          }
          <View style={style.list}>
            <Text style={[style.title, theme.title]}>Networks</Text>
            <HorizontalCategoryList categories={networks} isLogo={true} onPress={handlePressNetwork} />
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const style = StyleSheet.create({
  wrapper: {
    overflow: 'visible'
  },
  list: {
    marginBottom: 30
  },
  title: {
    marginBottom: 20,
  },
})

export default DiscoveryScreen
