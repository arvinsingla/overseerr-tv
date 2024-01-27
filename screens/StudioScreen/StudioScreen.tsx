import { Image, SafeAreaView, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import MovieList from "../../components/MovieList/MovieList";
import { MovieResult } from "../../lib/OverseerrClient";
import { TMDB_IMAGE_URL } from "../../lib/constants";

type StudioScreenRouteProp = RouteProp<RootStackParamList, 'MovieGenre'>;

function StudioScreen(): JSX.Element {
  const route = useRoute<StudioScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { category } = route.params

  const {error, isPending, isSuccess, data } = useQuery({
    queryKey: ['studio-movies', category.id],
    queryFn: () => client?.search.getDiscoverMoviesStudio(category.id.toString())
  })

  const onPress = (item: MovieResult) => {
    navigation.navigate("Movie", { item })
  }

  const uri = `${TMDB_IMAGE_URL}${category.backdrops[0]}`
  const header = (
    <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
      <Image
        source={{ uri }}
        resizeMode="contain"
        style={{
          width: 300,
          height: 150,
        }}
      />
    </View>
  )

  return(
    <SafeAreaView>
      {isSuccess && data?.results?.length &&
        <MovieList
          movies={data?.results}
          onPress={onPress}
          header={header}
        />
      }
    </SafeAreaView>
  ) 
}

export default StudioScreen