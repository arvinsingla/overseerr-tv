import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Animated, Text } from 'react-native';
import { TvResult } from '../../lib/OverseerrClient';
import MediaListItem from '../MediaListItem/MediaListItem';

interface HorizontalTvListProps {
  title: String
  tv: TvResult[]
  onPress: (item: TvResult) => void
}

const HorizontalTvList: React.FC<HorizontalTvListProps> = ({ tv, title, onPress }) => {
  const [focusedItem, setFocusedItem] = useState<Number | null>(null)

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
    paddingRight: 30
  }
});

export default HorizontalTvList;
