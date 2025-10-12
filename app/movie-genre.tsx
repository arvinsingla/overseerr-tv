import { StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import MediaList from '@/components/MediaList/MediaList';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { useScale } from '@/hooks/useScale';
import useAppStore from '@/lib/store';
import { useEffect } from 'react';
import { normalizeSize } from '@/lib/utils';
import { ThemedText } from '../components/ThemedText';

export default function MovieGenreScreen() {
	const { client } = useAppStore()
  const router = useRouter()
	const styles = useMovieGenreScreenStyles();

	const { id, name } = useLocalSearchParams();
	const idString = Array.isArray(id) ? id[0] : id as string
	const nameString = Array.isArray(name) ? name[0] : name as string

	const queryClient = useQueryClient();
	const {
		fetchNextPage,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ['genre-movies', idString],
		queryFn: ({ pageParam }) => client?.search.getDiscoverMoviesGenre(idString, pageParam),
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
		router.push(`/movie/${item.id}`)
  }

  return(
		<ThemedScrollView >
			{data?.pages.length &&
				<MediaList
					media={data?.pages.map((page) => page?.results).flat()}
					onPress={onPress}
					header={<ThemedText style={[styles.title]}>Movies: {nameString}</ThemedText>}
					onEndReached={fetchNextPage}
				/>
			}
			{isFetching &&
				<ActivityIndicator size="large" style={{ paddingTop: normalizeSize(30) }} />
			}
    </ThemedScrollView>
  )
}

const useMovieGenreScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
		title: {
			fontSize: 38 * scale,
			lineHeight: 40 * scale,
			marginBottom: 20 * scale,
		}
  });
};
