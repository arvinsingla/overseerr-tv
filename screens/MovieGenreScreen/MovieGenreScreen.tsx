import { SafeAreaView, Text, StyleSheet, ActivityIndicator, useColorScheme, View, ScrollView } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import MediaList from "../../components/MediaList/MediaList";
import { getTheme } from "../../lib/theme";
import { useEffect } from "react";
import { normalizeSize } from "../../lib/utils";

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
    <View style={styles.wrapper}>
      {data?.pages.length &&
				<MediaList
					media={data?.pages.map((page) => page?.results).flat()}
					onPress={onPress}
					header={<Text style={[theme.title, styles.title]}>Movies: {category.name}</Text>}
					onEndReached={fetchNextPage}
				/>
      }
			{isFetching &&
				<ActivityIndicator size="large" style={{ paddingTop: normalizeSize(30) }} />
			}
    </View>
  )
}

const styles = StyleSheet.create({
	wrapper: {
		paddingLeft: normalizeSize(80),
		paddingRight: normalizeSize(80),
		paddingBottom: normalizeSize(80),
  },
  title: {
		fontSize: normalizeSize(60),
    marginTop: normalizeSize(20),
    marginBottom: normalizeSize(20),
  },
});

export default MovieGenreScreen
