import { Image, Text, View, StyleSheet, ScrollView} from "react-native"
import TvButton from "../TvButton/TvButton"
import { MovieDetails as MovieDetailsType } from "../../lib/OverseerrClient"
import { TMDB_IMAGE_URL } from "../../lib/constants"
import { trunc } from "../../lib/utils"

interface MovieDetailsProps {
    movie: MovieDetailsType,
    onRequest: () => void
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onRequest }) => {
    return(
        <ScrollView style={style.container}>
            <View style={style.request}>
                <TvButton title="Request" onPress={onRequest} />
            </View>
            <View style={style.header}>
                <Image source={{ uri: `${TMDB_IMAGE_URL}${movie.posterPath}` }} style={style.headerPoster} />
                <View style={style.headerDetails}>
                    <View style={style.HeaderDetailsTitle}>
                        <Text style={style.headerDetailsTitleMain}>{movie?.title}</Text>
                        {movie.releaseDate ? <Text style={style.headerDetailsTitleDate}>({trunc(movie.releaseDate ?? '', 4)})</Text> : null}
                    </View>
                    {movie?.runtime ?
                        <View>
                            <Text style={style.HeaderDetailsSubtitleText}>{movie.runtime} minutes</Text>
                        </View>
                        : null
                    }
                    {movie?.genres?.length ?
                        <View>
                            <Text style={style.HeaderDetailsSubtitleText}>{movie.genres?.map((item) => item.name).join(', ')}</Text>
                        </View>
                        : null
                    }
                </View>
            </View>
            <View style={style.content}>
                <View style={style.contentLeft}>
                    {movie.tagline && <Text style={style.contentLeftTagline}>{movie.tagline}</Text>}
                    {movie.overview &&
                        <>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Overview</Text>
                            <Text style={style.contentLeftOverview}>{movie.overview}</Text>
                        </>
                    }
                </View>
                <View style={style.contentRight}>

                </View>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        position: 'relative',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 50,
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
        flexDirection: 'column'
    },
    HeaderDetailsTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerDetailsTitleMain: {
        fontSize: 60,
        fontWeight: 'bold',
    },
    headerDetailsTitleDate: {
        fontSize: 50,
        fontWeight: 'bold',
        marginLeft: 20
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
        position: 'absolute',
        right: 0,
        top: 50,
    },
    content: {
        display: 'flex',
        flexDirection: 'row'
    },
    contentLeft: {
    
    },
    contentLeftTagline: {
        fontSize: 40,
        fontStyle: 'italic',
        marginBottom: 30
    },
    contentLeftOverview: {
        fontSize: 30,
        marginTop: 10,
        lineHeight: 40,
        marginBottom: 30,
    },
    contentRight: {
    
    }
})

export default MovieDetails