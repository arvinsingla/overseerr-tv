import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useDebounce } from 'use-debounce';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import ParallaxScrollView from '@/components/ParallaxScrollView';
import MediaList from '@/components/MediaList/MediaList';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useScale } from '@/hooks/useScale';
import useAppStore from '@/lib/store';
import { MediaType } from '@/lib/types';
import { MovieResult, PersonResult, TvResult } from '@/lib/OverseerrClient';

export default function SearchScreen() {
  const styles = useSearchScreenStyles();
  const scale = useScale();
	const [searchString, setSearchString] = useState('')
	const [searchValue] = useDebounce(searchString, 1000)
	const { client } = useAppStore()
	const router = useRouter();

	const queryClient = useQueryClient()
	const {
		fetchNextPage,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ['search', searchValue],
		queryFn: ({ pageParam }) => client?.search.getSearch(searchValue, pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage: any) => {
			if (lastPage?.page && lastPage?.totalPages && lastPage.page < lastPage.totalPages) {
				return lastPage.page + 1
			}
			return undefined
		},
		enabled: searchValue !== '',
	})

	useEffect(() => {
		return () => {
			queryClient.removeQueries({ queryKey: ['search'] })
		}
	}, [])

	const handlePress = (item: MovieResult | TvResult | PersonResult) => {
		switch (item.mediaType) {
			case MediaType.movie:
				// @ts-ignore
				router.navigate(`/movie/${item.id}`)
				break
			case MediaType.tv:
				// @ts-ignore
				router.navigate(`/tv/${item.id}`)
				break
			case MediaType.person:
				// @ts-ignore
				router.navigate(`/person/${item.id}`)
				break
		}
	}

	const header = (
		<ThemedTextInput
			value={searchString}
			onChangeText={setSearchString}
			placeholder={'Enter search term'}
			inputMode="search"
		/>
	)

	const onEndReached = () => {
		if (searchValue !== '') {
			fetchNextPage
		}
	}

	const media = data?.pages ? data?.pages.map((page) => page?.results).flat() : []


  return (
    <ParallaxScrollView>
			<MediaList
				header={header}
				media={media}
				onPress={handlePress}
				onEndReached={onEndReached}
			/>
			{isFetching &&
				<ActivityIndicator size="large" style={{ paddingTop: 30 * scale }} />
			}
    </ParallaxScrollView>
  );
}

const useSearchScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    headerImage: {
      color: '#808080',
      bottom: -90 * scale,
      left: -35 * scale,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale,
    },
  });
};
