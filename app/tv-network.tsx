import { StyleSheet, ActivityIndicator, Image, View, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import MediaList from '@/components/MediaList/MediaList';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { useScale } from '@/hooks/useScale';
import useAppStore from '@/lib/store';
import { useEffect } from 'react';
import { normalizeSize } from '@/lib/utils';
import { TMDB_IMAGE_URL, TMDB_IMAGE_URL_FILTER} from "@/lib/constants";

export default function TvNetworkScreen() {
	const { client } = useAppStore()
  const router = useRouter()
	const styles = useTvNetworkScreenStyles();
	const scheme = useColorScheme()
	const imgBaseURL = scheme === 'dark' ? TMDB_IMAGE_URL_FILTER : TMDB_IMAGE_URL

	const { id, backdrops } = useLocalSearchParams();
	const idString = Array.isArray(id) ? id[0] : id as string
	const backdropString = Array.isArray(backdrops) ? backdrops[0] : backdrops as string

	const queryClient = useQueryClient();
	const {
		fetchNextPage,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ['network-tv', idString],
		queryFn: ({ pageParam }) => client?.search.getDiscoverTvNetwork(idString, pageParam),
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
      queryClient.removeQueries({ queryKey: ['network-tv'] });
    };
  }, []);

  const onPress = (item: any) => {
		router.push(`/tv/${item.id}`)
  }

	const uri = `${imgBaseURL}${backdropString}`
  const header = (
    <View style={{ alignItems: 'center', marginTop: normalizeSize(20), marginBottom: normalizeSize(20) }}>
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
		<ThemedScrollView >
			{data?.pages.length &&
				<MediaList
					media={data?.pages.map((page) => page?.results).flat()}
					onPress={onPress}
					header={header}
					onEndReached={fetchNextPage}
				/>
			}
			{isFetching &&
				<ActivityIndicator size="large" style={{ paddingTop: normalizeSize(30) }} />
			}
    </ThemedScrollView>
  )
}

const useTvNetworkScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
		title: {
			fontSize: 38 * scale,
			lineHeight: 40 * scale,
			marginBottom: 20 * scale,
		}
  });
};
