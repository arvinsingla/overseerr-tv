import { Image, Text, View, StyleSheet, Pressable} from "react-native"
import TvButton from "../TvButton/TvButton"
import { MediaInfo, TvDetails as TvDetailsType } from "../../lib/OverseerrClient"
import { TMDB_IMAGE_URL } from "../../lib/constants"
import { languageMap } from "../../lib/maps"
import StatusPill from "../StatusPill/StatusPill"

const DIRECTOR_KEY = 'Director'
interface TvDetailsProps {
    tv: TvDetailsType
    mediaInfo: MediaInfo | undefined
    onRequest: () => void
}

const TvDetails: React.FC<TvDetailsProps> = ({ tv, mediaInfo, onRequest }) => {
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
    } = tv
    const directors = credits?.crew?.filter((crew) => crew.job === DIRECTOR_KEY).map((director) => director.name)
    const cast = credits?.cast ? credits?.cast.slice(0, 4).map(member => member.name) : []
    const tvData = []
    const mediaStatus = mediaInfo?.status

    if (directors?.length) tvData.push({ title: 'Director(s)', value: directors.join(', ')})
    if (cast?.length) tvData.push({ title: 'Cast', value: cast.join('\n')})
    if (originalLanguage) tvData.push({ title: 'Original Language', value: languageMap[originalLanguage]})
    if (numberOfEpisodes) tvData.push({ title: 'Number of Episodes', value: numberOfEpisodes})
    if (numberOfSeason) tvData.push({ title: 'Number of Seasons', value: numberOfSeason})
    if (voteAverage) tvData.push({ title: 'TMDB Score', value: voteAverage.toFixed(1)})

    return(
        <View style={style.content}>
            <View style={style.contentLeft}>
                <View style={style.header}>
                    <Pressable><Image source={{ uri: `${TMDB_IMAGE_URL}${posterPath}` }} style={style.headerPoster} /></Pressable>
                    <View style={style.headerDetails}>
                        {mediaStatus && <StatusPill status={mediaStatus} />}
                        <View style={style.HeaderDetailsTitle}>
                            <Text>
                                <Text style={style.headerDetailsTitleMain}>{name}</Text>
                            </Text>
                        </View>
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
                {!mediaStatus &&
                    <View style={style.request}>
                        <TvButton title="Request" onPress={onRequest} />
                    </View>
                }
                {tvData.length &&
                    <View style={style.contentRightTable}>
                        {tvData.map((data, index) => {
                            const isLastItem = index === tvData.length - 1
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
        alignItems: 'center',
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
    request: {
        marginBottom: 50
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
        minWidth: 550,
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

export default TvDetails