import { StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MediaList from '@/components/MediaList/MediaList';
import TvDetails from "@/components/TvDetails/TvDetails";
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { useScale } from '@/hooks/useScale';
import useAppStore from '@/lib/store';
import { logError } from '@/lib/utils';

export default function MovieScreen() {
  const scale = useScale();
  const styles = useMovieScreenStyles(scale);
	const { client } = useAppStore()
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const tvId = Number(id);

	let canRequest = false

	const { isPending, isSuccess, data, refetch } = useQuery({
    queryKey: ['tv', tvId],
    queryFn: () => client?.tv.getTv(tvId)
  })

  const { isSuccess: similarIsSuccess, data: similarData } = useQuery({
    queryKey: ['tvSimilar', tvId],
    queryFn: () => client?.tv.getTvSimilar(tvId)
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
								mediaId: tvId,
								seasons: 'all'
							})
							await refetch()
						} catch (e: any) {
							logError('TV Request', e)
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
		router.navigate(`/tv/${item.id}`)
  }

  return (
    <ThemedScrollView style={{ overflow: 'visible' }}>
			{isPending &&
				<ActivityIndicator size="large" style={{ paddingTop: 30 * scale }} />
			}
			{isSuccess && data &&
				<TvDetails tv={data} canRequest={canRequest} onRequest={submitRequest} />
			}
			{similarIsSuccess && similarData?.results &&
				<ThemedView style={{ marginBottom: 30 * scale }}>
					<ThemedText style={[styles.title]}>Similar Series</ThemedText>
					<MediaList media={similarData.results} isHorizontal={true} onPress={onTvPress} />
				</ThemedView>
			}
    </ThemedScrollView>
  );
}

const useMovieScreenStyles = function (scale: number) {
  return StyleSheet.create({
		title: {
			fontSize: 28 * scale,
			lineHeight: 60 * scale,
		}
  });
};
