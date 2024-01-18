import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { MovieResult } from '../../lib/OverseerrClient';
import MediaListItem from '../MediaListItem/MediaListItem';

interface HorizontalMovieListProps {
  title: String
  movies: MovieResult[]
  onPress: (item: MovieResult) => void
}

const HorizontalMovieList: React.FC<HorizontalMovieListProps> = ({ movies, title, onPress }) => {
  const [focusedItem, setFocusedItem] = useState<Number | null>(null)

  console.log('focusedItem', focusedItem)
  const handlePress = (item: MovieResult) => {
    onPress(item)
  }

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
              onFocus={() => setFocusedItem(item.id)}
              onPress={() => handlePress(item)}
              style={styles.item}
              tvParallaxProperties={{
                enabled: false
              }}
            >
              <MediaListItem media={item} isFocused={focusedItem === item.id} />
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
