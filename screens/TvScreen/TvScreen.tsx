import { SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, Text, View, Alert, useColorScheme } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import TvDetails from "../../components/TvDetails/TvDetails";
import MediaList from "../../components/MediaList/MediaList";
import { getTheme } from "../../lib/theme";

type TvScreenRouteProp = RouteProp<RootStackParamList, 'Tv'>;

function TvScreen(): JSX.Element {
  const route = useRoute<TvScreenRouteProp>()
  const navigation = useNavigation()
  const { client } = useAppStore()
  const { item } = route.params
	const scheme = useColorScheme()
	const theme = getTheme(scheme)

	let canRequest = false

  const { isPending, isSuccess, data, refetch } = useQuery({
    queryKey: ['tv', item.id],
    queryFn: () => client?.tv.getTv(item.id)
  })

  const { isSuccess: similarIsSuccess, data: similarData } = useQuery({
    queryKey: ['tvSimilar', item.id],
    queryFn: () => client?.tv.getTvSimilar(item.id)
  })

	const { data: sonarrData } = useQuery({
		queryKey: ['sonarr'],
		queryFn: () => client?.service.getServiceSonarr(),
	})

	if (data?.mediaInfo?.status === 1 || data?.mediaInfo?.status === undefined) {
		if (sonarrData?.length) {
			canRequest = true
		}
	}

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

  const onTvPress = (item: any) => {
    navigation.navigate('Tv', { item })
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ overflow:'visible'}}>
        {isPending &&
          <ActivityIndicator size="large" style={{ paddingTop: 30 }} />
        }
        {isSuccess && data &&
          <TvDetails tv={data} canRequest={canRequest} onRequest={submitRequest} />
        }
        {similarIsSuccess && similarData?.results &&
          <View>
            <Text style={[style.title, theme.title]}>Similar Series</Text>
            <MediaList media={similarData.results} isHorizontal={true} onPress={onTvPress} />
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
