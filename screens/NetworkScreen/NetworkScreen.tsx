import { ActivityIndicator, Image, SafeAreaView, View, useColorScheme } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '@/lib/store';
import { TvResult } from "@/lib/OverseerrClient";
import { TMDB_IMAGE_URL, TMDB_IMAGE_URL_FILTER } from "@/lib/constants";
import MediaList from "@/components/MediaList/MediaList";
import { useEffect } from "react";
import { normalizeSize } from "@/lib/utils";

type NetworkScreenRouteProp = RouteProp<RootStackParamList, 'MovieGenre'>;

function NetworkScreen(): JSX.Element {
  const route = useRoute<NetworkScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { category } = route.params
	const scheme = useColorScheme()
	const imgBaseURL = scheme === 'dark' ? TMDB_IMAGE_URL_FILTER : TMDB_IMAGE_URL

	const queryClient = useQueryClient();
	const {
		fetchNextPage,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ['network-tv', category.id],
		queryFn: ({ pageParam }) => client?.search.getDiscoverTvNetwork(category.id.toString(), pageParam),
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

  const onPress = (item: TvResult) => {
    navigation.navigate("Tv", { item })
  }

  const uri = `${imgBaseURL}${category.backdrops[0]}`
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
    <SafeAreaView>
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
    </SafeAreaView>
  )
}

export default NetworkScreen
