import { SafeAreaView, Text, StyleSheet, ActivityIndicator, useColorScheme } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import MediaList from "../../components/MediaList/MediaList";
import { getTheme } from "../../lib/theme";
import { useEffect } from "react";
import { MediaType } from "../../lib/types";

type MediaListScreenRouteProp = RouteProp<RootStackParamList, 'MediaList'>;

function MediaListScreen(): JSX.Element {
  const route = useRoute<MediaListScreenRouteProp>()
  const navigation = useNavigation()
  const { fetchFn, title, cacheKey } = route.params
	const scheme = useColorScheme()
	const theme = getTheme(scheme)

	const queryClient = useQueryClient();
	const {
		fetchNextPage,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: [cacheKey],
		queryFn: ({ pageParam }) => fetchFn(pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage: any) => {
			if (lastPage?.page && lastPage?.totalPages && lastPage.page < lastPage.totalPages) {
				return lastPage.page + 1
			}
			return undefined
		},
	})

	useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: [cacheKey] });
    };
  }, []);

  const onPress = (item: any) => {
		if (item.mediaType === MediaType.movie) {
			// @ts-ignore
			navigation.navigate('Movie', { item })
		} else {
			navigation.navigate('Tv', { item })
		}
  }

  return(
    <SafeAreaView>
      {data?.pages.length &&
        <MediaList
          media={data?.pages.map((page) => page?.results).flat()}
          onPress={onPress}
          header={<Text style={[theme.title, styles.title]}>{title}</Text>}
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

export default MediaListScreen
