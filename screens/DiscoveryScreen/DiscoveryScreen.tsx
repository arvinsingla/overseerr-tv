import { View, ScrollView, StyleSheet, SafeAreaView, Text, ActivityIndicator, useColorScheme } from "react-native";
import { useQuery } from '@tanstack/react-query'
import { useNavigation } from "@react-navigation/native";
import { MovieResult, TvResult } from '../../lib/OverseerrClient'
import useAppStore from "../../lib/store";
import HorizontalCategoryList, { Category } from "../../components/HorizontalCategoryList/HorizontalCategoryList";
import { studios, networks } from '../../lib/maps'
import { DEFAULT_REFETCH_INTERVAL } from "../../lib/constants";
import movieGenres from '../../lib/movieGenres.json'
import tvGenres from '../../lib/tvGenres.json'
import MovieList from "../../components/MovieList/MovieList";
import TvList from "../../components/TvList/TvList";
import { getTheme } from "../../lib/theme";

function DiscoveryScreen(): JSX.Element {
  const navigation = useNavigation()
  const { client } = useAppStore()
	const scheme = useColorScheme()
	const theme = getTheme(scheme)

  const handlePressMovie = (item: MovieResult) => {
    navigation.navigate('Movie', { item })
  }
  const handlePressTv = (item: TvResult) => {
    navigation.navigate('Tv', { item })
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

  if (!client) {
		return <ActivityIndicator size="large" style={{ paddingTop: 30 }} />
  }

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

  return (
      <SafeAreaView>
        <ScrollView style={style.wrapper}>
          {popularMoviesSuccess &&
            <View style={style.list}>
              <Text style={[style.title, theme.title]}>Popular Movies</Text>
              <MovieList
                movies={popularMoviesData?.results || []}
                onPress={handlePressMovie}
                isHorizontal={true}
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
              <MovieList
                movies={upcomingMoviesData?.results || []}
                onPress={handlePressMovie}
                isHorizontal={true}
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
              <TvList
                tv={popularTvData?.results || []}
                onPress={handlePressTv}
                isHorizontal={true}
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
              <TvList
                tv={upcomingTvData?.results || []}
                onPress={handlePressTv}
                isHorizontal={true}
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
