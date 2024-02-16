import { SafeAreaView, Text, StyleSheet, ActivityIndicator, useColorScheme } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import MediaList from "../../components/MediaList/MediaList";
import { getTheme } from "../../lib/theme";
import { useEffect } from "react";

type MovieGenreScreenRouteProp = RouteProp<RootStackParamList, 'MovieGenre'>;

function MovieGenreScreen(): JSX.Element {
  const route = useRoute<MovieGenreScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { category } = route.params
	const scheme = useColorScheme()
	const theme = getTheme(scheme)

	const queryClient = useQueryClient();
	const {
		fetchNextPage,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ['genre-movies', category.id],
		queryFn: ({ pageParam }) => client?.search.getDiscoverMoviesGenre(category.id.toString(), pageParam),
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
      queryClient.removeQueries({ queryKey: ['genre-movies'] });
    };
  }, []);

  const onPress = (item: any) => {
    navigation.navigate("Movie", { item })
  }

  return(
    <SafeAreaView>
      {data?.pages.length &&
        <MediaList
          media={data?.pages.map((page) => page?.results).flat()}
          onPress={onPress}
          header={<Text style={[theme.title, styles.title]}>Movies: {category.name}</Text>}
					onEndReached={fetchNextPage}
        />
      }
			{isFetching &&
				<ActivityIndicator size="large" style={{ paddingTop: 30 }} />
			}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
		fontSize: 60,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default MovieGenreScreen
