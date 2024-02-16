import { SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, Text, View, Alert, useColorScheme } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import MediaList from "../../components/MediaList/MediaList";
import { MovieResult } from "../../lib/OverseerrClient";
import { getTheme } from "../../lib/theme";

type MovieScreenRouteProp = RouteProp<RootStackParamList, 'Movie'>;

function MovieScreen(): JSX.Element {
	const route = useRoute<MovieScreenRouteProp>()
	const navigation = useNavigation()
	const { client } = useAppStore()
	const { item } = route.params
	const scheme = useColorScheme()
	const theme = getTheme(scheme)
	let canRequest = false

	const { isPending, isSuccess, data, refetch} = useQuery({
		queryKey: ['movie', item.id],
		queryFn: () => client?.movies.getMovie(item.id),
		refetchInterval: 10000
	})

	const { isSuccess: similarIsSuccess, data: similarData } = useQuery({
		queryKey: ['movieSimilar', item.id],
		queryFn: () => client?.movies.getMovieSimilar(item.id)
	})

	const { data: radarrData } = useQuery({
		queryKey: ['radarr'],
		queryFn: () => client?.service.getServiceRadarr(),
	})

	if (data?.mediaInfo?.status === 1 || data?.mediaInfo?.status === undefined) {
		if (radarrData?.length) {
			canRequest = true
		}
	}

	const submitRequest = () => {
		Alert.alert(
			`Submit request`,
			`Do you want to submit a request for "${data?.title}"`,
			[
				{
					text: 'Request',
					onPress: async () => {
						try {
							await client?.request.postRequest({
								mediaType: 'movie',
								mediaId: item.id,
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

	const onMoviePress = (item: MovieResult) => {
		navigation.navigate('Movie', { item })
	}

	return (
		<SafeAreaView>
			<ScrollView style={{ overflow: 'visible' }}>
				{isPending &&
					<ActivityIndicator size="large" style={{ paddingTop: 30 }} />
				}
				{isSuccess && data &&
					<MovieDetails
						movie={data}
						canRequest={canRequest}
						onRequest={submitRequest}
					/>
				}
				{similarIsSuccess && similarData?.results &&
					<View>
						<Text style={[style.title, theme.title]}>Similar Movies</Text>
						<MediaList
							media={similarData.results}
							isHorizontal={true}
							onPress={onMoviePress}
						/>
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

export default MovieScreen
