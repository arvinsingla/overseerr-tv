import { SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, Text, View, Alert } from "react-native";
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

  const {error, isPending, isSuccess, data, refetch } = useQuery({
    queryKey: ['tv', item.id],
    queryFn: () => client?.tv.getTv(item.id)
  })

  const { isSuccess: similarIsSuccess, data: similarData } = useQuery({
    queryKey: ['tvSimilar', item.id],
    queryFn: () => client?.tv.getTvSimilar(item.id)
  })

  const submitRequest = () => {
		Alert.alert(
			`Submit request`,
			`Do you want to submit a request for all seasons of the series "${data?.name}"`,
			[
				{
					text: 'Request',
					onPress: async () => {
						try {
							await client?.request.postRequest({
								mediaType: 'tv',
								mediaId: item.id,
								seasons: 'all'
							})
							await refetch()
						} catch (e) {
							console.log(e)
							Alert.alert(`Error`, `There was an error submitting your request`)
						}
					},
					style: 'default',
					isPreferred: true
				},
				{
					text: 'Cancel',
					style: 'cancel'
				}
			],
		)
	}

  const onTvPress = (item: TvResult) => {
    navigation.navigate('Tv', { item })
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ overflow:'visible'}}>
        {isPending &&
          <ActivityIndicator size="large" style={{ paddingTop: 30 }} />
        }
        {isSuccess && data &&
          <TvDetails tv={data} onRequest={submitRequest} />
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
