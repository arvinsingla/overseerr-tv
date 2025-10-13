import { StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import PersonDetails from "@/components/PersonDetails/PersonDetails";
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { useScale } from '@/hooks/useScale';
import useAppStore from '@/lib/store';
import { MediaType } from "@/lib/types";
import { MovieResult, TvResult } from '@/lib/OverseerrClient';

export default function PersonScreen() {
  const scale = useScale();
  const styles = usePersonScreenStyles(scale);
	const { client } = useAppStore()
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const personId = Number(id);

	const { isPending, isSuccess, data} = useQuery({
		queryKey: ['person', personId],
		// @ts-ignore
		queryFn: () => client?.person.getPerson(personId),
	})

	const onMediaPress = (item: MovieResult | TvResult) => {
		if (item.mediaType === MediaType.movie) {
			// @ts-ignore
			router.navigate(`/movie/${item.id}`)
		} else {
			router.navigate(`/tv/${item.id}`)
		}
	}

  return (
    <ThemedScrollView style={{ overflow: 'visible' }}>
			{isPending &&
				<ActivityIndicator size="large" style={{ paddingTop: 30 * scale }} />
			}
			{isSuccess && data &&
				<PersonDetails person={data} />
			}
			{/* {item?.knownFor?.length &&
				<ThemedView>
					<ThemedText style={[styles.title]}>Known for</ThemedText>
					<MediaList
						media={item.knownFor}
						isHorizontal={true}
						onPress={onMediaPress}
					/>
				</ThemedView>
			} */}
    </ThemedScrollView>
  );
}

const usePersonScreenStyles = function (scale: number) {
  return StyleSheet.create({
		title: {
			fontSize: 28 * scale,
			lineHeight: 60 * scale,
		}
  });
};
