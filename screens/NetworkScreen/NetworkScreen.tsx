import { ActivityIndicator, Image, SafeAreaView, View, useColorScheme } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import { TvResult } from "../../lib/OverseerrClient";
import { DEFAULT_REFETCH_INTERVAL, TMDB_IMAGE_URL, TMDB_IMAGE_URL_FILTER } from "../../lib/constants";
import TvList from "../../components/TvList/TvList";

type NetworkScreenRouteProp = RouteProp<RootStackParamList, 'MovieGenre'>;

function NetworkScreen(): JSX.Element {
  const route = useRoute<NetworkScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { category } = route.params
	const scheme = useColorScheme()
	const imgBaseURL = scheme === 'dark' ? TMDB_IMAGE_URL_FILTER : TMDB_IMAGE_URL

  const {error, isPending, isSuccess, data } = useQuery({
    queryKey: ['network-tv', category.id],
    queryFn: () => client?.search.getDiscoverTvNetwork(category.id.toString()),
		refetchInterval: DEFAULT_REFETCH_INTERVAL
  })

  const onPress = (item: TvResult) => {
    navigation.navigate("Tv", { item })
  }

  const uri = `${imgBaseURL}${category.backdrops[0]}`
  const header = (
    <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
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
			{isPending &&
				<ActivityIndicator size="large" style={{ paddingTop: 30 }} />
			}
      {isSuccess && data?.results?.length &&
        <TvList
          tv={data?.results}
          onPress={onPress}
          header={header}
        />
      }
    </SafeAreaView>
  )
}

export default NetworkScreen
