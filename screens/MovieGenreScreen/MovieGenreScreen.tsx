import { SafeAreaView, Text, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import MovieList from "../../components/MovieList/MovieList";
import { MovieResult } from "../../lib/OverseerrClient";
import { DEFAULT_REFETCH_INTERVAL } from "../../lib/constants";

type MovieGenreScreenRouteProp = RouteProp<RootStackParamList, 'MovieGenre'>;

function MovieGenreScreen(): JSX.Element {
  const route = useRoute<MovieGenreScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { category } = route.params

  const {error, isPending, isSuccess, data } = useQuery({
    queryKey: ['genre-movies', category.id],
    queryFn: () => client?.search.getDiscoverMoviesGenre(category.id.toString()),
		refetchInterval: DEFAULT_REFETCH_INTERVAL
  })

  const onPress = (item: MovieResult) => {
    navigation.navigate("Movie", { item })
  }

  return(
    <SafeAreaView>
			{isPending &&
				<ActivityIndicator size="large" style={{ paddingTop: 30 }} />
			}
      {isSuccess && data?.results?.length &&
        <MovieList
          movies={data?.results}
          onPress={onPress}
          header={<Text style={styles.title}>Movies: {category.name}</Text>}
        />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 60,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default MovieGenreScreen
