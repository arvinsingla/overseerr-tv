import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { MovieResult, TvResult } from '../../lib/OverseerrClient'
import MediaPill from '../MediaPill/MediaPill'
import { MediaType } from '../../lib/types'
import { TMDB_IMAGE_URL } from '../../lib/constants'
import { trunc } from '../../lib/utils'
interface MediaListItemProps {
  media: MovieResult | TvResult
  onPress: (media: any) => void
}

const MediaListItem: React.FC<MediaListItemProps> = ({ media, onPress }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const { mediaType, posterPath, mediaInfo } = media
  const title: string = 'title' in media ? media.title : media.name ?? ''
  const mediaDate: string = 'releaseDate' in media ? media.releaseDate : media.firstAirDate ?? ''

  return (
    <TouchableOpacity
      activeOpacity={1}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPress={() => onPress(media)}
      style={styles.container}
      tvParallaxProperties={{
        enabled: true,
        magnification: 1.1,
        tiltAngle: 0
      }}
    >
      <Image
        source={{ uri: `${TMDB_IMAGE_URL}${posterPath}` }}
        style={[
          styles.poster,
          { opacity: isFocused ? 0.3 : 1 }
        ]} />
      <View style={styles.header}>
        <MediaPill type={mediaType as MediaType} />
        {mediaInfo?.status === 5 &&
          <View style={styles.availability}>
            <Image source={require('./img/green-check.png')} style={{ width: 20, height: 15}} />
          </View>
        }
        {mediaInfo?.status === 4 &&
          <View style={styles.availability}>
            <Image source={require('./img/green-line.png')} style={{ width: 20, height: 3}} />
          </View>
        }
				{mediaInfo?.status === 3 && (mediaInfo?.downloadStatus ?? []).length === 0 &&
					<View style={styles.requested}>
						<Image source={require('./img/lavendar-clock.png')} style={{ width: 20, height: 2}} />
					</View>
				}
      </View>
      {isFocused &&
        <View style={styles.info}>
          <Text style={styles.infoYear}>{trunc(mediaDate, 4)}</Text>
          <Text style={styles.infoTitle}>{trunc(title, 30, true)}</Text>
          <Text style={styles.infoDescription}>{trunc(media.overview ?? '', 120, true)}</Text>
        </View>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#000000",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 300,
    height: 400,
  },
  poster: {
    position: 'absolute',
    width: 300,
    height: 400,
    borderRadius: 15,
  },
  header: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  availability: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    borderColor: 'rgba(74,222,128,.8)',
    borderWidth: 3,
    width: 35,
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
  },
  requested: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    borderColor: '#9ec1fb',
    borderWidth: 3,
    width: 35,
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
  },
  info: {
    padding: 10,
  },
  infoYear: {
    color: '#ffffff',
    fontSize: 24,
    marginBottom: 5
  },
  infoTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 5,
  },
  infoDescription: {
    color: '#ffffff',
    fontSize: 18,
    maxHeight: 100,
    overflow: 'hidden'
  },
})

export default MediaListItem
