import { Image, Text, View, StyleSheet, Pressable, Linking, Alert, useColorScheme } from "react-native"
import TvButton, { TvButtonType } from "../TvButton/TvButton"
import { TvDetails as TvDetailsType } from "@/lib/OverseerrClient"
import { TMDB_IMAGE_URL } from "@/lib/constants"
import { languageMap } from "@/lib/maps"
import StatusPill from "../StatusPill/StatusPill"
import { getTrailerURLFromRelatedVideos, normalizeSize } from "@/lib/utils"
import { useTheme } from "@react-navigation/core"

const DIRECTOR_KEY = 'Director'
interface TvDetailsProps {
	tv: TvDetailsType
	canRequest?: boolean
	onRequest: () => void
}

const TvDetails: React.FC<TvDetailsProps> = ({ tv, canRequest = false, onRequest }) => {
	const {
		credits,
		genres,
		originalLanguage,
		overview,
		posterPath,
		status,
		tagline,
		name,
		voteAverage,
		numberOfEpisodes,
		numberOfSeason,
		mediaInfo,
		relatedVideos
	} = tv
	const directors = credits?.crew?.filter((crew) => crew.job === DIRECTOR_KEY).map((director) => director.name)
	const cast = credits?.cast ? credits?.cast.slice(0, 4).map(member => member.name) : []
	const tvData = []
	const mediaStatus = mediaInfo?.status
	const trailerURL = getTrailerURLFromRelatedVideos(relatedVideos ?? [])
	const plexURL = mediaInfo?.iOSPlexUrl ?? ''

	const theme = useTheme()

	if (directors?.length) tvData.push({ title: 'Director(s)', value: directors.join(', ') })
	if (cast?.length) tvData.push({ title: 'Cast', value: cast.join('\n') })
	if (originalLanguage) tvData.push({ title: 'Original Language', value: languageMap[originalLanguage] })
	if (numberOfEpisodes) tvData.push({ title: 'Number of Episodes', value: numberOfEpisodes })
	if (numberOfSeason) tvData.push({ title: 'Number of Seasons', value: numberOfSeason })
	if (voteAverage) tvData.push({ title: 'TMDB Score', value: voteAverage.toFixed(1) })

	const play = async (url: string, type: string) => {
		try {
			await Linking.openURL(url)
		} catch (e) {
			Alert.alert(`Sorry we couldn\'t open the ${type} content`)
		}
	}

	return (
		<View style={style.content}>
			<View style={style.contentLeft}>
				<View style={style.header}>
					<Pressable><Image source={{ uri: `${TMDB_IMAGE_URL}${posterPath}` }} style={style.headerPoster} /></Pressable>
					<View style={style.headerDetails}>
						{mediaStatus && <StatusPill status={mediaStatus} downloadStatus={mediaInfo.downloadStatus} />}
						<View style={style.HeaderDetailsTitle}>
							<Text>
								<Text style={[style.headerDetailsTitleMain, { color: theme.colors.text }]}>{name}</Text>
							</Text>
						</View>
						{genres?.length ?
							<View>
								<Text style={[style.HeaderDetailsSubtitleText, { color: theme.colors.text }]}>{genres?.map((item) => item.name).join(', ')}</Text>
							</View>
							: null
						}
					</View>
				</View>
				{tagline && <Text style={[style.contentLeftTagline, { color: theme.colors.text }]}>{tagline}</Text>}
				{overview &&
					<>
						<Text style={[{ fontSize: normalizeSize(40), fontWeight: 'bold' }, { color: theme.colors.text }]}>{`Overview`}</Text>
						<Text style={[style.contentLeftOverview, { color: theme.colors.text }]}>{overview}</Text>
					</>
				}
			</View>
			<View style={style.contentRight}>
				{canRequest &&
					<View style={style.contentRightButton}>
						<TvButton title="Request" onPress={onRequest} />
					</View>
				}
				{trailerURL &&
					<View style={style.contentRightButton}>
						<TvButton title="Trailer" onPress={() => play(trailerURL, "YouTube")} type={TvButtonType.default} />
					</View>
				}
				{plexURL &&
					<View style={style.contentRightButton}>
						<TvButton title="Play in Plex" onPress={() => play(plexURL, "Plex")} type={TvButtonType.default} />
					</View>
				}
				{tvData.length &&
					<View style={[style.contentRightTable, { borderColor: theme.colors.border }]}>
						{tvData.map((data, index) => {
							const isLastItem = index === tvData.length - 1
							return (
								<View key={index} style={[style.contentRightItem, { borderBottomWidth: isLastItem ? 0 : 1 }, { borderColor: theme.colors.border }]}>
									<Text style={[style.bold, style.contentRightItemText, { color: theme.colors.text }]}>{data.title}:</Text>
									<Text style={[style.contentRightItemText, { color: theme.colors.text }]}>{data.value}</Text>
								</View>
							)
						})}
					</View>
				}
			</View>
		</View>
	)
}

const style = StyleSheet.create({
	bold: {
		fontWeight: 'bold'
	},
	noBorder: {
		borderWidth: 0,
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: normalizeSize(50),
	},
	contentLeft: {
		maxWidth: normalizeSize(1200),
	},
	contentRight: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginBottom: normalizeSize(50),
	},
	headerPoster: {
		width: normalizeSize(300),
		height: normalizeSize(400),
		borderRadius: normalizeSize(20),
		marginRight: normalizeSize(30),
	},
	headerDetails: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	HeaderDetailsTitle: {
		maxWidth: normalizeSize(800),
	},
	headerDetailsTitleMain: {
		fontSize: normalizeSize(60),
		fontWeight: 'bold',
	},
	headerDetailsTitleDate: {
		fontSize: normalizeSize(50),
		fontWeight: 'bold',
		paddingLeft: normalizeSize(20)
	},
	HeaderDetailsSubtitle: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	HeaderDetailsSubtitleText: {
		fontSize: normalizeSize(30)
	},
	contentRightButton: {
		marginBottom: normalizeSize(20)
	},
	contentLeftTagline: {
		fontSize: normalizeSize(35),
		fontStyle: 'italic',
		marginBottom: normalizeSize(30)
	},
	contentLeftOverview: {
		fontSize: normalizeSize(26),
		marginTop: normalizeSize(10),
		lineHeight: normalizeSize(40),
		marginBottom: normalizeSize(30),
	},
	contentRightTable: {
		borderWidth: 1,
		borderRadius: normalizeSize(10),
		display: 'flex',
		flexDirection: 'column',
		minWidth: normalizeSize(550),
	},
	contentRightItem: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: normalizeSize(20),
	},
	contentRightItemText: {
		fontSize: normalizeSize(25),
		textAlign: 'right',
	}
})

export default TvDetails
