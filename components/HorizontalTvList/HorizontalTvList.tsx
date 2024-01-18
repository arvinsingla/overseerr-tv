import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Animated, Text } from 'react-native';
import { TvResult } from '../../lib/OverseerrClient';
import MediaListItem from '../MediaListItem/MediaListItem';

interface HorizontalTvListProps {
  title: String
  tv: TvResult[]
  onPress: (item: TvResult) => void
  onFocus: (itemId: number) => void
  focusId: number | null
}

const HorizontalTvList: React.FC<HorizontalTvListProps> = ({ tv, title, onPress, onFocus, focusId }) => {
  const handlePress = (item: TvResult) => {
    onPress(item)
  }

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        data={tv}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onFocus={() => onFocus(item.id)}
              onPress={() => handlePress(item)}
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
    paddingRight: 30
  }
});

export default HorizontalTvList;
