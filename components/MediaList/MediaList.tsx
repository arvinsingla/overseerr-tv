import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { MovieResult, PersonResult, TvResult } from '../../lib/OverseerrClient';
import MediaListItem from '../MediaListItem/MediaListItem';
import { MediaType } from '../../lib/types';
import PersonListItem from '../PersonListItem/PersonListItem';
import { normalizeSize } from '../../lib/utils';

interface MediaListProps {
  header?: React.ReactElement
  footer?: React.ReactElement
  media: (any)[]
  isHorizontal?: boolean
  onPress: (item: MovieResult|TvResult|PersonResult) => void
	onEndReached?: () => void
}

const MediaList: React.FC<MediaListProps> = ({ media, header, footer, isHorizontal = false, onPress, onEndReached = () => {} }) => {
	return (
    <FlatList
      horizontal={isHorizontal}
      numColumns={isHorizontal ? 1 : 5}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      style={styles.list}
      data={media}
      keyExtractor={(item) => item.id.toString()}
			onEndReached={onEndReached}
      renderItem={({ item }) => {
        return (
          <View
            style={{
                marginRight: isHorizontal ? normalizeSize(30) : normalizeSize(65),
                marginBottom: isHorizontal ? 0 : normalizeSize(50)
            }}
          >
						{item.mediaType === MediaType.person &&
							<PersonListItem person={item} onPress={onPress} />
						}
						{item.mediaType !== MediaType.person &&
							<MediaListItem media={item} onPress={onPress} />
						}
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

export default MediaList;
