import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { MovieResult } from '../../lib/OverseerrClient';
import MediaListItem from '../MediaListItem/MediaListItem';

interface MovieListProps {
  header?: React.ReactElement
  footer?: React.ReactElement
  movies: MovieResult[]
  isHorizontal?: boolean
  onPress: (item: MovieResult) => void
}

const MovieList: React.FC<MovieListProps> = ({ movies, header, footer, isHorizontal = false, onPress }) => {
  return (
    <FlatList
      horizontal={isHorizontal}
      numColumns={isHorizontal ? 1 : 5}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      style={styles.list}
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <View
            style={{
                marginRight: isHorizontal ? 30 : 65,
                marginBottom: isHorizontal ? 0 : 50
            }}
          >
            <MediaListItem media={item} onPress={onPress} />
          </View>
        )
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    overflow: 'visible',
  },
});

export default MovieList;
