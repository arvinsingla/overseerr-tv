import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import MovieDetails from "../../components/MovieDetails/MovieDetails";

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

  const submitRequest = async () => {
    // await client?.request.postRequest({
    //   mediaId: item.id,
    //   mediaType: 'movie'
    // })
    navigation.navigate('Discovery')
  }

  return (
    <SafeAreaView>
      {isPending &&
        <View><Text>Fetching data</Text></View>
      }
      {isSuccess && data &&
        <MovieDetails movie={data} onRequest={submitRequest} />
      }
    </SafeAreaView>
  );
}

const style = StyleSheet.create({})

export default MovieScreen