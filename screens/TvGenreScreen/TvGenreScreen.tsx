import { ActivityIndicator, SafeAreaView, StyleSheet, Text, useColorScheme } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import TvList from "../../components/TvList/TvList";
import { TvResult } from "../../lib/OverseerrClient";
import { getTheme } from "../../lib/theme";
import { useEffect } from "react";

type TvGenreScreenRouteProp = RouteProp<RootStackParamList, 'MovieGenre'>;

function TvGenreScreen(): JSX.Element {
  const route = useRoute<TvGenreScreenRouteProp>()
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
		queryKey: ['genre-tv', category.id],
		queryFn: ({ pageParam }) => client?.search.getDiscoverTvGenre(category.id.toString(), pageParam),
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
      queryClient.removeQueries({ queryKey: ['genre-tv'] });
    };
  }, []);

  const onPress = (item: TvResult) => {
    navigation.navigate("Tv", { item })
  }

  return(
    <SafeAreaView>
			{data?.pages.length &&
        <TvList
          tv={data?.pages.map((page) => page?.results).flat()}
          onPress={onPress}
          header={<Text style={[theme.title, styles.title]}>Series: {category.name}</Text>}
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

export default TvGenreScreen
