import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { TvResult } from '../../lib/OverseerrClient';
import MediaListItem from '../MediaListItem/MediaListItem';

interface HorizontalTvListProps {
  title: String
  tv: TvResult[]
  onPress: (item: TvResult) => void
}

const HorizontalTvList: React.FC<HorizontalTvListProps> = ({ tv, title, onPress }) => {
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
            <View style={styles.item}>
              <MediaListItem media={item} onPress={onPress} />
            </View>
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
