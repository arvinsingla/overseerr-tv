import { SafeAreaView, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import HorizontalMovieList from "../../components/HorizontalMovieList/HorizontalMovieList";
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
          <HorizontalMovieList title="Similar Movies" movies={similarData.results} onPress={onMoviePress} />
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({})

export default MovieScreen