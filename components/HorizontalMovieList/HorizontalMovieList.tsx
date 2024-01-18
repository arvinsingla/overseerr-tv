import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { MovieResult } from '../../lib/OverseerrClient';
import MediaListItem from '../MediaListItem/MediaListItem';

interface HorizontalMovieListProps {
  title: String
  movies: MovieResult[]
  onPress: (item: MovieResult) => void
  onFocus: (itemId: number) => void
  focusId: number | null
}

const HorizontalMovieList: React.FC<HorizontalMovieListProps> = ({ movies, title, onPress, onFocus, focusId }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onFocus={() => onFocus(item.id)}
              onPress={() => onPress(item)}
              style={styles.item}
              tvParallaxProperties={{
                enabled: true,
                magnification: 1.1,
                tiltAngle: 0
              }}
            >
              <MediaListItem media={item} isFocused={focusId === item.id} />
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    lineHeight: 66,
  },
  list: {
    overflow: 'visible',
    marginTop: 30
  },
  item: {
    marginRight: 30,
    opacity: 0.8
  }
});

export default HorizontalMovieList;
