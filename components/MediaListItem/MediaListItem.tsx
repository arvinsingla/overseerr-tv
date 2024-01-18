import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet, Animated } from 'react-native'
import { MovieResult, TvResult } from '../../lib/OverseerrClient'
import MediaPill, { MediaPillType } from '../MediaPill/MediaPill'
import { trunc } from '../../lib/utils'
interface MediaListItemProps {
  media: MovieResult | TvResult
  isFocused: Boolean
}

const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

const MediaListItem: React.FC<MediaListItemProps> = ({ media, isFocused }) => {
  const { mediaType, posterPath, mediaInfo } = media
  const title: string = 'title' in media ? media.title : media.name ?? ''
  const mediaDate: string = 'releaseDate' in media ? media.releaseDate : media.firstAirDate ?? ''

  return (
    <Animated.View
      style={[
        styles.container,
      ]}
    >
      <Image
        source={{ uri: `${TMDB_IMAGE_URL}${posterPath}` }}
        style={[
          styles.poster,
          { opacity: isFocused ? 0.3 : 1 }
        ]} />
      <View style={styles.header}>
        <MediaPill type={mediaType as MediaPillType} />
        {mediaInfo?.status === 5 &&
          <View style={styles.availability}>
            <Text>A</Text>
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
    </Animated.View>
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
    alignContent: 'center'
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