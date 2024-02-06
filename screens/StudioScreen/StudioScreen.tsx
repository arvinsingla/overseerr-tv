import { ActivityIndicator, Image, SafeAreaView, View, useColorScheme } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import MovieList from "../../components/MovieList/MovieList";
import { MovieResult } from "../../lib/OverseerrClient";
import { DEFAULT_REFETCH_INTERVAL, TMDB_IMAGE_URL, TMDB_IMAGE_URL_FILTER} from "../../lib/constants";

type StudioScreenRouteProp = RouteProp<RootStackParamList, 'MovieGenre'>;

function StudioScreen(): JSX.Element {
  const route = useRoute<StudioScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { category } = route.params
	const scheme = useColorScheme()
	const imgBaseURL = scheme === 'dark' ? TMDB_IMAGE_URL_FILTER : TMDB_IMAGE_URL

	const {error, isPending, isSuccess, data } = useQuery({
    queryKey: ['studio-movies', category.id],
    queryFn: () => client?.search.getDiscoverMoviesStudio(category.id.toString()),
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
  })

  const onPress = (item: MovieResult) => {
    navigation.navigate("Movie", { item })
  }

  const uri = `${imgBaseURL}${category.backdrops[0]}`
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
			{isPending &&
				<ActivityIndicator size="large" style={{ paddingTop: 30 }} />
			}
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
