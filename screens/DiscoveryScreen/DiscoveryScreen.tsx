import { View, ScrollView, StyleSheet, SafeAreaView, Text } from "react-native";
import { useQuery } from '@tanstack/react-query'
import { useNavigation } from "@react-navigation/native";
import HorizontalMovieList from '../../components/HorizontalMovieList/HorizontalMovieList'
import { MovieResult, TvResult } from '../../lib/OverseerrClient'
import useAppStore from "../../lib/store";
import HorizontalTvList from "../../components/HorizontalTvList/HorizontalTvList";
import HorizontalCategoryList from "../../components/HorizontalCategoryList/HorizontalCategoryList";
import { studios, networks } from '../../lib/maps'
import movieGenres from '../../lib/movieGenres.json'
import tvGenres from '../../lib/tvGenres.json'

function DiscoveryScreen(): JSX.Element {
  const navigation = useNavigation()
  const { client } = useAppStore()

  const handlePressMovie = (item: MovieResult) => {
    navigation.navigate('Movie', { item })
  }
  const handlePressTv = (item: TvResult) => {
    navigation.navigate('Tv', { item })
  }

  if (!client) {
    return (<Text>Overseerr Client not instantiated</Text>)
  }

  const {error: popularMoviesError, isPending: popularMoviesPending, isSuccess: popularMoviesSuccess, data: popularMoviesData } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: () => client.search.getDiscoverMovies()
  })
  const {error: popularTvError, isPending: popularTvPending, isSuccess: popularTvSuccess, data: popularTvData } = useQuery({
    queryKey: ['popular-tv'],
    queryFn: () => client.search.getDiscoverTv()
  })

  const {error: upcomingMoviesError, isPending: upcomingMoviesPending, isSuccess: upcomingMoviesSuccess, data: upcomingMoviesData } = useQuery({
    queryKey: ['upcoming-movies'],
    queryFn: () => client.search.getDiscoverMoviesUpcoming()
  })

  const {error: upcomingTvError, isPending: upcomingTvPending, isSuccess: upcomingTvSuccess, data: upcomingTvData } = useQuery({
    queryKey: ['upcoming-tv'],
    queryFn: () => client.search.getDiscoverTvUpcoming()
  })

  return (
      <SafeAreaView>
        <ScrollView style={style.wrapper}>
          {popularMoviesSuccess &&
            <View style={style.list}>
              <HorizontalMovieList
                title="Popular Movies"
                movies={popularMoviesData?.results || []}
                onPress={handlePressMovie}
              />
            </View>
          }
          <View style={style.list}>
            <HorizontalCategoryList categories={movieGenres} title="Movie Genres" onPress={() => {}} />
          </View>
          {upcomingMoviesSuccess &&
            <View style={style.list}>
              <HorizontalMovieList
                title="Upcoming Movies"
                movies={upcomingMoviesData?.results || []}
                onPress={handlePressMovie}
              />
            </View>
          }
          <View style={style.list}>
            <HorizontalCategoryList categories={studios} title="Studios" isLogo={true} onPress={() => {}} />
          </View>
          {popularTvSuccess &&
            <View style={style.list}>
              <HorizontalTvList
                title="Popular Series"
                tv={popularTvData?.results || []}
                onPress={handlePressTv}
              />
            </View>
          }
          <View style={style.list}>
            <HorizontalCategoryList categories={tvGenres} title="Series Genres"  onPress={() => {}} />
          </View>
          {upcomingTvSuccess &&
            <View style={style.list}>
              <HorizontalTvList
                title="Upcoming Series"
                tv={upcomingTvData?.results || []}
                onPress={handlePressTv}
              />   
            </View>
          }
          <View style={style.list}>
            <HorizontalCategoryList categories={networks} title="Networks" isLogo={true} onPress={() => {}} />
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
  }
})

export default DiscoveryScreen