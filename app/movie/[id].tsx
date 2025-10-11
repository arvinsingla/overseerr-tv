import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MediaList from '@/components/MediaList/MediaList';
import MovieDetails from '@/components/MovieDetails/MovieDetails';
import { useScale } from '@/hooks/useScale';
import useAppStore from '@/lib/store';
import { logError } from '@/lib/utils';
import { MovieResult } from '@/lib/OverseerrClient';
import { ThemedScrollView } from '../../components/ThemedScrollView';

export default function SearchScreen() {
  const styles = useSearchScreenStyles();
  const scale = useScale();
	const { client } = useAppStore()
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const movieId = Number(id);
	const { isPending, isSuccess, data, refetch } = useQuery({
		queryKey: ['movie', movieId],
		queryFn: () => client?.movies.getMovie(movieId),
		refetchInterval: 10000,
	});
	let canRequest = false

	const { isSuccess: similarIsSuccess, data: similarData } = useQuery({
		queryKey: ['movieSimilar', movieId],
		queryFn: () => client?.movies.getMovieSimilar(movieId)
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
								mediaId: movieId,
							})
							await refetch()
						} catch (e: any) {
							logError('Movie Request', e)
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
		router.navigate(`/movie/${item.id}`)
	}

  return (
    <ThemedScrollView style={{ overflow: 'visible' }}>
			{isPending &&
				<ActivityIndicator size="large" style={{ paddingTop: 30 * scale }} />
			}
			{isSuccess && data &&
				<MovieDetails
					movie={data}
					canRequest={canRequest}
					onRequest={submitRequest}
				/>
			}
			{similarIsSuccess && similarData?.results &&
				<ThemedView>
					<ThemedText style={[styles.title]}>Similar Movies</ThemedText>
					<MediaList
						media={similarData.results}
						isHorizontal={true}
						onPress={(item) => onMoviePress(item as MovieResult)}
					/>
				</ThemedView>
			}
    </ThemedScrollView>
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
		title: {
			fontSize: 38 * scale,
			lineHeight: 66 * scale,
			marginBottom: 20 * scale,
		}
  });
};
