import { StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import MediaList from '@/components/MediaList/MediaList';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { ThemedText }	 from '@/components/ThemedText';
import { useScale } from '@/hooks/useScale';
import useAppStore from '@/lib/store';
import { useEffect } from 'react';
import { MediaType } from '@/lib/types';
import { normalizeSize } from '@/lib/utils';
import { MAX_FETCH_PAGES } from '@/lib/constants';

export default function MediaListScreen() {
	const { client } = useAppStore()
  const router = useRouter()
	const { title, cacheKey } = useLocalSearchParams();
  const scale = useScale();
	const styles = useMediaListScreenStyles(scale);

	const trendingScreenQueryFn = (page: number) => {
		return client?.search.getDiscoverTrending(page)
	}
	const moviePopularScreenQueryFn = (page: number) => {
		return client?.search.getDiscoverMovies(page)
	}
	const movieUpcomingScreenQueryFn = (page: number) => {
		return client?.search.getDiscoverMoviesUpcoming(page)
	}
	const tvPopularScreenQueryFn = (page: number) => {
		return client?.search.getDiscoverTv(page)
	}
	const tvUpcomingScreenQueryFn = (page: number) => {
		return client?.search.getDiscoverTvUpcoming(page)
	}

	//Define allowed cache keys
	type CacheKey =
	  | 'trending-screen'
	  | 'popular-movies-screen'
	  | 'upcoming-movies-screen'
	  | 'popular-tv-screen'
	  | 'upcoming-tv-screen';

	const fetchFn: Record<CacheKey, (page: number) => Promise<any> | undefined> = {
	  'trending-screen': trendingScreenQueryFn,
	  'popular-movies-screen': moviePopularScreenQueryFn,
	  'upcoming-movies-screen': movieUpcomingScreenQueryFn,
	  'popular-tv-screen': tvPopularScreenQueryFn,
	  'upcoming-tv-screen': tvUpcomingScreenQueryFn,
	};

	const cacheKeyString = Array.isArray(cacheKey) ? cacheKey[0] : cacheKey as CacheKey;
	const queryClient = useQueryClient();
	const {
		fetchNextPage,
		isFetching,
		hasNextPage,
  	isFetchingNextPage,
		data,
	} = useInfiniteQuery({
		queryKey: [cacheKeyString],
		queryFn: ({ pageParam }) => fetchFn[cacheKeyString as CacheKey](pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage: any) => {
			if (lastPage?.page && lastPage?.totalPages && lastPage.page <= MAX_FETCH_PAGES) {
				return lastPage.page + 1
			}
			return undefined
		},
	})

	useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: [cacheKeyString] });
    };
  }, []);

  const onPress = (item: any) => {
		if (item.mediaType === MediaType.movie) {
			router.push(`/movie/${item.id}`)
		} else {
			router.push(`/tv/${item.id}`)
		}
  }

  return(
    <ThemedScrollView>
      {data?.pages.length &&
        <MediaList
          media={data?.pages.map((page) => page?.results).flat()}
          onPress={onPress}
          header={<ThemedText style={[styles.title]}>{title}</ThemedText>}
					onEndReached={fetchNextPage}
        />
      }
			{isFetching &&
				<ActivityIndicator size="large" style={{ paddingTop: normalizeSize(30) }} />
			}
    </ThemedScrollView>
  )
}

const useMediaListScreenStyles = function (scale: number) {
  return StyleSheet.create({
		title: {
			fontSize: 38 * scale,
			lineHeight: 40 * scale,
			marginBottom: 20 * scale,
		}
  });
};
