import { StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import MediaList from '@/components/MediaList/MediaList';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { useScale } from '@/hooks/useScale';
import useAppStore from '@/lib/store';
import { useEffect } from 'react';
import { normalizeSize } from '@/lib/utils';
import { ThemedText } from '@/components/ThemedText';
import { MAX_FETCH_PAGES } from '@/lib/constants';

export default function TvGenreScreen() {
	const { client } = useAppStore()
  const router = useRouter()
	const scale = useScale();
	const styles = useTvGenreScreenStyles(scale);

	const { id, name } = useLocalSearchParams();
	const idString = Array.isArray(id) ? id[0] : id as string
	const nameString = Array.isArray(name) ? name[0] : name as string

	const queryClient = useQueryClient();
	const {
		fetchNextPage,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ['genre-tv', idString],
		queryFn: ({ pageParam }) => client?.search.getDiscoverTvGenre(idString, pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.page && lastPage?.totalPages && lastPage.page < MAX_FETCH_PAGES) {
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

  const onPress = (item: any) => {
		router.push(`/tv/${item.id}`)
  }

  return(
		<ThemedScrollView >
			{data?.pages.length &&
				<MediaList
					media={data?.pages.map((page) => page?.results).flat()}
					onPress={onPress}
					header={<ThemedText style={[styles.title]}>TV: {nameString}</ThemedText>}
					onEndReached={fetchNextPage}
				/>
			}
			{isFetching &&
				<ActivityIndicator size="large" style={{ paddingTop: normalizeSize(30) }} />
			}
    </ThemedScrollView>
  )
}

const useTvGenreScreenStyles = function (scale: number) {
  return StyleSheet.create({
		title: {
			fontSize: 38 * scale,
			lineHeight: 40 * scale,
			marginBottom: 20 * scale,
		}
  });
};
