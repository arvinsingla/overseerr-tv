import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { useDebounce } from 'use-debounce';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MediaList from '@/components/MediaList/MediaList';
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
				// navigation.navigate('Movie', { item })
				break
			case MediaType.tv:
				// @ts-ignore
				// navigation.navigate('Tv', { item })
				break
			case MediaType.person:
				// navigation.navigate('Person', { item })
				break
		}
	}

	const header = (
		<TextInput
			value={searchString}
			onChangeText={setSearchString}
			style={styles.input}
			placeholder={'Search'}
			inputMode="search"
			placeholderTextColor="#000000"
		/>
	)

	const onEndReached = () => {
		if (searchValue !== '') {
			fetchNextPage
		}
	}

	const media = data?.pages ? data?.pages.map((page) => page?.results).flat() : []


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={310 * scale}
          name="search-outline"
          style={styles.headerImage}
        />
      }
    >
			<ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Search</ThemedText>
      </ThemedView>
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
		input: {
				marginTop: 50 * scale,
				marginBottom: 50 * scale,
				fontSize: 38 * scale,
				height: 80 * scale,
				borderRadius: 10 * scale,
			}
  });
};
