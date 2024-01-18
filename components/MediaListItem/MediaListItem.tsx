import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { MovieResult, TvResult } from '../../lib/OverseerrClient';

interface MediaListItemProps {
  media: MovieResult | TvResult
  isFocused: Boolean
}

const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

const MediaListItem: React.FC<MediaListItemProps> = ({ media, isFocused }) => {
  const { mediaType, posterPath, mediaInfo } = media;
  const animatedScale = new Animated.Value(1);

  // const title: string = 'title' in media ? media.title : media.name

  useEffect(() => {
    if (isFocused) {
      // Grow the item when focused
      Animated.spring(animatedScale, {
        toValue: 1.05,
        useNativeDriver: true,
      }).start();
    } else {
      // Shrink the item when not focused
      Animated.spring(animatedScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused]);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: animatedScale }] },
      ]}
    >
      <Image source={{ uri: `${TMDB_IMAGE_URL}${posterPath}` }} style={styles.poster} />
      <View style={styles.header}>
        <View style={styles.mediaType}>
          <Text style={styles.mediaTypeText}>{mediaType}</Text>
        </View>
        {mediaInfo?.status === 5 &&
          <View style={styles.availability}>
            <Text>A</Text>
          </View>
        }
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: 15,
  },
  poster: {
    width: 300,
    height: 400,
    borderRadius: 15,
  },
  header: {
    padding: 15,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediaType: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(59,130,246,.8)',
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: 15,
  },
  mediaTypeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  availability: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    borderColor: 'rgba(74,222,128,.8)',
    borderWidth: 3,
    width: 35,
    alignContent: 'center'
  }
});

export default MediaListItem;
