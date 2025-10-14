import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { MovieResult, TvResult } from '@/lib/OverseerrClient'
import MediaPill from '../MediaPill/MediaPill'
import { MediaType } from '@/lib/types'
import { TMDB_IMAGE_URL } from '@/lib/constants'
import { trunc, normalizeSize } from '@/lib/utils'
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
			{posterPath &&
				<Image
					source={{ uri: `${TMDB_IMAGE_URL}${posterPath}` }}
					style={[
						styles.poster,
						{ opacity: isFocused ? 0.3 : 1 }
					]}
				/>
			}
			{!posterPath &&
				<Image
				source={require('./img/not-found-logo.png')}
					style={[
						styles.poster,
						{ opacity: isFocused ? 0.3 : 1 }
					]}
				/>
			}
      <View style={styles.header}>
        <MediaPill type={mediaType as MediaType} />
        {mediaInfo?.status === 5 &&
          <View style={styles.availability}>
            <Image source={require('./img/green-check.png')} style={{ width: normalizeSize(20), height: normalizeSize(15)}} />
          </View>
        }
        {mediaInfo?.status === 4 &&
          <View style={styles.availability}>
            <Image source={require('./img/green-line.png')} style={{ width: normalizeSize(20), height: normalizeSize(3)}} />
          </View>
        }
				{mediaInfo?.status === 3 && (mediaInfo?.downloadStatus ?? []).length === 0 &&
					<View style={styles.requested}>
						<Image source={require('./img/lavendar-clock.png')} style={{ width: normalizeSize(20), height: normalizeSize(2)}} />
					</View>
				}
      </View>
      {(isFocused || !posterPath) &&
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
    borderRadius: normalizeSize(15),
    backgroundColor: "#000000",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: normalizeSize(300),
    height: normalizeSize(450),
  },
  poster: {
    position: 'absolute',
    width: normalizeSize(300),
    height: normalizeSize(450),
    borderRadius: normalizeSize(15),
  },
  header: {
    padding: normalizeSize(15),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  availability: {
    backgroundColor: '#ffffff',
    borderRadius: normalizeSize(50),
    borderColor: 'rgba(74,222,128,.8)',
    borderWidth: 3,
    width: normalizeSize(35),
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
  },
  requested: {
    backgroundColor: '#ffffff',
    borderRadius: normalizeSize(50),
    borderColor: '#9ec1fb',
    borderWidth: 3,
    width: normalizeSize(35),
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
  },
  info: {
    padding: normalizeSize(10),
  },
  infoYear: {
    color: '#ffffff',
    fontSize: normalizeSize(24),
    marginBottom: normalizeSize(5)
  },
  infoTitle: {
    color: '#ffffff',
    fontSize: normalizeSize(32),
    fontWeight: 'bold',
    lineHeight: normalizeSize(32),
    marginBottom: normalizeSize(5),
  },
  infoDescription: {
    color: '#ffffff',
    fontSize: normalizeSize(18),
    maxHeight: normalizeSize(100),
    overflow: 'hidden'
  },
})

export default MediaListItem
