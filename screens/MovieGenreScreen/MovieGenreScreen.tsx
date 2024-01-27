import { SafeAreaView, Text, StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import MovieList from "../../components/MovieList/MovieList";
import { MovieResult } from "../../lib/OverseerrClient";

type MovieGenreScreenRouteProp = RouteProp<RootStackParamList, 'MovieGenre'>;

function MovieGenreScreen(): JSX.Element {
  const route = useRoute<MovieGenreScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { category } = route.params

  const {error, isPending, isSuccess, data } = useQuery({
    queryKey: ['genre-movies', category.id],
    queryFn: () => client?.search.getDiscoverMoviesGenre(category.id.toString())
  })

  const onPress = (item: MovieResult) => {
    navigation.navigate("Movie", { item })
  }

  return(
    <SafeAreaView>
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