import { Image, Text, View, StyleSheet, Pressable, Linking, Alert } from "react-native"
import TvButton, { TvButtonType } from "../TvButton/TvButton"
import { MovieDetails as MovieDetailsType } from "../../lib/OverseerrClient"
import { TMDB_IMAGE_URL } from "../../lib/constants"
import { formatDollars, getTrailerURLFromRelatedVideos, trunc } from "../../lib/utils"
import { languageMap } from "../../lib/maps"
import StatusPill from "../StatusPill/StatusPill"

const DIRECTOR_KEY = 'Director'
interface MovieDetailsProps {
	movie: MovieDetailsType
	canRequest?: boolean
	onRequest: () => void
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, canRequest = false, onRequest }) => {
	const {
		budget,
		credits,
		genres,
		originalLanguage,
		overview,
		posterPath,
		releaseDate,
		revenue,
		runtime,
		status,
		tagline,
		title,
		voteAverage,
		mediaInfo,
		relatedVideos
	} = movie
	const directors = credits?.crew?.filter((crew) => crew.job === DIRECTOR_KEY).map((director) => director.name)
	const cast = credits?.cast ? credits?.cast.slice(0, 4).map(member => member.name) : []
	const movieData = []
	const mediaStatus = mediaInfo?.status
	const trailerURL = getTrailerURLFromRelatedVideos(relatedVideos ?? [])
	const plexURL = mediaInfo?.iOSPlexUrl ?? ''

	const play = async (url: string, type: string) => {
		try {
			await Linking.openURL(url)
		} catch (e) {
			Alert.alert(`Sorry we couldn\'t open the ${type} content`)
		}
	}

	if (directors?.length) movieData.push({ title: 'Director(s)', value: directors.join('\n') })
	if (cast?.length) movieData.push({ title: 'Cast', value: cast.join('\n') })
	if (originalLanguage) movieData.push({ title: 'Original Language', value: languageMap[originalLanguage] })
	if (status) movieData.push({ title: 'Status', value: status })
	if (voteAverage) movieData.push({ title: 'TMDB Score', value: voteAverage.toFixed(1) })
	if (revenue) movieData.push({ title: 'Revenue', value: formatDollars(revenue) })
	if (budget) movieData.push({ title: 'Budget', value: formatDollars(budget) })

	return (
		<View style={style.content}>
			<View style={style.contentLeft}>
				<View style={style.header}>
					<Pressable><Image source={{ uri: `${TMDB_IMAGE_URL}${posterPath}` }} style={style.headerPoster} /></Pressable>
					<View style={style.headerDetails}>
						{mediaStatus && <StatusPill status={mediaStatus} downloadStatus={mediaInfo.downloadStatus} />}
						<View style={style.HeaderDetailsTitle}>
							<Text>
								<Text style={style.headerDetailsTitleMain}>{title}</Text>
								{releaseDate ? <Text style={style.headerDetailsTitleDate}> ({trunc(releaseDate ?? '', 4)})</Text> : null}
							</Text>
						</View>
						{runtime ?
							<View>
								<Text style={style.HeaderDetailsSubtitleText}>{runtime} minutes</Text>
							</View>
							: null
						}
						{genres?.length ?
							<View>
								<Text style={style.HeaderDetailsSubtitleText}>{genres?.map((item) => item.name).join(', ')}</Text>
							</View>
							: null
						}
					</View>
				</View>
				{tagline && <Text style={style.contentLeftTagline}>{tagline}</Text>}
				{overview &&
					<>
						<Text style={{ fontSize: 40, fontWeight: 'bold' }}>Overview</Text>
						<Text style={style.contentLeftOverview}>{overview}</Text>
					</>
				}
			</View>
			<View style={style.contentRight}>
				{canRequest &&
					<View style={style.contentRightButton}>
						<TvButton title="Request" onPress={onRequest} type={TvButtonType.cancel} />
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
				{movieData.length &&
					<View style={style.contentRightTable}>
						{movieData.map((data, index) => {
							const isLastItem = index === movieData.length - 1
							return (
								<View key={index} style={[style.contentRightItem, { borderBottomWidth: isLastItem ? 0 : 1 }]}>
									<Text style={[style.bold, style.contentRightItemText]}>{data.title}:</Text>
									<Text style={style.contentRightItemText}>{data.value}</Text>
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
		marginTop: 50,
	},
	contentLeft: {
		maxWidth: 1200,
	},
	contentRight: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginBottom: 50,
	},
	headerPoster: {
		width: 300,
		height: 400,
		borderRadius: 20,
		marginRight: 30,
	},
	headerDetails: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	HeaderDetailsTitle: {
		maxWidth: 800,
	},
	headerDetailsTitleMain: {
		fontSize: 60,
		fontWeight: 'bold',
	},
	headerDetailsTitleDate: {
		fontSize: 50,
		fontWeight: 'bold',
		paddingLeft: 20
	},
	HeaderDetailsSubtitle: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	HeaderDetailsSubtitleText: {
		fontSize: 30
	},
	contentRightButton: {
		marginBottom: 20
	},
	contentLeftTagline: {
		fontSize: 35,
		fontStyle: 'italic',
		marginBottom: 30
	},
	contentLeftOverview: {
		fontSize: 26,
		marginTop: 10,
		lineHeight: 40,
		marginBottom: 30,
	},
	contentRightTable: {
		borderWidth: 1,
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		width: 550,
	},
	contentRightItem: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20,
	},
	contentRightItemText: {
		fontSize: 25,
		textAlign: 'right',
	}
})

export default MovieDetails
