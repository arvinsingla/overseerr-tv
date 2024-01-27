import { SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import TvDetails from "../../components/TvDetails/TvDetails";
import TvList from "../../components/TvList/TvList";
import { TvResult } from "../../lib/OverseerrClient";

type TvScreenRouteProp = RouteProp<RootStackParamList, 'Tv'>;

function TvScreen(): JSX.Element {
  const route = useRoute<TvScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { item } = route.params

  const {error, isPending, isSuccess, data } = useQuery({
    queryKey: ['tv', item.id],
    queryFn: () => client?.tv.getTv(item.id)
  })

  const { error: similarError, isPending: similarIsPending, isSuccess: similarIsSuccess, data: similarData } = useQuery({
    queryKey: ['tvSimilar', item.id],
    queryFn: () => client?.tv.getTvSimilar(item.id)
  })

  const submitRequest = async () => {
    // await client?.request.postRequest({
    //   mediaId: item.id,
    //   mediaType: 'tv'
    // })
    // console.log('Requested')
    // navigation.navigate('Discovery')
  }

  const onTvPress = (item: TvResult) => {
    navigation.navigate('Tv', { item })
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ overflow:'visible'}}>
        {isPending &&
          <ActivityIndicator size="large" />
        }
        {isSuccess && data && 
          <TvDetails tv={data} mediaInfo={item.mediaInfo} onRequest={submitRequest} />
        }
        {similarIsSuccess && similarData?.results &&
          <View>
            <Text style={style.title}>Similar Series</Text>
            <TvList tv={similarData.results} isHorizontal={true} onPress={onTvPress} />
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  title: {
    fontSize: 38,
    lineHeight: 66,
    marginBottom: 20,
  },
})

export default TvScreen