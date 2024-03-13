import { SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, Text, View, Alert, useColorScheme } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from '../../App';
import useAppStore from '../../lib/store';
import MediaList from "../../components/MediaList/MediaList";
import { MovieResult, TvResult } from "../../lib/OverseerrClient";
import { getTheme } from "../../lib/theme";
import PersonDetails from "../../components/PersonDetails/PersonDetails";
import { MediaType } from "../../lib/types";
import { normalizeSize } from "../../lib/utils";

type PersonScreenRouteProp = RouteProp<RootStackParamList, 'Person'>;

function PersonScreen(): JSX.Element {
	const route = useRoute<PersonScreenRouteProp>()
	const navigation = useNavigation()
	const { client } = useAppStore()
	const { item } = route.params
	const scheme = useColorScheme()
	const theme = getTheme(scheme)

	const { isPending, isSuccess, data} = useQuery({
		queryKey: ['person', item.id],
		// @ts-ignore
		queryFn: () => client?.person.getPerson(item.id),
	})

	const onMediaPress = (item: MovieResult | TvResult) => {
		if (item.mediaType === MediaType.movie) {
			// @ts-ignore
			navigation.navigate('Movie', { item })
		} else {
			navigation.navigate('Tv', { item })
		}
	}

	return (
		<SafeAreaView>
			<ScrollView style={{ overflow: 'visible' }}>
				{isPending &&
					<ActivityIndicator size="large" style={{ paddingTop: normalizeSize(30) }} />
				}
				{isSuccess && data &&
					<PersonDetails person={data} />
				}
				{item?.knownFor?.length &&
					<View>
						<Text style={[style.title, theme.title]}>Known for</Text>
						<MediaList
							media={item.knownFor}
							isHorizontal={true}
							onPress={onMediaPress}
						/>
					</View>
				}
			</ScrollView>
		</SafeAreaView>
	);
}

const style = StyleSheet.create({
	title: {
		fontSize: normalizeSize(38),
		lineHeight: normalizeSize(66),
		marginBottom: normalizeSize(20),
	},
})

export default PersonScreen
