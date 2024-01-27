import { Image, SafeAreaView, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import { TvResult } from "../../lib/OverseerrClient";
import { TMDB_IMAGE_URL } from "../../lib/constants";
import TvList from "../../components/TvList/TvList";

type NetworkScreenRouteProp = RouteProp<RootStackParamList, 'MovieGenre'>;

function NetworkScreen(): JSX.Element {
  const route = useRoute<NetworkScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { category } = route.params

  const {error, isPending, isSuccess, data } = useQuery({
    queryKey: ['network-tv', category.id],
    queryFn: () => client?.search.getDiscoverTvNetwork(category.id.toString())
  })

  const onPress = (item: TvResult) => {
    navigation.navigate("Tv", { item })
  }

  const uri = `${TMDB_IMAGE_URL}${category.backdrops[0]}`
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