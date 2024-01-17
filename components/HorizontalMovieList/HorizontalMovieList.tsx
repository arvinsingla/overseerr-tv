// HorizontalMovieList.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import MovieItem from '../MovieItem/MovieItem';
import { MovieResult } from '../../lib/OverseerrClient';

interface HorizontalMovieListProps {
    movies: MovieResult[]
  }

const HorizontalMovieList: React.FC<HorizontalMovieListProps> = ({ movies }) => {
  const [focusedItem, setFocusedItem] = useState<Number|null>(null)

  const handleFocus = (itemId: Number) => {
    setFocusedItem(itemId);
  };

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          padding: 20
        }}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onFocus={() => handleFocus(item.id)}
            >
              <Animated.View
                style={[
                  styles.item,
                ]}
              >
                <MovieItem movie={item} isFocused={focusedItem === item.id} />
              </Animated.View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
  }
});

export default HorizontalMovieList;
