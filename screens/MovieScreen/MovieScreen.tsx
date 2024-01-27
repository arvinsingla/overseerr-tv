import { SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import MovieList from "../../components/MovieList/MovieList";
import { MovieResult } from "../../lib/OverseerrClient";

type MovieScreenRouteProp = RouteProp<RootStackParamList, 'Movie'>;

function MovieScreen(): JSX.Element {
  const route = useRoute<MovieScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { item } = route.params

  const {error, isPending, isSuccess, data } = useQuery({
    queryKey: ['movie', item.id],
    queryFn: () => client?.movies.getMovie(item.id)
  })

  const { error: similarError, isPending: similarIsPending, isSuccess: similarIsSuccess, data: similarData } = useQuery({
    queryKey: ['movieSimilar', item.id],
    queryFn: () => client?.movies.getMovieSimilar(item.id)
  })

  const submitRequest = async () => {
    // await client?.request.postRequest({
    //   mediaId: item.id,
    //   mediaType: 'movie'
    // })
    // console.log('Requested')
    // navigation.navigate('Discovery')
  }

  const onMoviePress = (item: MovieResult) => {
    navigation.navigate('Movie', { item })
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ overflow:'visible'}}>
        {isPending &&
          <ActivityIndicator size="large" />
        }
        {isSuccess && data &&
          <MovieDetails movie={data} mediaInfo={item.mediaInfo} onRequest={submitRequest} />
        }
        {similarIsSuccess && similarData?.results &&
          <View>
            <Text style={style.title}>Similar Movies</Text>
            <MovieList movies={similarData.results} isHorizontal={true} onPress={onMoviePress} />
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  title: {
    fontSize: 38,
    lineHeight: 66,
    marginBottom: 20,
  },
})

export default MovieScreen