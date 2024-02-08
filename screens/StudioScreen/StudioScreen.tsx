import { ActivityIndicator, Image, SafeAreaView, View, useColorScheme } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import MovieList from "../../components/MovieList/MovieList";
import { MovieResult } from "../../lib/OverseerrClient";
import { TMDB_IMAGE_URL, TMDB_IMAGE_URL_FILTER} from "../../lib/constants";
import { useEffect } from "react";
import Shrug from "../../components/Shrug/Shrug";

type StudioScreenRouteProp = RouteProp<RootStackParamList, 'MovieGenre'>;

function StudioScreen(): JSX.Element {
  const route = useRoute<StudioScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { category } = route.params
	const scheme = useColorScheme()
	const imgBaseURL = scheme === 'dark' ? TMDB_IMAGE_URL_FILTER : TMDB_IMAGE_URL

	const queryClient = useQueryClient();
	const {
		fetchNextPage,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ['studio-movies', category.id],
		queryFn: async ({ pageParam }) => {
			console.log('category id', category.id.toString())
			try {
				const queryResult = await client?.search.getDiscoverMoviesStudio(category.id.toString(), pageParam)
				return queryResult
			} catch (e) {
				console.log(e)
			}
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.page && lastPage?.totalPages && lastPage.page < lastPage.totalPages) {
				return lastPage.page + 1
			}
			return undefined
		},
	})

	useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['studio-movies', category.id] });
    };
  }, []);

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
			{!isFetching && !data?.pages.length &&
				<Shrug />
			}
			{data?.pages.length &&
        <MovieList
          movies={data?.pages.map((page) => page?.results).flat()}
          onPress={onPress}
          header={header}
					onEndReached={fetchNextPage}
        />
      }
			{isFetching &&
				<ActivityIndicator size="large" style={{ paddingTop: 30 }} />
			}
    </SafeAreaView>
  )
}

export default StudioScreen
